'use client'

import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Cherry, Minus, Square, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface LoginPageProps {
  onLogin: (email: string, password: string) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email, password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4B0082] to-[#0000FF] relative overflow-hidden">
      {/* Animated stars background */}
      <div className="stars-background" />
      
      {/* Window controls */}
      <div className="fixed top-0 right-0 flex items-center p-2 space-x-2">
        <button className="text-white/50 hover:text-white">
          <Minus className="h-4 w-4" />
        </button>
        <button className="text-white/50 hover:text-white">
          <Square className="h-4 w-4" />
        </button>
        <button className="text-white/50 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* App header */}
      <div className="fixed top-0 left-0 p-4 flex items-center">
        <Cherry className="h-8 w-8 text-white mr-2" />
        <span className="text-white text-xl font-semibold">KRZ</span>
      </div>

      {/* Main content */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-[1fr,auto] gap-8 bg-[#2b2d31] p-8 rounded-lg">
          <div className="space-y-6">
            <button className="text-white/50 hover:text-white flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go back
            </button>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome back!</h1>
              <p className="text-[#B9BBBE]">We're so excited to see you again!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase text-[#B9BBBE]">
                  Email or Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1e1f22] border-0 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase text-[#B9BBBE]">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#1e1f22] border-0 text-white pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <a href="#" className="text-[#00A8FC] text-sm hover:underline block">
                Forgot your password?
              </a>

              <Button
                type="submit"
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                Log In
              </Button>

              <p className="text-[#B9BBBE] text-sm">
                Need an account?{' '}
                <a href="#" className="text-[#00A8FC] hover:underline">
                  Register
                </a>
              </p>
            </form>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center p-8 space-y-4">
            <div className="bg-white p-2 rounded-lg">
              <img
                src="/placeholder.svg?height=176&width=176"
                alt="QR Code"
                className="w-44 h-44"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Log in with QR Code</h2>
              <p className="text-[#B9BBBE]">
                Scan this with the <span className="font-bold">KRZ mobile app</span>{' '}
                to log in instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

