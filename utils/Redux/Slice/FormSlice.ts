import { FormData } from '@/utils/Main_Form_Interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: FormData = {
  name: '',
  email: '',
  address: '',
  phone: '',
  city: '',
  preferredCountries: [], // Ensure this is an array
  preferredCountry: '',
  academicLevel1: '',
  level1Marks: '',
  level1Year: '',
  academicLevel2: '',
  level2Marks: '',
  level2Year: '',
  bachelorDegree: '',
  bachelorCGPA: '',
  bachelorYear: '',
  masterDegree: '',
  masterCGPA: '',
  masterYear: '',
  educationLevel: '',
  primaryCoursePreference: '',
  secondaryCoursePreference: '',
  languageTest: '',
  languageTestScore: '',
  budget: '',
  visaHistory: '',
  preferredCounselingMode: '',
  heardAboutUs: '',
}

export const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload }
    },

    updateField: (
      state,
      action: PayloadAction<{ field: keyof FormData; value: string | string[] }>
    ) => {
      const { field, value } = action.payload
      if (field === 'preferredCountries') {
        if (Array.isArray(value)) {
          state[field] = value
        } else {
          console.error('Expected an array for preferredCountries')
        }
      } else {
        state[field] = value as string
      }
    },

    addPreferredCountry: (
      state,
      action: PayloadAction<{ country: string; add: boolean }>
    ) => {
      const { country, add } = action.payload
      if (add && !state.preferredCountries.includes(country)) {
        state.preferredCountries.push(country)
      } else if (!add) {
        state.preferredCountries = state.preferredCountries.filter(
          (item) => item !== country
        )
      }
    },

    addPreferredCountries: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((country) => {
        if (!state.preferredCountries.includes(country)) {
          state.preferredCountries.push(country)
        }
      })
    },

    removePreferredCountry: (state, action: PayloadAction<string>) => {
      state.preferredCountries = state.preferredCountries.filter(
        (country) => country !== action.payload
      )
    },
  },
})

export const {
  setFormData,
  updateField,
  addPreferredCountry,
  addPreferredCountries,
  removePreferredCountry,
} = formSlice.actions
