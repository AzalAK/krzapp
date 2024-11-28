import React from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Headphones, Video, MonitorUp, PhoneOff } from 'lucide-react'
import { cn } from "@/lib/utils"

interface User {
  id: string
  username: string
  avatarUrl: string
}

interface ExpandedAudioViewProps {
  users: User[]
  onClose: () => void
  className?: string
}

export function ExpandedAudioView({ users, onClose, className }: ExpandedAudioViewProps) {
  return (
    <div className={cn(
      "fixed inset-0 bg-black/90 z-50 flex items-center justify-center",
      className
    )}>
      <div className="w-full max-w-5xl p-4">
        <div className="grid grid-cols-2 gap-4">
          {users.map((user) => (
            <div 
              key={user.id} 
              className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center"
            >
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1.5 rounded-md">
                <span className="text-sm font-medium text-white">{user.username}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-800/90 p-2 rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-zinc-700"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-zinc-700"
          >
            <Headphones className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-zinc-700"
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-zinc-700"
          >
            <MonitorUp className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-red-500 hover:bg-red-600"
            onClick={onClose}
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

