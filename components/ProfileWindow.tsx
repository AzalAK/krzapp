import React from 'react'
import { X, Heart, Scissors } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Role {
 id: string;
 name: string;
 color: string;
}

interface User {
 id: string;
 username: string;
 accountName: string;
 avatarUrl: string;
 roles: Role[];
 badges?: string[];
}

interface ProfileWindowProps {
 user: User;
 onClose: () => void;
}

export function ProfileWindow({ user, onClose }: ProfileWindowProps) {
 return (
   <Card className="fixed top-0 right-0 h-full w-80 shadow-lg z-50 overflow-hidden">
     <CardHeader className="relative">
       <Button
         variant="ghost"
         size="icon"
         className="absolute top-2 right-2"
         onClick={onClose}
       >
         <X className="h-4 w-4" />
       </Button>
       <div className="flex flex-col items-center">
         <Avatar className="h-24 w-24 mb-2">
           <AvatarImage src={user.avatarUrl} alt={user.username} />
           <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
         </Avatar>
         <CardTitle className="text-2xl font-bold">{user.username}</CardTitle>
         <div className="flex flex-col items-center mt-1">
           <p className="text-sm text-muted-foreground">@{user.accountName}</p>
           <div className="bg-secondary p-1 rounded-md flex items-center space-x-1 mt-2">
             <Heart className="h-4 w-4 text-primary" />
             <Scissors className="h-4 w-4 text-primary" />
           </div>
         </div>
       </div>
     </CardHeader>
     <CardContent>
       <ScrollArea className="h-[calc(100vh-200px)]">
         <div className="space-y-6">
           <div>
             <h3 className="text-lg font-semibold mb-2">Roles</h3>
             <div className="flex flex-wrap gap-2">
               {user.roles && user.roles.length > 0 ? (
                 user.roles.map((role) => (
                   <Badge
                     key={role.id}
                     style={{ backgroundColor: role.color, color: '#ffffff' }}
                   >
                     {role.name}
                   </Badge>
                 ))
               ) : (
                 <p className="text-sm text-muted-foreground">No roles assigned</p>
               )}
             </div>
           </div>
         </div>
       </ScrollArea>
     </CardContent>
   </Card>
 )
}

