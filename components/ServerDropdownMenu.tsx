import { Button } from "@/components/ui/button"
import { Rocket, Users, Settings, Plus, FolderPlus, Calendar, Grid, Bell, Shield, Pencil, Eye, UserPlus } from 'lucide-react'

interface ServerDropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onServerSettings: () => void;
}

export function ServerDropdownMenu({ isOpen, onClose, onServerSettings }: ServerDropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-56 bg-gray-900 rounded-md shadow-lg overflow-hidden z-50">
      <div className="py-1">
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-purple-400 hover:bg-gray-800"
        >
          <Rocket className="mr-2 h-4 w-4" />
          Server Boost
        </Button>
        <div className="border-t border-gray-700" />
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-blue-400 hover:bg-gray-800"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Invite People
        </Button>
        <div className="border-t border-gray-700" />
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
          onClick={onServerSettings}
        >
          <Settings className="mr-2 h-4 w-4" />
          Server Settings
        </Button>
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Channel
        </Button>
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
        >
          <FolderPlus className="mr-2 h-4 w-4" />
          Create Category
        </Button>
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Create Event
        </Button>
        <div className="border-t border-gray-700" />
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
        >
          <Grid className="mr-2 h-4 w-4" />
          App Directory
        </Button>
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
        >
          <Bell className="mr-2 h-4 w-4" />
          Notification Settings
        </Button>
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
        >
          <Shield className="mr-2 h-4 w-4" />
          Privacy Settings
        </Button>
        <div className="border-t border-gray-700" />
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Server Profile
        </Button>
        <Button
          variant="ghost"
          className="relative flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
        >
          <Eye className="mr-2 h-4 w-4" />
          Hide Muted Channels
        </Button>
      </div>
    </div>
  )
}

