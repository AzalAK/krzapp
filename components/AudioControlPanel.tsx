import React from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Headphones, Video, MonitorUp, SignalHigh, PhoneOff, Settings } from 'lucide-react'
import { cn } from "@/lib/utils"

interface AudioControlPanelProps {
  isConnected: boolean
  channelName: string
  user: {
    name: string
    avatar: string
    status: string
  }
  onDisconnect: () => void
  className?: string
}

export function AudioControlPanel({ 
  isConnected, 
  channelName, 
  user, 
  onDisconnect,
  className 
}: AudioControlPanelProps) {
  const [isMuted, setIsMuted] = React.useState(false)
  const [isDeafened, setIsDeafened] = React.useState(false)
  const [videoEnabled, setVideoEnabled] = React.useState(false)
  const [screenShareEnabled, setScreenShareEnabled] = React.useState(false)

  return (
    <div className={cn(
      "fixed bottom-0 left-0 w-60 bg-gray-800 text-white rounded-t-lg shadow-lg transition-all duration-300 ease-in-out",
      !isConnected && "translate-y-full",
      className
    )}>
      <div className="p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-green-500 font-medium">Voice Connected</span>
          </div>
          <SignalHigh className="w-4 h-4 text-green-500 ml-auto" />
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 text-xs font-medium truncate">
            {channelName}
          </div>
        </div>

        <div className="flex justify-between items-center gap-1 mb-3">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hover:bg-gray-700",
              isMuted && "bg-red-500 hover:bg-red-600"
            )}
            onClick={() => setIsMuted(!isMuted)}
          >
            <Mic className={cn("h-4 w-4", isMuted && "text-white")} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hover:bg-gray-700",
              isDeafened && "bg-red-500 hover:bg-red-600"
            )}
            onClick={() => setIsDeafened(!isDeafened)}
          >
            <Headphones className={cn("h-4 w-4", isDeafened && "text-white")} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hover:bg-gray-700",
              videoEnabled && "bg-gray-700"
            )}
            onClick={() => setVideoEnabled(!videoEnabled)}
          >
            <Video className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hover:bg-gray-700",
              screenShareEnabled && "bg-gray-700"
            )}
            onClick={() => setScreenShareEnabled(!screenShareEnabled)}
          >
            <MonitorUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 bg-gray-900 rounded p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user.name}</div>
            <div className="text-xs text-gray-400 truncate">{user.status}</div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-700"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-700 text-red-500 hover:text-red-600"
              onClick={onDisconnect}
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

