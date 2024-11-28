import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface EditDisplayNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDisplayName: string | undefined;
  onSave: (newDisplayName: string) => void;
}

export function EditDisplayNameModal({ 
  isOpen, 
  onClose, 
  currentDisplayName, 
  onSave 
}: EditDisplayNameModalProps) {
  const [displayName, setDisplayName] = useState(currentDisplayName || '');

  const handleSave = () => {
    onSave(displayName);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#2f3136] text-black dark:text-gray-200">
        <DialogHeader>
          <DialogTitle>Edit Display Name</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="col-span-3 text-black dark:text-white bg-white dark:bg-gray-700"
            placeholder="Enter new display name"
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose} className="bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

