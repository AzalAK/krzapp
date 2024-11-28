import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface EditProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarUrl: string | undefined;
  onSave: (newAvatarUrl: string) => void;
}

export function EditProfilePhotoModal({ 
  isOpen, 
  onClose, 
  currentAvatarUrl, 
  onSave 
}: EditProfilePhotoModalProps) {
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl || '');

  const handleSave = () => {
    onSave(avatarUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#2f3136] text-gray-200">
        <DialogHeader>
          <DialogTitle>Edit Profile Photo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <Input
              id="avatar"
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full"
              placeholder="Enter avatar URL"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

