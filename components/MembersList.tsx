import { Crown, Shield } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Member {
  id: string
  username: string
  avatarUrl: string
  isOwner?: boolean
  role?: string
  status?: 'online' | 'idle' | 'dnd' | 'offline'
}

interface MembersListProps {
  members: Member[]
}

export function MembersList({ members }: MembersListProps) {
  // Sort members with owner first, then by username
  const sortedMembers = [...members].sort((a, b) => {
    if (a.isOwner) return -1
    if (b.isOwner) return 1
    return a.username.localeCompare(b.username)
  })

  return (
    <div className="w-60 bg-gray-900 border-l border-gray-700 h-full">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-200">Members — {members.length}</h3>
      </div>
      <ScrollArea className="h-[calc(100%-57px)]">
        <div className="p-2">
          {sortedMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-800 group cursor-pointer"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.avatarUrl} alt={member.username} />
                <AvatarFallback>{member.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-100 truncate">
                    {member.username}
                  </span>
                  {member.isOwner && (
                    <Crown className="h-3.5 w-3.5 text-yellow-500" />
                  )}
                  {member.role === 'admin' && (
                    <Shield className="h-3.5 w-3.5 text-blue-500" />
                  )}
                </div>
                {member.status && (
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      member.status === 'online' ? 'bg-green-500' :
                      member.status === 'idle' ? 'bg-yellow-500' :
                      member.status === 'dnd' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`} />
                    <span className="text-xs text-gray-400">
                      {member.status === 'dnd' ? 'Do Not Disturb' : member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

