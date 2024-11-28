import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'audio';
  users: [];
}

interface Group {
  id: string;
  name: string;
  type: 'public' | 'private';
  imageUrl: string;
  channels: Channel[];
  members: [];
}

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (group: Group) => void;
}

export function CreateGroupModal({ isOpen, onClose, onCreateGroup }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('')
  const [groupType, setGroupType] = useState<'public' | 'private'>('public')
  const [channels, setChannels] = useState<Channel[]>([
    { id: '1', name: 'General', type: 'text', users: [] },
    { id: '2', name: 'Voice Chat', type: 'audio', users: [] }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newGroup: Group = {
      id: Date.now().toString(),
      name: groupName,
      type: groupType,
      imageUrl: '/placeholder.svg?height=100&width=100',
      channels: channels,
      members: [],
    }
    onCreateGroup(newGroup)
    setGroupName('')
    setGroupType('public')
    setChannels([
      { id: '1', name: 'General', type: 'text', users: [] },
      { id: '2', name: 'Voice Chat', type: 'audio', users: [] }
    ])
  }

  const addChannel = () => {
    setChannels([...channels, { id: Date.now().toString(), name: `New Channel ${channels.length + 1}`, type: 'text', users: [] }])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Create New Group</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Group Type</Label>
                <RadioGroup value={groupType} onValueChange={(value: 'public' | 'private') => setGroupType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Channels</Label>
                {channels.map((channel, index) => (
                  <div key={channel.id} className="flex items-center space-x-2 mt-2">
                    <Input
                      value={channel.name}
                      onChange={(e) => {
                        const newChannels = [...channels]
                        newChannels[index].name = e.target.value
                        setChannels(newChannels)
                      }}
                    />
                    <RadioGroup
                      value={channel.type}
                      onValueChange={(value: 'text' | 'audio') => {
                        const newChannels = [...channels]
                        newChannels[index].type = value
                        setChannels(newChannels)
                      }}
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="text" id={`text-${channel.id}`} />
                        <Label htmlFor={`text-${channel.id}`}>Text</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="audio" id={`audio-${channel.id}`} />
                        <Label htmlFor={`audio-${channel.id}`}>Audio</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addChannel} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Channel
                </Button>
              </div>
              <Button type="submit" className="w-full">Create Group</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

