import React from 'react'
import { Button } from "@/components/ui/button"

interface ProfilePictureChangeWindowProps {
  onSave: () => void
  onReset: () => void
}

export function ProfilePictureChangeWindow({ onSave, onReset }: ProfilePictureChangeWindowProps) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1e1f22] p-4 rounded-lg shadow-lg z-50">
      <div className="flex space-x-4">
        <Button onClick={onReset} variant="secondary">
          Reset
        </Button>
        <Button onClick={onSave} className="bg-[#5865f2] text-white hover:bg-[#4752c4]">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

