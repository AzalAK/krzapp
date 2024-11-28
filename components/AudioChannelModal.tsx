import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface User {
 id: string;
 username: string;
 avatarUrl: string;
}

interface AudioChannelModalProps {
 isOpen: boolean;
 onClose: () => void;
 channelName: string;
 onJoin: (user: User) => void;
 currentUser: User;
}

export function AudioChannelModal({ isOpen, onClose, channelName, onJoin, currentUser }: AudioChannelModalProps) {
 return (
   <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-none">
       <DialogHeader>
         <DialogTitle className="text-xl font-semibold">Voice Channel</DialogTitle>
         <DialogDescription className="text-gray-400">
           Would you like to join the voice channel "{channelName}"?
         </DialogDescription>
       </DialogHeader>
       <div className="flex justify-end space-x-2 mt-4">
         <Button 
           variant="ghost" 
           onClick={onClose}
           className="hover:bg-gray-700 text-white"
         >
           Cancel
         </Button>
         <Button 
           onClick={() => onJoin(currentUser)}
           className="bg-green-600 text-white hover:bg-green-700"
         >
           Join Channel
         </Button>
       </div>
     </DialogContent>
   </Dialog>
 )
}

