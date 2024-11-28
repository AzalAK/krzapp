import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface EditBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBannerUrl: string | undefined;
  onSave: (newBannerUrl: string) => void;
}

export function EditBannerModal({ 
  isOpen, 
  onClose, 
  currentBannerUrl, 
  onSave 
}: EditBannerModalProps) {
  const [bannerUrl, setBannerUrl] = useState(currentBannerUrl || '');

  const handleSave = () => {
    onSave(bannerUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#2f3136] text-gray-200">
        <DialogHeader>
          <DialogTitle>Edit Banner Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full h-32 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${bannerUrl || '/placeholder.svg?height=128&width=512'})` }}></div>
            <Input
              id="banner"
              type="text"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="w-full"
              placeholder="Enter banner image URL"
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

