'use client'
import { useState, FormEvent } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion' // For animations
import { BeatLoader } from 'react-spinners' // For loading spinner
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    if (!input) return
    // Append the user's message to the chat history
    const userMessage: Message = { role: 'user', content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setLoading(true)

    try {
      const response = await axios.post(
        'https://chatbot-backend-six-tau.vercel.app/api/chatbot/SendMessage',
        {
          message: input,
        }
      )
      const botMessage: Message = {
        role: 'assistant',
        content: response.data.message,
      }
      // Append the bot's message to the chat history
      setMessages((prevMessages) => [...prevMessages, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }

    // Clear input field
    setInput('')
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header with Logo */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Image
          width={50}
          height={50}
          src="/G_b-200x200.png"
          alt="Global Grads Logo"
          className="h-12"
        />
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-blue-600">Global Grads</h1>
          <h2 className="text-xl font-medium text-yellow-500">ChatBot</h2>
        </div>
      </div>

      {/* Chat Container */}
      <div className="border p-4 rounded-lg bg-gray-50 space-y-4 shadow-lg">
        {/* Messages Display */}
        <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`message ${message.role} p-2 rounded-md`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`font-semibold ${
                  message.role === 'user' ? 'text-blue-500' : 'text-yellow-500'
                }`}
              >
                {message.role === 'user' ? 'You' : 'Bot'}:
              </div>
              <p className="mt-1">{message.content}</p>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-center">
              <BeatLoader color="#0000ff" size={15} />
            </div>
          )}
        </div>

        {/* Input Field and Send Button */}
        <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
