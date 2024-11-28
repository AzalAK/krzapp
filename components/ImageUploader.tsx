import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onUpload: (imageUrl: string) => void
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if (previewUrl) {
      onUpload(previewUrl)
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <Button onClick={() => fileInputRef.current?.click()} className="w-full">
        Choose Image
      </Button>
      {previewUrl && (
        <div className="mt-2">
          <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg" />
          <Button onClick={handleUpload} className="mt-2 w-full">
            Upload Image
          </Button>
        </div>
      )}
    </div>
  )
}

