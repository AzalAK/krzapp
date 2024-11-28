import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface EditPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhoneNumber?: string;
  onSave: (newPhoneNumber: string) => void;
}

export function EditPhoneModal({ isOpen, onClose, currentPhoneNumber, onSave }: EditPhoneModalProps) {
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber || '');

  const handleSave = () => {
    onSave(phoneNumber);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#2f3136] text-gray-200">
        <DialogHeader>
          <DialogTitle>{currentPhoneNumber ? 'Edit' : 'Add'} Phone Number</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="col-span-3"
            placeholder="Enter phone number"
          />
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

