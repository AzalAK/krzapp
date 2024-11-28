import React, { useState } from 'react'
import { Plus, Gift, ImageIcon, Smile, Sticker, Send, Mic, MicOff, Headphones, BluetoothOffIcon as HeadphonesOff, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface User {
  id: string
  username: string
  avatarUrl: string
  isSpeaking?: boolean
  isMuted?: boolean
  isDeafened?: boolean
}

interface VoiceChannelProps {
  channelName: string
  currentUser: User
  connectedUsers: User[]
  onClose: () => void
}

