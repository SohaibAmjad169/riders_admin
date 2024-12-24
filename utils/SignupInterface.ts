export const APIURL = 'https://crm-backend-azure-iota.vercel.app/'
export interface SignupFieldsProps {
  inputValues: {
    Name: string
    Email: string
    password: string
    confirmPassword: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export interface UserData {
  Name: string
  Email: string
}
