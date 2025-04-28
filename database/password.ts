import crypto from "crypto"

export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error)

      resolve(hash.toString("hex").normalize())
    })
  })
}

export async function comparePasswords({
  password,
  salt,
  hashedPassword,
}: {
  password: string
  salt: string
  hashedPassword: string
}) {
  const inputHashedPassword = await hashPassword(password, salt)

  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, "hex"),
    Buffer.from(hashedPassword, "hex")
  )
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex").normalize()
}

const algorithm = "aes-256-cbc"
const key = Buffer.from(process.env.ENCRYPTION_KEY!, "hex") // 32 bytes
const iv = crypto.randomBytes(16) // 16 bytes IV

export function encrypt(text: string): { encryptedData: string; iv: string } {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")

  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
  }
}

export function decrypt(encryptedData: string, ivHex: string): string {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, "hex"))
  let decrypted = decipher.update(encryptedData, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}