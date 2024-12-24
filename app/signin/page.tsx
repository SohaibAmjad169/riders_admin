'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/utils/Redux/Slice/UserSlice'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        'https://your-backend-url.com/api/login',
        {
          Email: email,
          Password: password,
        }
      )

      if (response.status === 200) {
        const user = response.data
        // Dispatch user to Redux store
        dispatch(setUser({ id: user._id, name: user.Name, email: user.Email }))
        // Redirect to another page (e.g., dashboard)
        router.push('/dashboard')
      } else {
        setError(response.data.message || 'Login failed')
      }
    } catch (error: any) {
      console.error(error)
      setError(error.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Do not have an account?{' '}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => router.push('/signup')}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}
