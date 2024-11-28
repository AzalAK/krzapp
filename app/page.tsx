'use client'

import { useState } from 'react'
import { LoginPage } from '@/components/LoginPage'
import HomePage from '@/components/HomePage'

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    email: '',
    username: '',
    accountName: '',
    followers: 0,
    following: 0,
    avatarUrl: '/placeholder.svg?height=128&width=128'
  })

  const handleLogin = (email: string, username: string, password: string) => {
    setIsLoggedIn(true)
    setUser({
      email,
      username,
      accountName: username.toLowerCase(),
      followers: 1000,
      following: 500,
      avatarUrl: '/placeholder.svg?height=128&width=128'
    })
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <HomePage user={user} />
}

