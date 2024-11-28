import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Role {
  id: string;
  name: string;
  color: string;
}

interface RoleSelectorProps {
  roles: Role[];
  assignedRoles: string[];
  onRoleToggle: (roleId: string) => void;
}

export function RoleSelector({ roles, assignedRoles, onRoleToggle }: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Roles</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <ScrollArea className="h-[300px] pr-4">
          {roles.map((role) => (
            <div key={role.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={role.id}
                checked={assignedRoles.includes(role.id)}
                onCheckedChange={() => onRoleToggle(role.id)}
              />
              <Label
                htmlFor={role.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                style={{ color: role.color }}
              >
                {role.name}
              </Label>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

