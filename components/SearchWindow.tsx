import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

interface SearchWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: User) => void;
}

const mockUsers: User[] = [
  { id: '1', username: 'john_doe', avatarUrl: '/placeholder.svg?height=40&width=40' },
  { id: '2', username: 'jane_smith', avatarUrl: '/placeholder.svg?height=40&width=40' },
  { id: '3', username: 'alice_wonder', avatarUrl: '/placeholder.svg?height=40&width=40' },
]

export function SearchWindow({ isOpen, onClose, onSelectUser }: SearchWindowProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (searchTerm) {
      const results = mockUsers.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-start justify-center pt-16 pb-20">
      <Card className="w-full max-w-md mx-auto h-[calc(100%-8rem)]" ref={searchRef}>
        <CardContent className="p-4">
          <div className="flex items-center mb-4">
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={onClose} className="ml-2">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {searchResults.map(user => (
              <div
                key={user.id}
                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                onClick={() => onSelectUser(user)}
              >
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.username}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

