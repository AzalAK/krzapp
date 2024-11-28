'use client'

import { useState } from 'react'
import { X, Upload, Hash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { RolesWindow } from './RolesWindow'
import { cn } from "@/lib/utils"

interface ServerSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  serverName: string
  serverImage: string
  onUpdateServer: (data: { name: string; image: string }) => void
}

interface NavItem {
  id: string
  label: string
  section: string
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', section: '' },
  { id: 'roles', label: 'Roles', section: '' },
  { id: 'emoji', label: 'Emoji', section: '' },
  { id: 'stickers', label: 'Stickers', section: '' },
  { id: 'soundboard', label: 'Soundboard', section: '' },
  { id: 'widget', label: 'Widget', section: '' },
  { id: 'template', label: 'Server Template', section: '' },
  { id: 'invite', label: 'Custom Invite Link', section: '' },
  { id: 'apps', label: 'Apps', section: 'APPS' },
  { id: 'integrations', label: 'Integrations', section: '' },
  { id: 'directory', label: 'App Directory', section: '' },
  { id: 'safety', label: 'Safety Setup', section: 'MODERATION' },
  { id: 'automod', label: 'AutoMod', section: '' },
  { id: 'audit', label: 'Audit Log', section: '' },
  { id: 'bans', label: 'Bans', section: '' },
  { id: 'community', label: 'Enable Community', section: 'COMMUNITY' },
]

export function ServerSettingsModal({ 
  isOpen, 
  onClose, 
  serverName: initialServerName,
  serverImage: initialServerImage,
  onUpdateServer 
}: ServerSettingsModalProps) {
  const [selectedNav, setSelectedNav] = useState('overview')
  const [serverName, setServerName] = useState(initialServerName)
  const [serverImage, setServerImage] = useState(initialServerImage)
  const [welcomeMessage, setWelcomeMessage] = useState(true)
  const [welcomeSticker, setWelcomeSticker] = useState(true)
  const [showRolesWindow, setShowRolesWindow] = useState(false)

  if (!isOpen) return null

  const handleNavClick = (id: string) => {
    if (id === 'roles') {
      setShowRolesWindow(true)
    } else {
      setSelectedNav(id)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-full max-w-[740px] bg-[#313338] text-gray-100">
        <div className="flex h-full">
          {/* Left sidebar */}
          <div className="w-[232px] bg-[#2B2D31] p-3">
            <ScrollArea className="h-full">
              {navItems.map((item, index) => (
                <div key={item.id}>
                  {item.section && (
                    <div className="px-2 pt-4 pb-2">
                      <p className="text-xs font-semibold text-gray-400">{item.section}</p>
                    </div>
                  )}
                  <button
                    className={cn(
                      "w-full px-2.5 py-1.5 rounded text-sm font-medium text-left",
                      selectedNav === item.id ? "bg-[#404249] text-gray-100" : "text-gray-300 hover:bg-[#35373C] hover:text-gray-100"
                    )}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </button>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 shadow-sm">
              <h2 className="text-xl font-semibold">Server Overview</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-[#35373C]"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
                <div className="text-xs text-gray-400 px-2">ESC</div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="max-w-[660px] mx-auto space-y-6">
                {/* Server image upload */}
                <div className="flex items-start gap-4">
                  <div className="relative group">
                    <img
                      src={serverImage || "/placeholder.svg?height=100&width=100"}
                      alt="Server icon"
                      className="w-[100px] h-[100px] rounded-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                      <Upload className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">
                      We recommend an image of at least 512x512 for the server.
                    </p>
                    <Button variant="secondary" className="bg-[#4E505C] hover:bg-[#6D6F78] text-white">
                      Upload Image
                    </Button>
                  </div>
                </div>

                {/* Server name */}
                <div className="space-y-2">
                  <Label htmlFor="serverName" className="text-xs font-bold uppercase text-gray-300">
                    SERVER NAME
                  </Label>
                  <Input
                    id="serverName"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    className="bg-[#1E1F22] border-0 text-gray-100"
                  />
                </div>

                <Separator className="bg-[#3F4147]" />

                {/* System Messages */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold uppercase text-gray-300">
                      SYSTEM MESSAGES CHANNEL
                    </Label>
                    <Select defaultValue="#general">
                      <SelectTrigger className="bg-[#1E1F22] border-0 text-gray-100 mt-2">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            general
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="#general">
                          <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            general
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400 mt-2">
                      This is the channel we send system event messages to. These can be turned off at any time.
                    </p>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Send a random welcome message when someone joins this server.</p>
                    </div>
                    <Switch
                      checked={welcomeMessage}
                      onCheckedChange={setWelcomeMessage}
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Prompt members to reply to welcome messages with a sticker.</p>
                    </div>
                    <Switch
                      checked={welcomeSticker}
                      onCheckedChange={setWelcomeSticker}
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Roles Window */}
      {showRolesWindow && (
        <RolesWindow onClose={() => setShowRolesWindow(false)} />
      )}
    </div>
  )
}

