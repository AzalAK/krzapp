import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, ScissorsIcon } from 'lucide-react'

interface Role {
 id: string;
 name: string;
 color: string;
}

interface User {
 id: string;
 username: string;
 avatarUrl: string;
 accountName: string;
 roles: Role[];
}

interface MemberProfileModalProps {
 isOpen: boolean;
 onClose: () => void;
 user: User;
}

export function MemberProfileModal({ isOpen, onClose, user }: MemberProfileModalProps) {
 return (
   <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className="sm:max-w-[425px]">
       <DialogHeader>
         <DialogTitle className="text-2xl font-bold text-center">{user.username}</DialogTitle>
       </DialogHeader>
       <div className="flex flex-col items-center space-y-4">
         <Avatar className="h-24 w-24">
           <AvatarImage src={user.avatarUrl} alt={user.username} />
           <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
         </Avatar>
         <div className="flex items-center space-x-2">
           <span className="text-lg font-semibold">@{user.accountName}</span>
           <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-md flex items-center space-x-1">
             <Heart className="w-4 h-4 text-red-500" />
             <ScissorsIcon className="w-4 h-4 text-blue-500" />
           </div>
         </div>
         {user.roles && user.roles.length > 0 && (
           <div className="flex flex-wrap gap-2">
             {user.roles.map((role) => (
               <span
                 key={role.id}
                 className="px-2 py-1 rounded-full text-xs font-semibold"
                 style={{ backgroundColor: role.color, color: '#ffffff' }}
               >
                 {role.name}
               </span>
             ))}
           </div>
         )}
       </div>
     </DialogContent>
   </Dialog>
 )
}

