import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Headphones, BluetoothOffIcon as HeadphonesOff } from 'lucide-react'

interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

interface AudioChannelWindowProps {
  channelName: string;
  users: User[];
  currentUser: User;
  onClose: () => void;
  onLeaveChannel: () => void;
}

export function AudioChannelWindow({ channelName, users, currentUser, onClose, onLeaveChannel }: AudioChannelWindowProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleDeafen = () => setIsDeafened(!isDeafened);

  const handleClose = () => {
    setIsClosing(true);
    onLeaveChannel(); 
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Card className="fixed inset-y-0 right-0 w-3/4 bg-white dark:bg-gray-800 shadow-lg z-50">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{channelName}</h2>
          <Button variant="ghost" onClick={handleClose} className="text-gray-600 dark:text-gray-400">
            Leave Channel
          </Button>
        </div>
        <div className="flex-grow overflow-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {users.map((user) => (
              <div key={user.id} className="flex flex-col items-center">
                <Card className="w-full mb-4 overflow-hidden">
                  <Avatar className="w-full h-32 sm:h-40 md:h-48">
                    <AvatarImage src={user.avatarUrl} alt={user.username} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Card>
                <span className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
                  {user.username} {user.id === currentUser.id && '(You)'}
                </span>
                {user.id === currentUser.id && (
                  <div className="flex justify-center space-x-4 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleMute}
                      className={`p-2 ${isMuted ? "bg-red-500 text-white" : ""}`}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleDeafen}
                      className={`p-2 ${isDeafened ? "bg-red-500 text-white" : ""}`}
                    >
                      {isDeafened ? <HeadphonesOff className="h-5 w-5" /> : <Headphones className="h-5 w-5" />}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

