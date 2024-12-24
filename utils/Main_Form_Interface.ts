export interface FormData {
  name: string
  email: string
  address: string
  phone: string
  city: string
  preferredCountry: string
  preferredCountries: string[]
  academicLevel1: string
  level1Marks: string
  level1Year: string
  academicLevel2: string
  level2Marks: string
  level2Year: string
  bachelorDegree: string
  bachelorCGPA: string
  bachelorYear: string
  masterDegree: string
  masterCGPA: string
  masterYear: string
  educationLevel: string
  primaryCoursePreference: string
  secondaryCoursePreference: string
  languageTest: string
  languageTestScore: string
  budget: string
  visaHistory: string
  preferredCounselingMode: string
  heardAboutUs: string
}

export interface StepProps {
  formData: FormData
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}
