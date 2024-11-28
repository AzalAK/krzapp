'use client'

import React, { useState } from 'react'
import { ArrowLeft, Settings, Edit3, Heart, ScissorsIcon as Scythe, Shield, Crown, Globe, Star, Hash, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EditProfileModal } from './EditProfileModal'

interface User {
  id: string
  email: string
  username: string
  accountName: string
  followers: number
  following: number
  avatarUrl: string
  bannerUrl: string
  isGif?: boolean
  displayName: string
}

interface ProfilePageProps {
  user: User
  onBack: () => void
  onUpdateProfile: (updatedUser: Partial<User>) => void
}

export function ProfilePage({ user, onBack, onUpdateProfile }: ProfilePageProps) {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [frameColor, setFrameColor] = useState('#000000');
  const [nameColor, setNameColor] = useState('#000000');

  const handleEditProfile = (updatedUser: User) => {
    onUpdateProfile(updatedUser);
    setIsEditProfileModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
          <div className="absolute top-4 right-4">
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => setIsEditProfileModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Edit User Profile
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="relative h-48 bg-cover bg-center bg-gray-900" style={{ backgroundImage: `url(${user.bannerUrl || '/placeholder.svg?height=192&width=768'})` }}>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <Avatar className="h-32 w-32 border-4 relative" style={{ borderColor: frameColor }}>
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1"
                  onClick={() => setIsEditProfileModalOpen(true)}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </Avatar>
            </div>
          </div>

          <div className="pt-20 px-6 pb-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold" style={{ color: nameColor }}>{user.displayName || user.username}</h2>
                <div className="flex items-center space-x-1 mt-1">
                  <Button variant="ghost" size="icon" className="w-6 h-6 p-0.5">
                    <Shield className="h-full w-full text-purple-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-6 h-6 p-0.5">
                    <Hash className="h-full w-full text-green-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-6 h-6 p-0.5">
                    <Globe className="h-full w-full text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-6 h-6 p-0.5">
                    <Star className="h-full w-full text-pink-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-6 h-6 p-0.5">
                    <Crown className="h-full w-full text-green-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-6 h-6 p-0.5">
                    <Settings className="h-full w-full text-blue-500" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <p className="text-gray-600 dark:text-gray-400">@{user.accountName}</p>
                <div className="ml-2 bg-gray-200 dark:bg-gray-700 p-1 rounded-md flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-black dark:text-white" />
                  <Scythe className="w-4 h-4 text-black dark:text-white" />
                </div>
              </div>
              <div className="flex mt-4 space-x-4">
                <div className="text-center">
                  <span className="block font-bold text-gray-900 dark:text-gray-100">{user.followers}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Followers</span>
                </div>
                <div className="text-center">
                  <span className="block font-bold text-gray-900 dark:text-gray-100">{user.following}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Following</span>
                </div>
              </div>
              <Button className="mt-6" variant="outline" onClick={() => setIsEditProfileModalOpen(true)}>
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </main>

      {isEditProfileModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditProfileModalOpen(false)}
          onUpdateUser={handleEditProfile}
        />
      )}
    </div>
  )
}

