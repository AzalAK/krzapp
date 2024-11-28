import React from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Headphones, BluetoothOffIcon as HeadphonesOff, PhoneOff } from 'lucide-react'

interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

interface ExpandedAudioChannelViewProps {
  user: User;
  onLeave: () => void;
  onToggleMute: () => void;
  onToggleDeafen: () => void;
  isMuted: boolean;
  isDeafened: boolean;
  onClose: () => void;
}

export function ExpandedAudioChannelView({
  user,
  onLeave,
  onToggleMute,
  onToggleDeafen,
  isMuted,
  isDeafened,
  onClose
}: ExpandedAudioChannelViewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-80">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" onClick={onToggleMute}>
                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>
              <Button variant="outline" size="icon" onClick={onToggleDeafen}>
                {isDeafened ? <HeadphonesOff className="h-6 w-6" /> : <Headphones className="h-6 w-6" />}
              </Button>
              <Button variant="outline" size="icon" onClick={onLeave}>
                <PhoneOff className="h-6 w-6" />
              </Button>
            </div>
            <Button variant="ghost" onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

