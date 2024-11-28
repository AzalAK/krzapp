import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChannel: (channelData: { name: string; type: 'audio' | 'text'; visibility: 'public' | 'private' }) => void;
}

export function CreateChannelModal({
  isOpen,
  onClose,
  onCreateChannel
}: CreateChannelModalProps) {
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState<'audio' | 'text'>('text');
  const [channelVisibility, setChannelVisibility] = useState<'public' | 'private'>('public');
  const [error, setError] = useState<string | null>(null);

  const handleCreateChannel = () => {
    setError(null);
    if (channelName.trim().length < 3) {
      setError("Channel name must be at least 3 characters long.");
      return;
    }
    if (channelName.trim().length > 20) {
      setError("Channel name must not exceed 20 characters.");
      return;
    }
    onCreateChannel({
      name: channelName.trim(),
      type: channelType,
      visibility: channelVisibility
    });
    setChannelName('');
    setChannelType('text');
    setChannelVisibility('public');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-theme">Create New Channel</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="channelName" className="text-right text-theme">
              Name
            </Label>
            <Input
              id="channelName"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-theme">Type</Label>
            <RadioGroup value={channelType} onValueChange={(value: 'audio' | 'text') => setChannelType(value)} className="col-span-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="audio" id="audio" />
                <Label htmlFor="audio" className="text-theme">Audio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text" className="text-theme">Text</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-theme">Visibility</Label>
            <RadioGroup value={channelVisibility} onValueChange={(value: 'public' | 'private') => setChannelVisibility(value)} className="col-span-3">
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
          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-theme">{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleCreateChannel}>Create Channel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

