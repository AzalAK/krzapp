import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Paperclip, Send, X, Gift, Smile, ImageIcon, Sticker, MessageSquare, Plus, Hash, Bell, Pin, Users, Search, HelpCircle, Rocket } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { MembersList } from './MembersList'

interface Message {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: Date;
  attachments?: { type: 'image' | 'video' | 'file'; url: string; name: string }[];
  isDeleted?: boolean;
}

interface TextChannelChatProps {
  channelName: string;
  currentUser: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  onClose: () => void;
  groupId: string;
  channelId: string;
}

export function TextChannelChat({ channelName, currentUser, onClose, groupId, channelId }: TextChannelChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [showGifPanel, setShowGifPanel] = useState(false);
  const [showMembers, setShowMembers] = useState(false)

  // Mock members data - in a real app, this would come from props or an API
  const members = [
    {
      id: '1',
      username: 'ServerOwner',
      avatarUrl: '/placeholder.svg?height=32&width=32',
      isOwner: true,
      status: 'online' as const
    },
    {
      id: '2',
      username: 'AdminUser',
      avatarUrl: '/placeholder.svg?height=32&width=32',
      role: 'admin',
      status: 'idle' as const
    },
    {
      id: '3',
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
      status: 'online' as const
    },
    // Add more members as needed
  ]

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' && attachments.length === 0) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
      content: newMessage,
      timestamp: new Date(),
      attachments: attachments.map(file => ({
        type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file',
        url: URL.createObjectURL(file),
        name: file.name
      }))
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    setAttachments([]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachments([...attachments, ...Array.from(files)]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? {
            ...msg, 
            content: "This message has been deleted by the user.",
            attachments: [],
            isDeleted: true
          }
        : msg
    ));
  };

  return (
    <Card className="fixed inset-y-0 right-0 w-3/4 bg-white dark:bg-gray-800 shadow-lg z-50">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700 bg-gray-900">
          <div className="flex items-center space-x-2">
            <Hash className="h-5 w-5 text-gray-400" />
            <Rocket className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-200">{channelName}</span>
            <Separator orientation="vertical" className="h-5 mx-2 bg-gray-700" />
            <span className="text-sm text-gray-400">Text channel</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <Bell className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <Pin className="h-5 w-5 text-gray-400" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`hover:bg-gray-800 ${showMembers ? 'bg-gray-800' : ''}`}
              onClick={() => setShowMembers(!showMembers)}
            >
              <Users className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <Search className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <HelpCircle className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-800">
              <X className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-grow p-4 pb-20">
              {messages.map((message) => (
                <div key={message.id} className="mb-4 flex items-start">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={message.avatarUrl} alt={message.username} />
                    <AvatarFallback>{message.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold">{message.username}</span>
                      <span className="text-xs text-gray-500">{message.timestamp.toLocaleString()}</span>
                    </div>
                    {message.isDeleted ? (
                      <p className="mt-1 italic text-gray-500">{message.content}</p>
                    ) : (
                      <>
                        <p className="mt-1">{message.content}</p>
                        {message.attachments && message.attachments.map((attachment, index) => (
                          <div key={index} className="mt-2">
                            {attachment.type === 'image' && <img src={attachment.url} alt={attachment.name} className="max-w-xs rounded" />}
                            {attachment.type === 'video' && <video src={attachment.url} controls className="max-w-xs rounded" />}
                            {attachment.type === 'file' && <a href={attachment.url} download={attachment.name} className="text-blue-500 hover:underline">{attachment.name}</a>}
                          </div>
                        ))}
                        {message.userId === currentUser.id && (
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteMessage(message.id)} className="mt-1 text-red-500">
                            Delete
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </ScrollArea>
            <div className="p-4 border-t absolute bottom-0 left-0 right-0 mx-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="flex space-x-2 mb-2">
                {attachments.map((file, index) => (
                  <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 flex items-center">
                    <span className="text-sm truncate max-w-xs">{file.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveAttachment(index)} className="ml-1 text-red-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus className="h-5 w-5" />
                </Button>
                <Input
                  type="text"
                  placeholder={`Message #${channelName}`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  className="hidden"
                />
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-600">
                    <Gift className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-600">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-600">
                        <Smile className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid grid-cols-8 gap-2 p-2">
                        {/* Emoji grid would go here */}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-600">
                    <Sticker className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-600">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {showMembers && <MembersList members={members} />}
        </div>
      </CardContent>
    </Card>
  );
}

