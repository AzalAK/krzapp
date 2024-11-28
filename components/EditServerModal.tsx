import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight } from 'lucide-react'
import { RolesWindow } from './RolesWindow'

interface Role {
  id: string;
  name: string;
  color: string;
  permissions: { id: string; label: string; granted: boolean }[];
}

interface EditServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  serverName: string;
  serverImage: string;
  serverType: 'public' | 'private';
  roles: Role[];
  onSave: (data: { name: string; image: string; type: 'public' | 'private'; roles: Role[] }) => void;
  onUpdateRoles: (roles: Role[]) => void;
}

export function EditServerModal({
  isOpen,
  onClose,
  serverName,
  serverImage,
  serverType,
  roles,
  onSave,
  onUpdateRoles
}: EditServerModalProps) {
  const [name, setName] = useState(serverName);
  const [image, setImage] = useState(serverImage);
  const [type, setType] = useState<'public' | 'private'>(serverType);
  const [serverRoles, setServerRoles] = useState<Role[]>(roles);
  const [showRolesWindow, setShowRolesWindow] = useState(false);

  const handleSave = () => {
    onSave({ name, image, type, roles: serverRoles });
    onClose();
  };

  const toggleRolesWindow = () => {
    setShowRolesWindow(!showRolesWindow);
  };

  const handleAddRole = (newRole: Role) => {
    setServerRoles([...serverRoles, newRole]);
    onUpdateRoles([...serverRoles, newRole]);
  };

  const handleUpdateRole = (updatedRole: Role) => {
    const updatedRoles = serverRoles.map(role =>
      role.id === updatedRole.id ? updatedRole : role
    );
    setServerRoles(updatedRoles);
    onUpdateRoles(updatedRoles);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-theme">Edit Server</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-theme">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-theme">Image</Label>
            <div className="col-span-3">
              <Avatar className="h-20 w-20">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-theme">Type</Label>
            <RadioGroup value={type} onValueChange={(value: 'public' | 'private') => setType(value)} className="col-span-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="text-theme">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="text-theme">Private</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-theme">Roles</Label>
            <div className="col-span-3 flex items-center">
              <span className="text-theme">Manage Roles</span>
              <Button variant="ghost" size="sm" onClick={toggleRolesWindow} className="ml-2">
                <ChevronRight className={`h-4 w-4 transition-transform text-blue-500 ${showRolesWindow ? 'rotate-90' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
      {showRolesWindow && (
        <div className="fixed top-0 right-0 h-full w-80 bg-background shadow-lg z-50 overflow-auto">
          <RolesWindow
            roles={serverRoles}
            onAddRole={handleAddRole}
            onUpdateRole={handleUpdateRole}
            onClose={toggleRolesWindow}
          />
        </div>
      )}
    </Dialog>
  );
}

