import React, { useState, useRef } from 'react'
import { ChevronDown, Hash, Volume2, Plus, Settings, Bell, Pin, Users, Search, HelpCircle, X, Gift, Smile, ImageIcon, Sticker, Send, Calendar, Crown, MessageSquare, UserPlus, Palette, AppWindow, ChevronRight, Cherry, HomeIcon, Heart, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { TextChannelChat } from './TextChannelChat'
import { AudioChannelWindow } from './AudioChannelWindow'
import { ServerDropdownMenu } from './ServerDropdownMenu'
import { ServerSettingsModal } from './ServerSettingsModal';

interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'audio';
}

interface Category {
  id: string;
  name: string;
  channels: Channel[];
}

interface GroupSideWindowProps {
  serverName: string;
  onClose: () => void;
  onToggle: () => void;
}

export function GroupSideWindow({
  serverName,
  onClose,
  onToggle
}: GroupSideWindowProps) {
  const [categoryStates, setCategoryStates] = useState({
    text: false,
    voice: false
  })
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Text Channels',
      channels: [
        { id: 't1', name: 'general', type: 'text' },
        { id: 't2', name: 'random', type: 'text' },
      ]
    },
    {
      id: '2',
      name: 'Voice Channels',
      channels: [
        { id: 'v1', name: 'General', type: 'audio' },
        { id: 'v2', name: 'Gaming', type: 'audio' },
      ]
    }
  ])
  const [members] = useState<User[]>([
    { id: '1', username: 'Alice', avatarUrl: '/placeholder.svg?height=32&width=32' },
    { id: '2', username: 'Bob', avatarUrl: '/placeholder.svg?height=32&width=32' },
    { id: '3', username: 'Charlie', avatarUrl: '/placeholder.svg?height=32&width=32' },
  ])
  const currentUser: User = { id: '0', username: 'You', avatarUrl: '/placeholder.svg?height=32&width=32' }
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [isServerMenuOpen, setIsServerMenuOpen] = useState(false)
  const [isServerSettingsOpen, setIsServerSettingsOpen] = useState(false);

  const toggleCategory = (category: 'text' | 'voice') => {
    setCategoryStates(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel)
  }

  const toggleBottomBar = () => {
    setShowBottomBar(!showBottomBar);
  };

  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 flex">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 left-2 z-50"
        onClick={toggleBottomBar}
      >
        {showBottomBar ? (
          <X className="h-6 w-6 text-gray-400" />
        ) : (
          <ChevronRight className="h-6 w-6 text-gray-400" />
        )}
      </Button>
      {/* Left sidebar */}
      <div className="w-60 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col min-h-screen">
        {/* Server header */}
        <div className="relative">
          <button 
            className="flex items-center justify-between h-12 px-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full cursor-pointer border-b border-gray-200 dark:border-gray-700"
            onClick={() => setIsServerMenuOpen(!isServerMenuOpen)}
          >
            <span className="font-medium text-gray-900 dark:text-white text-base truncate">
              {serverName}
            </span>
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-gray-500 dark:text-gray-400 ml-auto transition-transform duration-200",
                isServerMenuOpen && "rotate-180"
              )} 
            />
          </button>
          <ServerDropdownMenu 
            isOpen={isServerMenuOpen} 
            onClose={() => setIsServerMenuOpen(false)} 
            onServerSettings={() => setIsServerSettingsOpen(true)}
          />
        </div>

        {/* Events section */}
        <div className="px-2 mt-4">
          <div className="flex items-center px-2 text-gray-300 h-6">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">Events</span>
          </div>
        </div>

        {/* Channels */}
        <ScrollArea className="flex-grow">
          {categories.map((category) => (
            <div key={category.id} className="px-2 mt-4">
              <button
                onClick={() => toggleCategory(category.name.toLowerCase().includes('text') ? 'text' : 'voice')}
                className="flex items-center px-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 w-full"
              >
                <ChevronDown className={cn(
                  "h-3 w-3 transition-transform",
                  categoryStates[category.name.toLowerCase().includes('text') ? 'text' : 'voice'] && "-rotate-90"
                )} />
                <span className="text-xs font-semibold ml-1">{category.name.toUpperCase()}</span>
                <Plus className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100" />
              </button>

              {!categoryStates[category.name.toLowerCase().includes('text') ? 'text' : 'voice'] && (
                <div className="mt-1">
                  {category.channels.map((channel) => (
                    <button
                      key={channel.id}
                      className="flex items-center px-2 py-1 w-full rounded text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 group"
                      onClick={() => handleChannelSelect(channel)}
                    >
                      {channel.type === 'text' ? (
                        <Hash className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-1.5" />
                      ) : (
                        <Volume2 className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-1.5" />
                      )}
                      <span className="text-sm">{channel.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>

        {/* User controls */}
        <div className="mt-auto p-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{currentUser.username}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Online</div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {selectedChannel ? (
          selectedChannel.type === 'text' ? (
            <TextChannelChat
              channelName={selectedChannel.name}
              currentUser={currentUser}
              onClose={() => setSelectedChannel(null)}
              groupId="1"
              channelId={selectedChannel.id}
            />
          ) : (
            <AudioChannelWindow
              channelName={selectedChannel.name}
              users={[currentUser, ...members]}
              currentUser={currentUser}
              onClose={() => setSelectedChannel(null)}
              onLeaveChannel={() => setSelectedChannel(null)}
            />
          )
        ) : (
          <div className="flex-1 p-4">
            <div className="max-w-2xl mx-auto text-center mt-16">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome to {serverName}</h1>
              <p className="text-gray-400 mb-8">
                Select a channel to start chatting or join a voice call.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Members sidebar */}
      <div className="w-60 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center">
            Online — {members.length + 1}
          </h3>
        </div>
        <ScrollArea className="h-[calc(100vh-57px)]">
          <div className="p-2">
            {[currentUser, ...members].map((member) => (
              <div key={member.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatarUrl} />
                  <AvatarFallback>{member.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {member.username}
                    </span>
                    {member.id === '0' && <Crown className="h-3.5 w-3.5 text-yellow-500" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <ServerSettingsModal
        isOpen={isServerSettingsOpen}
        onClose={() => setIsServerSettingsOpen(false)}
        serverName={serverName}
        serverImage="/placeholder.svg?height=512&width=512"
        onUpdateServer={(data) => {
          console.log('Server updated:', data);
          setIsServerSettingsOpen(false);
        }}
      />
      {showBottomBar && (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#2B2D31] border-t border-[#1f2023] z-50">
          <div className="flex justify-around">
            <Button variant="ghost" className="flex-1 py-4">
              <HomeIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="flex-1 py-4">
              <Users className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="flex-1 py-4">
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="flex-1 py-4">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="flex-1 py-4">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </nav>
      )}
    </div>
  )
}

