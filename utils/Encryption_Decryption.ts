import CryptoJS from 'crypto-js' // Import the crypto-js library for encryption and decryption
import { UserData } from './SignupInterface'
// Get the secret key from environment variables (used for encryption/decryption)
// The 'as string' ensures that TypeScript knows it's a string type
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string
// Check if the secret key exists; if not, throw an error to prevent encryption/decryption issues
if (!SECRET_KEY) {
  throw new Error('Secret key is not defined') // Throw an error if the key is missing
}
// Function to encrypt user data
export const encryptData = (data: UserData) => {
  // Check again if the secret key is present before proceeding with encryption
  if (!SECRET_KEY) {
    throw new Error('Encryption failed: Secret key is missing.') // Error if key is not available
  }
  // Encrypt the user data using AES encryption
  // First, we convert the user data (object) to a JSON string using JSON.stringify(data)
  // Then, we encrypt the string using the SECRET_KEY
  localStorage.setItem(
    'UserData',
    CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
  )
  // The encrypted data is converted to a string so it can be stored or sent easily
}
// Function to decrypt previously encrypted data
export const decryptData = (ciphertext: string) => {
  // Check if the secret key is present before decrypting
  if (!SECRET_KEY) {
    throw new Error('Decryption failed: Secret key is missing.') // Error if key is not available
  }
  // Decrypt the ciphertext (encrypted string) using the SECRET_KEY
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
  // Convert the decrypted bytes back to a UTF-8 string (readable text format)
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
  try {
    // Parse the decrypted string back into its original object form (JSON)
    return JSON.parse(decryptedData)
  } catch (error) {
    // If parsing fails (for example, if the decrypted string isn't valid JSON), log the error
    console.log(error)
  }
}
