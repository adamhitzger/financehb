import * as z from "zod"

export const signSchema = z.object({
    name: z.string().min(3, {message: "Name must be at least 3 characters long"}).trim().optional(),
    email: z.string().email({message: "You entered wrong email format!"}).trim(),
    password: z.string()
                .min(10, {message: "Password mustbe at least 10 characters long!"})
                .regex(/[a-zA-Z]/, {message: "Password must contain at least one letter"},)
                .regex(/[0-9]/, {message: "Password must contain at least one number"})
                .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least special character"})
                .trim(),
    code: z.string().min(6, {message:"Too long"}).min(6, {message:"Too short"}).trim().optional()
})

export const changeDetailsSchema = z.object({
    id: z.number(),
    name: z.string().min(3, {message: "Name must be at least 3 characters long"}).trim().optional(),
    email: z.string().email({message: "You entered wrong email format!"}).trim(),
})

export const updatePass = z.object({
    email: z.string().email({message: "You entered wrong email format!"}).trim(),
    newPass: z.string()
    .min(10, {message: "Password mustbe at least 10 characters long!"})
    .regex(/[a-zA-Z]/, {message: "Password must contain at least one letter"},)
    .regex(/[0-9]/, {message: "Password must contain at least one number"})
    .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least special character"})
    .trim(),
    confPass: z.string()
    .min(10, {message: "Password mustbe at least 10 characters long!"})
    .regex(/[a-zA-Z]/, {message: "Password must contain at least one letter"},)
    .regex(/[0-9]/, {message: "Password must contain at least one number"})
    .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least special character"})
    .trim(),
    code: z.string().min(6, {message:"Too long"}).min(6, {message:"Too short"}).trim().optional()
})

export const changePass = z.object({
    id: z.number(),
    oldPass: z.string()
    .min(10, {message: "Password mustbe at least 10 characters long!"})
    .regex(/[a-zA-Z]/, {message: "Password must contain at least one letter"},)
    .regex(/[0-9]/, {message: "Password must contain at least one number"})
    .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least special character"})
    .trim(),
    newPass: z.string()
    .min(10, {message: "Password mustbe at least 10 characters long!"})
    .regex(/[a-zA-Z]/, {message: "Password must contain at least one letter"},)
    .regex(/[0-9]/, {message: "Password must contain at least one number"})
    .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least special character"})
    .trim(),
    confirmPass: z.string()
    .min(10, {message: "Password mustbe at least 10 characters long!"})
    .regex(/[a-zA-Z]/, {message: "Password must contain at least one letter"},)
    .regex(/[0-9]/, {message: "Password must contain at least one number"})
    .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least special character"})
    .trim()
})
export const otp = z.object({
    code: z.string().max(6, {message:"Too long"}).min(6, {message:"Too short"})
})

export const api_key = z.object({
    id: z.number(),
    google_api_key: z.string()
        .min(20, {message: "Wrong Google Search API Key!"})
        .trim(),
    cx_key: z.string()
        .min(8, {message: "Wrong CX Key!"})
        .trim(),
})

export const add_phone = z.object({
    id: z.number(),
    tel: z.string().regex(new RegExp(/^\+\d{1,3} \d{3} \d{3} \d{3}$/), {
        message: "Wrong phone number format! Use format like +420 123 456 789",
    }).trim(),
})

export const get_email = z.object({
    email: z.string().email("Enter a valid email format!").trim()
})

export type SignType = z.infer<typeof signSchema>
export type ChangeDetailsType = z.infer<typeof changeDetailsSchema>
export type ChangePass = z.infer<typeof changePass>
export type API_KEY_TYPE = z.infer<typeof api_key>
export type addPhoneType = z.infer<typeof add_phone>
export type OTPType = z.infer<typeof otp>
export type GetEmailType = z.infer<typeof get_email>
export type updatePassType = z.infer<typeof updatePass>
