'use client'

import React, { useState, useRef } from 'react'
import { X, Camera, Image } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface User {
  displayName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  avatarUrl: string;
  bannerUrl: string;
}

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onUpdateUser: (updatedUser: User) => void;
}

export function EditProfileModal({ user, onClose, onUpdateUser }: EditProfileModalProps) {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [username, setUsername] = useState(user.username || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [bannerUrl, setBannerUrl] = useState(user.bannerUrl || '');
  const [hasChanges, setHasChanges] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setUrl: React.Dispatch<React.SetStateAction<string>>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result as string);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      displayName,
      username,
      avatarUrl,
      bannerUrl,
    };
    onUpdateUser(updatedUser);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#2f3136] text-gray-200">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl} alt={displayName || 'User'} />
              <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => avatarInputRef.current?.click()}
              className="text-white border-white/20 hover:bg-white/10"
            >
              <Camera className="h-4 w-4 mr-2" />
              Change Profile Picture
            </Button>
            <input
              type="file"
              ref={avatarInputRef}
              onChange={(e) => handleFileChange(e, setAvatarUrl)}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-300 mb-2">Banner Image</p>
            <div className="relative h-32 rounded-lg overflow-hidden bg-gray-700">
              <img src={bannerUrl || '/placeholder.svg?height=128&width=512'} alt="Banner" className="w-full h-full object-cover" />
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-2 right-2 text-white border-white/20 hover:bg-white/10"
                onClick={() => bannerInputRef.current?.click()}
              >
                <Image className="h-4 w-4 mr-2" />
                Change Banner
              </Button>
            </div>
            <input
              type="file"
              ref={bannerInputRef}
              onChange={(e) => handleFileChange(e, setBannerUrl)}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div>
            <label htmlFor="displayName" className="text-sm font-medium text-gray-300">Display Name</label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                setHasChanges(true);
              }}
              className="bg-[#1e1f22] border-none text-white mt-1"
            />
          </div>

          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-300">Username</label>
            <Input
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setHasChanges(true);
              }}
              className="bg-[#1e1f22] border-none text-white mt-1"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-300">Email</p>
            <p className="text-gray-400">{user.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-300">Phone Number</p>
            <p className="text-gray-400">{user.phoneNumber || "Not set"}</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={!hasChanges}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

