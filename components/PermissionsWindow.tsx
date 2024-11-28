import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Permission {
 id: string;
 label: string;
 granted: boolean;
}

interface Role {
 id: string;
 name: string;
 permissions: Permission[];
}

interface PermissionsWindowProps {
 role: Role;
 onClose: () => void;
 onPermissionChange: (roleId: string, permissions: Permission[]) => void;
 onHasChanges: (hasChanges: boolean) => void;
}

export function PermissionsWindow({ role, onClose, onPermissionChange, onHasChanges }: PermissionsWindowProps) {
 const [permissions, setPermissions] = useState<Permission[]>(role.permissions);
 const [height, setHeight] = useState(300);
 const permissionsWindowRef = useRef<HTMLDivElement>(null);
 const resizeRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
   setPermissions(role.permissions);
 }, [role]);

 const handlePermissionChange = (permissionId: string, granted: boolean) => {
   const updatedPermissions = permissions.map(p =>
     p.id === permissionId ? { ...p, granted } : p
   );
   setPermissions(updatedPermissions);
   onPermissionChange(role.id, updatedPermissions);
   onHasChanges(true);
 };

 useEffect(() => {
   const handleClickOutside = (event: MouseEvent) => {
     if (permissionsWindowRef.current && !permissionsWindowRef.current.contains(event.target as Node)) {
       onClose();
     }
   };

   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, [onClose]);

 useEffect(() => {
   const resizeElement = resizeRef.current;
   if (!resizeElement) return;

   let startY: number;
   let startHeight: number;

   const onMouseMove = (e: MouseEvent) => {
     const deltaY = e.clientY - startY;
     setHeight(Math.max(200, startHeight + deltaY));
   };

   const onMouseUp = () => {
     document.removeEventListener('mousemove', onMouseMove);
     document.removeEventListener('mouseup', onMouseUp);
   };

   const onMouseDown = (e: MouseEvent) => {
     startY = e.clientY;
     startHeight = height;
     document.addEventListener('mousemove', onMouseMove);
     document.addEventListener('mouseup', onMouseUp);
   };

   resizeElement.addEventListener('mousedown', onMouseDown);

   return () => {
     resizeElement.removeEventListener('mousedown', onMouseDown);
   };
 }, [height]);

 return (
   <Card className="mt-2 permissions-window relative w-full" ref={permissionsWindowRef}>
     <CardHeader>
       <CardTitle className="text-theme">
         Permissions for {role.name}
       </CardTitle>
     </CardHeader>
     <CardContent>
       <ScrollArea className="pr-4" style={{ height: `${height}px` }}>
         <div className="space-y-2">
           {permissions.map((permission) => (
             <div key={permission.id} className="flex items-center space-x-2">
               <Checkbox 
                 id={permission.id} 
                 checked={permission.granted}
                 onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
               />
               <Label htmlFor={permission.id} className="text-theme">
                 {permission.label}
               </Label>
             </div>
           ))}
         </div>
       </ScrollArea>
     </CardContent>
     <Separator className="my-2" />
     <div
       ref={resizeRef}
       className="absolute bottom-0 left-0 right-0 h-2 bg-gray-300 cursor-ns-resize"
     />
   </Card>
 );
}

