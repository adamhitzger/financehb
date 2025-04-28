"use server"

import { ActionResponse } from "@/types"
import { signSchema, SignType,changeDetailsSchema, ChangeDetailsType, ChangePass, changePass, API_KEY_TYPE, api_key, addPhoneType, add_phone, OTPType, otp, GetEmailType, get_email, updatePassType, updatePass } from "./schema"
import { turso } from "./client";
import { comparePasswords, generateSalt, hashPassword, encrypt } from "./password";
import { createUserSession, removeUserFromSession } from "./session";
import { cookies } from "next/headers";
import {redirect} from "next/navigation"
import { getCurrentUser } from "./currentUser";
import { revalidatePath } from "next/cache";
import twilio from "twilio"
import { createTransport } from "nodemailer";


//emails
 async function smtp(){
    return createTransport({
        service: "gmail",
        auth: {
         user: process.env.FROM_EMAIL!,
         pass: process.env.FROM_EMAIL_PASSWORD!,
        }
      });
}

 async function generateHTML(code: string) {
   return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verification Code</title>
  <style>
    body {
      background-color: #ffffff;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #333333;
    }

    .container {
      max-width: 480px;
      margin: 40px auto;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    h1 {
      font-size: 24px;
      margin-bottom: 16px;
      text-align: center;
      color: #2e7d32; /* green */
    }

    p {
      font-size: 16px;
      margin-bottom: 24px;
      text-align: center;
    }

    .code {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 8px;
      background-color: #f5f5f5;
      padding: 16px;
      text-align: center;
      border-radius: 6px;
      border: 1px dashed #2e7d32;
      color: #2e7d32;
      user-select: all;
    }

    .footer {
      margin-top: 30px;
      font-size: 12px;
      text-align: center;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Verification Code</h1>
    <p>Please use the following code to continue:</p>
    <div class="code">${code}</div>
    <p class="footer">If you didn’t request this code, you can safely ignore this email.</p>
  </div>
</body>
</html>`
}
 async function generateVerifySignUpHTML(code: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verification Code</title>
  <style>
    body {
      background-color: #ffffff;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #333333;
    }

    .container {
      max-width: 480px;
      margin: 40px auto;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    h1 {
      font-size: 24px;
      margin-bottom: 16px;
      text-align: center;
      color: #2e7d32; /* green */
    }

    p {
      font-size: 16px;
      margin-bottom: 24px;
      text-align: center;
    }

    .link-container {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 2px;
      background-color: #f5f5f5;
      padding: 16px;
      text-align: center;
      border-radius: 6px;
      border: 1px dashed #2e7d32;
      color: #2e7d32;
    }

    .footer {
      margin-top: 30px;
      font-size: 12px;
      text-align: center;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Verification Code</h1>
    <p>Please use the following link to complete your login process:</p>
    <div class="link-container">
      <a href="http://192.127.0.107:3000/sign-up/full-login?code=${code}" style="color: #2e7d32; text-decoration: none;">Click here to verify your account</a>
    </div>
    <p class="footer">If you didn’t request this, you can safely ignore this email.</p>
  </div>
</body>
</html>`
 }

async function generateVerifyUpdatePassHTML(code: string, email: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verification Code</title>
  <style>
    body {
      background-color: #ffffff;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #333333;
    }

    .container {
      max-width: 480px;
      margin: 40px auto;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    h1 {
      font-size: 24px;
      margin-bottom: 16px;
      text-align: center;
      color: #2e7d32; /* green */
    }

    p {
      font-size: 16px;
      margin-bottom: 24px;
      text-align: center;
    }

    .link-container {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 2px;
      background-color: #f5f5f5;
      padding: 16px;
      text-align: center;
      border-radius: 6px;
      border: 1px dashed #2e7d32;
      color: #2e7d32;
    }

    .footer {
      margin-top: 30px;
      font-size: 12px;
      text-align: center;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Verification Code</h1>
    <p>Please use the following link to complete your login process:</p>
    <div class="link-container">
      <a href="http://192.127.0.107:3000/update-pass/full-update?code=${code}&email=${email}" style="color: #2e7d32; text-decoration: none;">Click here to verify your account</a>
    </div>
    <p class="footer">If you didn’t request this, you can safely ignore this email.</p>
  </div>
</body>
</html>`
 }

 async function generateCode(): Promise<{code?: string| null, success: boolean}>{
    const verifyCode = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

    const insertVerifyCode = await turso.execute({
        sql: "INSERT INTO verify (verify_code) VALUES(?)",
        args: [verifyCode]
    })

    if(insertVerifyCode.rowsAffected===0){
        return{
        success: false,
    }
    }
    return {
      success: true,
      code: verifyCode
    }
}

//users
export async function DeleteAccount(){
    const userId = await getCurrentUser({withFullUser: true})
    console.log(userId?.id)
    await removeUserFromSession(await cookies());

    await turso.execute({
        sql: "DELETE FROM users WHERE id = ?",
        args: [Number(userId?.id)]
    })

    redirect("/")
}

export async function SignOut(){
    await removeUserFromSession(await cookies());
    revalidatePath("/", "layout")
    redirect("/")
    
}

export async function ChangeDetails(prevState: ActionResponse<ChangeDetailsType>, formData: FormData): Promise<ActionResponse<ChangeDetailsType>> {
    const rawData = {
        id: Number(formData.get("id")),
        name: formData.get("name"),
        email: formData.get("email"),
    }
    console.log(rawData)
    const { success, data, error} = changeDetailsSchema.safeParse(rawData);
    console.log(success)
    if(!success) {
        return{
        success: false,
        message: "Unable to change details!",
        submitted: true,
        errors: error.flatten().fieldErrors,
        inputs: data
        }
    }
try{
    const _changeDetails = await turso.execute({
        sql: "UPDATE users SET name = ?, email = ? WHERE id = ?",
        args: [data.name as string, data.email as string, data.id as number]
    });

    if(!_changeDetails.rowsAffected){
        return{
            success: false,
            message: "Unable to change detail!",
            submitted: true,
            inputs: data
            }
    }
    console.log(_changeDetails.rows)
    return {
            success: true,
            message: "Details were succesfully changed!",
            submitted: true,
    }
}catch(error){
    console.log(error)
    return{
        success: false,
        message: "Unable to change details",
        submitted: true,
        inputs: data
        }
}finally{
    revalidatePath("/dashboard/settings", "layout")
}
}

export async function ChangePassword(prevState: ActionResponse<ChangePass>, formData: FormData): Promise<ActionResponse<ChangePass>>{
    const rawData = {
        id: Number(formData.get("id")),
        oldPass: formData.get("oldPass"),
        newPass: formData.get("newPass"),
        confirmPass: formData.get("confirmPass")
    };
    console.log(rawData)
    const { success, data } = changePass.safeParse(rawData);

    if(!success || data.newPass !== data.confirmPass){
        return {
            success: false,
            submitted: true,
            message: "You have entered wrong passwords! Try again"
        }
    }

    const user = await turso.execute({
        sql: "SELECT password, salt FROM users WHERE id = ?",
        args: [data.id]
    })
    console.log(user.rows[0])
    if(!user.rows[0]){
        return {
            success: false,
            message: "Error while finding account! Try again.",
            submitted: true,
        }
    }
    const passIsCorrect = await comparePasswords({
        hashedPassword: user.rows[0].password as string,
        password: data.oldPass,
        salt: user.rows[0].salt as string,
    })

    if(!passIsCorrect){
        return {
            success: false,
            message: "You entered wrong old password!",
            submitted: true,
        }
    }
    console.log(passIsCorrect)
    try {
        const salt = generateSalt();

        const hashedPassword = await hashPassword(data.newPass, salt);

       const _updateUser = await turso.execute({
            sql: "UPDATE users SET password = ?, salt=? WHERE id = ?",
            args: [hashedPassword, salt, data.id]
        })
        if(!_updateUser.rowsAffected){
            return{
                success: false,
                message: "Unable to change detail!",
                submitted: true,
                }
        }
        await SignOut()
        await removeUserFromSession(await cookies());
        redirect("/sign-in")
    }catch(error){
        return {
            success: false,
            message: "Unable to change pass, try again!",
            submitted: true,
        }
    }
}

export async function setTwoFA(two_fa: "tel" | "mail", id: number){
    try{
        const setFA = turso.execute({
            sql:"UPDATE users SET two_fa = ? WHERE id = ?",
            args: [two_fa, id]
        })

        if((await setFA).rowsAffected===0){
            return{
                message: `Error while setting ${two_fa} 2FA`
            }
        }
        return{
            message: `${two_fa} 2FA set up!`
        }
    }catch(error){
        console.log(`Error while setting ${two_fa} 2FA: `, error)
        return{
            message: `Error while setting ${two_fa} 2FA`
        }
    }
}

export async function addPhoneNumber(prevState: ActionResponse<addPhoneType>, formData: FormData): Promise<ActionResponse<addPhoneType>> {
    const rawData = {
        id: Number(formData.get("id")),
        tel: formData.get("tel") as string
    }
    console.log(rawData)
    const {success, data, error} = add_phone.safeParse(rawData);
    console.log(success)
    if(!success) {
        return{
        success: false,
        message: "Wrong phone format!",
        submitted: true,
        errors: error.flatten().fieldErrors,
        inputs: data
        }
    }  
    try {
        const insertPhone = await turso.execute({
            sql: "UPDATE users SET tel = ?, two_fa = tel WHERE id = ?",
            args: [data.tel, data.id],
        })
        console.log(insertPhone.rowsAffected)
        if(insertPhone.rowsAffected === 0){
            return{
                success: false,
                message: "Unable to save phone number!",
                submitted: true,
                inputs: data
                }
        }
        return{
            success: true,
            message: "Phone number saved!",
            submitted: true,
            }
    }  catch(error){
        console.log(error)
        return{
            success: false,
            message: "Wrong phone format!",
            submitted: true,
            inputs: data
            }
    }
}
export async function verifyOTP(prevState: ActionResponse<OTPType>, formData: FormData): Promise<ActionResponse<OTPType>>{
    const rawData = {
        code: formData.get("code") as string
    }

    const {success, data, error} = otp.safeParse(rawData)

    if(!success) {
        return{
        success: false,
        message: "Unable to verify code!",
        submitted: true,
        errors: error.flatten().fieldErrors,
        inputs: data
        }
    }
    
    const getCode = await turso.execute({
        sql: "SELECT id,verify_code FROM verify WHERE verify_code = ?",
        args: [data.code]
    })

    if(!getCode.rows[0].id){
        return{
            success: false,
            message: "Unable to find verify code!",
            submitted: true,
            inputs: data
            }
    }

    const userId = getCode.rows[0]?.user_id as number;
    await createUserSession(userId, await cookies())
    await turso.execute({
        sql: "DELETE FROM verify WHERE verify_code = ?",
        args: [data.code],
      });
    return redirect("/dashboard")    
}

export async function SignIn(prevState: ActionResponse<SignType>,formData: FormData): Promise<ActionResponse<SignType>>{
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    
    const {success, data, error} = signSchema.safeParse(rawData);
    
    if(!success) {
        return{
        success: false,
        message: "Unable to sign in",
        submitted: true,
        errors: error.flatten().fieldErrors,
        inputs: data
        }
    }

    const user = await turso.execute({
        sql: "SELECT password, salt, id, email,tel, two_fa FROM users WHERE email = ?",
        args: [data.email]
    })

    if(!user.rows[0] || !user.rows[0]?.password || !user.rows[0]?.salt){
        return {
            success: false,
            message: "Unable to log in!",
            submitted: true,
            inputs: data
        }
    }
    
    const passIsCorrect = await comparePasswords({
        hashedPassword: user.rows[0]?.password as string,
        password: data.password,
        salt: user.rows[0]?.salt as string,
    })

    if(!passIsCorrect){
        return {
            success: false,
            message: "You entered wrong password!",
            submitted: true,
            inputs: data
        }
    }

    if(user.rows[0].two_fa?.toString() === "tel" && user.rows[0].tel){
        const code = await generateCode()
        if(!code.success || !code.code){
            return {
                success: false,
                message: "Unable to create code!",
                submitted: true,
                inputs: data
            }
        }
        const client = twilio(process.env.TWILIO_ACCOUND_SID!, process.env.TWILIO_AUTH_TOKEN)
        client.messages.create({
            body: `Your code is ${code.code}`,
            from: process.env.TWILIO_PHONE_NUMBER!,
            to: user.rows[0].tel?.toString()
        });
        return redirect("/otp")
    }

    if(user.rows[0].two_fa?.toString() === "mail"){
        const code = await generateCode()
        if(!code.success || !code.code){
            return {
                success: false,
                message: "Unable to create code!",
                submitted: true,
                inputs: data
            }
        }
        const html = await generateHTML(code.code)
        const transporter = await smtp()

        await transporter.sendMail({
            subject: "2FA Code",
            from: process.env.FROM_EMAIL,
            to: user.rows[0].email as string,
            html
        })
        return redirect("/otp")
    }
    
    const userId = user.rows[0]?.id as number;
    await createUserSession(userId, await cookies())

    return redirect("/dashboard")
}

export async function verifySignUp(prevSate: ActionResponse<GetEmailType>, formData: FormData): Promise<ActionResponse<GetEmailType>>{
    const rawData = {
        email: formData.get("email")
    }

    const {success, error, data} = get_email.safeParse(rawData)

    if(!success) {
        return{
        success: false,
        message: "Bad email format!",
        submitted: true,
        errors: error.flatten().fieldErrors,
        inputs: data
        }
    }

    const existingUser = await turso.execute({
        sql: "SELECT * FROM users WHERE email = ? LIMIT 1",
        args: [data.email]
    })

    if(existingUser.rows.length > 0){
        return{
            success: false,
            message: "Account already exist for this email!",
            submitted: true,
        }
    }
    try{
        const code = await generateCode()
        if(!code.success || !code.code){
            return {
                success: false,
                message: "Unable to create code!",
                submitted: true,
                inputs: data
            }
        }
        const transporter = await smtp()
        const html = await generateVerifySignUpHTML(code.code)
        await transporter.sendMail({
            subject: "2FA Code",
            from: process.env.FROM_EMAIL,
            to: data.email as string,
            html
        })
        return {
            success: true,
            message: "Check you email address!",
            submitted: true,
        }
    }catch(error){
        console.log("Error while veryfying setup!: ", error)
        return {
            success: false,
            message: "Failed to create account!",
            submitted: true,
            inputs: data
        }
    }
    
}

export async function SignUp(prevState: ActionResponse<SignType>,formData: FormData): Promise<ActionResponse<SignType>>{
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        code: formData.get("code")
    }
    const {success, data, error} = signSchema.safeParse(rawData);
    if(!success) {
        return{
            success: false,
            message: "Unable to create account!",
            submitted: true,
            errors: error.flatten().fieldErrors,
            inputs: data
        }
    }
        const getCode = await turso.execute({
            sql: "SELECT id,verify_code FROM verify WHERE verify_code = ?",
            args: [data.code as string]
        })
    
        if(!getCode.rows[0].verify_code){
            return{
                success: false,
                message: "Unable to find verify code!",
                submitted: true,
                inputs: data
                }
        }

        if(getCode.rows[0].verify_code !== data.code){
            return{
                success: false,
                message: "Unable to verify code!",
                submitted: true,
                inputs: data
                }
        }

        const delCode = await turso.execute({
            sql: "DELETE FROM verify WHERE verify_code = ?",
            args: [data.code]
        })

        if(!delCode.rowsAffected){
            return{
                success: false,
                message: "Unable to delete verify code!",
                submitted: true,
                inputs: data
                }
        }

        const salt = generateSalt();

        const hashedPassword = await hashPassword(data.password, salt);

        const insertUser = await turso.execute({
            sql: "INSERT INTO users (name, email, password, salt) VALUES (?,?,?,?) RETURNING ID",
            args: [data.name as string, data.email, hashedPassword, salt]
        })
        if(!insertUser.rows[0]?.id) {
            return {
                success: false,
                message: "Unable to create account, try again!",
                submitted: true,
                inputs: data
            }
        }
        const userId = insertUser.rows[0]?.id as number;
        await createUserSession(userId, await cookies())
        redirect("/dashboard/settings")
        
    
}

export async function sentUpdatePass(prevSate: ActionResponse<GetEmailType>, formData: FormData): Promise<ActionResponse<GetEmailType>>{
    const rawData = {
        email: formData.get("email")
    }

    const {success, error, data} = get_email.safeParse(rawData)

    if(!success) {
        return{
        success: false,
        message: "Bad email format!",
        submitted: true,
        errors: error.flatten().fieldErrors,
        inputs: data
        }
    }

    const existingUser = await turso.execute({
        sql: "SELECT * FROM users WHERE email = ? LIMIT 1",
        args: [data.email]
    })

    if(existingUser.rows.length === 0){
        return{
            success: false,
            message: "Account didn't exist for this email!",
            submitted: true,
        }
    }
    try{
        const code = await generateCode()
        if(!code.success || !code.code){
            return {
                success: false,
                message: "Unable to create code!",
                submitted: true,
                inputs: data
            }
        }
        const transporter = await smtp()
        const html = await generateVerifyUpdatePassHTML(code.code, data.email as string)
        await transporter.sendMail({
            subject: "2FA Update Pass Code",
            from: process.env.FROM_EMAIL,
            to: data.email as string,
            html
        })
        return {
            success: true,
            message: "Check you email address!",
            submitted: true,
        }
    }catch(error){
        console.log("Error while veryfying setup!: ", error)
        return {
            success: false,
            message: "Failed to update password!",
            submitted: true,
            inputs: data
        }
    }
    
}

export async function verifyUpPass(prevSate: ActionResponse<updatePassType>, formData: FormData): Promise<ActionResponse<updatePassType>>{
    const rawData = {
        email: formData.get("email"),
        newPass: formData.get("newPass"),
        confPass: formData.get("confPass"),
        code: formData.get("code")
    }

    const {success, error, data} = updatePass.safeParse(rawData)

    if(!success || (data.newPass !== data.confPass)) {
        return{
        success: false,
        message: "Password didn't match!",
        submitted: true,
        inputs: data
        }
    }

    const existingUser = await turso.execute({
        sql: "SELECT * FROM users WHERE email = ? LIMIT 1",
        args: [data.email]
    })

    if(existingUser.rows.length === 0){
        return{
            success: false,
            message: "Account didn't exist for this email!",
            submitted: true,
        }
    }

    const delCode = await turso.execute({
        sql: "DELETE FROM verify WHERE verify_code = ?",
        args: [data.code as string]
    })

    if(!delCode.rowsAffected){
        return{
            success: false,
            message: "Unable to delete verify code!",
            submitted: true,
            inputs: data
            }
    }
        const salt = generateSalt();

        const hashedPassword = await hashPassword(data.newPass, salt);

       const _updateUser = await turso.execute({
            sql: "UPDATE users SET password = ?, salt=? WHERE email = ? RETURNING id",
            args: [hashedPassword, salt, data.email]
        })
        if(!_updateUser.rows[0]?.id){
            return{
                success: false,
                message: "Unable to change detail!",
                submitted: true,
                }
        }
        await createUserSession(_updateUser.rows[0]?.id as number,await cookies());
        redirect("/dashboard")
}