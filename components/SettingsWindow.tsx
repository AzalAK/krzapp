import { Button } from '@/components/ui/button'

interface SettingsWindowProps {
  isOpen: boolean
  toggleProfile: () => void
}

export function SettingsWindow({ isOpen, toggleProfile }: SettingsWindowProps) {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 w-64 bg-white dark:bg-gray-800 rounded-b-lg shadow-lg z-30 mt-2">
      <div className="p-4 space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={toggleProfile}>
          Profile
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Blocked accounts
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Followers
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Your activities
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Alerts
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Account privacy
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Log out
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Add an account
        </Button>
      </div>
    </div>
  )
}

