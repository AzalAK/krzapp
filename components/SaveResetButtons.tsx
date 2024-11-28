import React from 'react'
import { Button } from "@/components/ui/button"

interface SaveResetButtonsProps {
  onSave: () => void;
  onReset: () => void;
}

export function SaveResetButtons({ onSave, onReset }: SaveResetButtonsProps) {
  return (
    <div className="flex justify-end space-x-2 mt-4 bg-background p-2 rounded-md shadow-md">
      <Button variant="destructive" onClick={onReset}>Reset</Button>
      <Button variant="default" onClick={onSave}>Save Changes</Button>
    </div>
  );
}

