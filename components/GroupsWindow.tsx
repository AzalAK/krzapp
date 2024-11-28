import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreateGroupModal } from './CreateGroupModal'
import { GroupSideWindow } from './GroupSideWindow'
import { EditServerModal } from './EditServerModal'

interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'audio';
  users: User[];
}

interface Category {
  id: string;
  name: string;
  channels: Channel[];
}

interface Role {
  id: string;
  name: string;
  color: string;
  permissions: { id: string; label: string; granted: boolean }[];
}

interface Group {
  id: string;
  name: string;
  type: 'public' | 'private';
  imageUrl: string;
  categories: Category[];
  members: User[];
  roles: Role[];
}

interface GroupsWindowProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

export function GroupsWindow({ isOpen, onClose, currentUser }: GroupsWindowProps) {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'General',
      type: 'public',
      imageUrl: '/placeholder.svg?height=100&width=100',
      categories: [
        {
          id: 'c1',
          name: 'Text Channels',
          channels: [
            { id: 'tc1', name: 'General Chat', type: 'text', users: [] },
          ],
        },
        {
          id: 'c2',
          name: 'Voice Channels',
          channels: [
            { id: 'vc1', name: 'General Voice', type: 'audio', users: [] },
            { id: 'vc2', name: 'Gaming', type: 'audio', users: [] },
          ],
        },
      ],
      members: [
        { id: '1', username: 'Alice', avatarUrl: '/placeholder.svg?height=32&width=32' },
        { id: '2', username: 'Bob', avatarUrl: '/placeholder.svg?height=32&width=32' },
        { id: '3', username: 'Charlie', avatarUrl: '/placeholder.svg?height=32&width=32' },
      ],
      roles: [
        { id: 'r1', name: 'Admin', color: '#FF0000', permissions: [] },
        { id: 'r2', name: 'Moderator', color: '#00FF00', permissions: [] },
      ],
    },
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isEditServerModalOpen, setIsEditServerModalOpen] = useState(false);

  const handleCreateGroup = (newGroup: Group) => {
    setGroups([...groups, newGroup]);
    setIsCreateModalOpen(false);
  };

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
  };

  const handleJoinChannel = (channelId: string, user: User) => {
    if (!selectedGroup) return;

    const updatedGroups = groups.map(group => {
      if (group.id === selectedGroup.id) {
        const updatedCategories = group.categories.map(category => {
          const updatedChannels = category.channels.map(channel => {
            if (channel.id === channelId) {
              return {
                ...channel,
                users: [...channel.users, user]
              };
            }
            return channel;
          });
          return { ...category, channels: updatedChannels };
        });
        return { ...group, categories: updatedCategories };
      }
      return group;
    });

    setGroups(updatedGroups);
    setSelectedGroup(updatedGroups.find(g => g.id === selectedGroup.id) || null);
  };

  const handleBackToGroupsList = () => {
    setSelectedGroup(null);
  };

  const handleGroupUpdate = (updatedGroup: Group) => {
    const updatedGroups = groups.map(group =>
      group.id === updatedGroup.id ? updatedGroup : group
    );
    setGroups(updatedGroups);
    setSelectedGroup(updatedGroup);
  };

  const handleEditServer = () => {
    setIsEditServerModalOpen(true);
  };

  const handleSaveServerChanges = (data: { name: string; image: string; type: 'public' | 'private'; roles: Role[] }) => {
    if (selectedGroup) {
      const updatedGroup = {
        ...selectedGroup,
        name: data.name,
        imageUrl: data.image,
        type: data.type,
        roles: data.roles,
      };
      handleGroupUpdate(updatedGroup);
    }
    setIsEditServerModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {selectedGroup ? (
        <GroupSideWindow
          serverName={selectedGroup.name}
          categories={selectedGroup.categories}
          members={selectedGroup.members}
          currentUser={currentUser}
          onChannelSelect={(channelId) => console.log(`Channel selected: ${channelId}`)}
          onClose={handleBackToGroupsList}
        />
      ) : (
        <Card className="w-full max-w-2xl h-[80vh] bg-[#36393f] text-white">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Groups</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="flex-grow">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="aspect-square relative cursor-pointer"
                    onClick={() => handleGroupClick(group)}
                  >
                    <img
                      src={group.imageUrl}
                      alt={group.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md">
                      <span className="text-white text-sm font-medium">{group.name}</span>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="aspect-square flex items-center justify-center bg-[#40444b] hover:bg-[#4f545c] border-none text-white"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="h-8 w-8" />
                </Button>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
      {selectedGroup && (
        <EditServerModal
          isOpen={isEditServerModalOpen}
          onClose={() => setIsEditServerModalOpen(false)}
          serverName={selectedGroup.name}
          serverImage={selectedGroup.imageUrl}
          serverType={selectedGroup.type}
          roles={selectedGroup.roles}
          onSave={handleSaveServerChanges}
          onUpdateRoles={(updatedRoles) => {
            if (selectedGroup) {
              handleGroupUpdate({ ...selectedGroup, roles: updatedRoles });
            }
          }}
        />
      )}
    </div>
  );
}

