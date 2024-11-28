'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Role {
  id: string
  name: string
  color: string
}

interface User {
  id: string
  username: string
  discriminator: string
  avatarUrl: string
  roles: Role[]
  isOnline?: boolean
}

interface RolesWindowProps {
  onClose: () => void
}

export function RolesWindow({ onClose }: RolesWindowProps) {
  // Example user data
  const exampleUser: User = {
    id: '1',
    username: 'Wumpus',
    discriminator: '0000',
    avatarUrl: '/placeholder.svg?height=80&width=80',
    isOnline: true,
    roles: [
      { id: '1', name: 'president', color: '#FF73FA' },
      { id: '2', name: 'leadership', color: '#FFA200' },
      { id: '3', name: 'coach', color: '#FF3366' },
      { id: '4', name: 'new recruit', color: '#00CC99' },
      { id: '5', name: 'alumni', color: '#00A8FC' },
      { id: '6', name: 'mentee', color: '#FF4444' }
    ]
  }

  return (
    <Card className="fixed inset-y-0 right-0 w-[480px] shadow-lg border-0 rounded-none bg-[#2B2D31]">
      <CardHeader className="flex flex-row items-center justify-between px-4 py-4 border-b border-[#1f2023]">
        <CardTitle className="text-lg font-semibold text-white">Roles</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-[#1f2023] text-gray-400"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="text-xs text-gray-400 px-2">ESC</div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-8">
            {/* Example user card */}
            <div className="relative w-full max-w-sm mx-auto bg-[#1f2023] rounded-lg p-4 mb-8">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-[#1f2023]">
                    <AvatarImage src={exampleUser.avatarUrl} />
                    <AvatarFallback>WU</AvatarFallback>
                  </Avatar>
                  {exampleUser.isOnline && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-4 border-[#1f2023]" />
                  )}
                </div>
              </div>
              <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {exampleUser.username}#{exampleUser.discriminator}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {exampleUser.roles.map((role) => (
                    <Badge
                      key={role.id}
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: role.color }}
                    >
                      {role.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Roles section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Organize your members
              </h2>
              <p className="text-[#B9BBBE] mb-4">
                Use roles to group your server members and assign permissions.
              </p>
              <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
                Create Role
              </Button>
            </div>

            {/* Default permissions */}
            <div className="bg-[#1f2023] rounded-lg p-4">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between text-[#B9BBBE] hover:bg-[#2B2D31]"
              >
                <span className="font-medium">Default Permissions</span>
                <span className="text-xs">@everyone • applies to all server members</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

