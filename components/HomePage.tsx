'use client'

import { useState, useRef } from 'react'
import { Search, Users, User, Heart, Sun, Moon, Plus, ChevronDown, ChevronRight, ChevronLeft, X, HomeIcon, Settings, History, Bell, Cherry } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'
import { SettingsWindow } from '@/components/SettingsWindow'
import { ProfilePage } from '@/components/ProfilePage'
import { NotificationsPanel } from '@/components/NotificationsPanel'
import { SearchWindow } from '@/components/SearchWindow'
import { GroupsWindow } from '@/components/GroupsWindow'
import { GroupSideWindow } from '@/components/GroupSideWindow'; // Import the new component

interface User {
  id: string;
  email: string
  username: string
  accountName: string
  followers: number
  following: number
  avatarUrl: string
}

interface HomePageProps {
  user: User
}

export default function HomePage({ user: initialUser }: HomePageProps) {
  const [user, setUser] = useState(initialUser)
  const { theme, setTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isStoriesExpanded, setIsStoriesExpanded] = useState(false)
  const [selectedStory, setSelectedStory] = useState<number | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showGroups, setShowGroups] = useState(false)
  const [isGroupWindowOpen, setIsGroupWindowOpen] = useState(false) // Added state for GroupSideWindow
  const [showMainContent, setShowMainContent] = useState(true) // Added state for main content visibility
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleStories = () => {
    setIsStoriesExpanded(!isStoriesExpanded)
  }

  const handleAddStory = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name)
      setIsStoriesExpanded(false)
    }
  }

  const handleStoryClick = (index: number) => {
    setSelectedStory(index)
  }

  const closeStory = () => {
    setSelectedStory(null)
  }

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const toggleProfile = () => {
    setShowProfile(!showProfile)
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  const toggleGroups = () => {
    setIsGroupWindowOpen(!isGroupWindowOpen)
    setShowMainContent(isGroupWindowOpen) // Updated toggleGroups function
  }

  const handleSelectUser = (selectedUser: User) => {
    setSelectedUser(selectedUser)
    setShowSearch(false)
    setShowProfile(true)
  }

  const handleUpdateAvatar = (newAvatarUrl: string) => {
    setUser(prevUser => ({ ...prevUser, avatarUrl: newAvatarUrl }))
  }

  const closeAllWindows = () => {
    setShowGroups(false);
    setShowSearch(false);
    setShowNotifications(false);
    setShowProfile(false);
    setIsSettingsOpen(false);
    setIsSidebarOpen(false);
    setIsGroupWindowOpen(false); // Close GroupSideWindow
    setShowMainContent(true); // Added to close main content
  };

  const stories = [
    { id: 1, username: 'user1', imageUrl: '/placeholder.svg?height=50&width=50' },
    { id: 2, username: 'user2', imageUrl: '/placeholder.svg?height=50&width=50' },
    { id: 3, username: 'user3', imageUrl: '/placeholder.svg?height=50&width=50' },
    { id: 4, username: 'user4', imageUrl: '/placeholder.svg?height=50&width=50' },
    { id: 5, username: 'user5', imageUrl: '/placeholder.svg?height=50&width=50' },
  ]

  const notifications = [
    { id: '1', type: 'follow', message: 'John Doe started following you', time: '2 minutes ago' },
    { id: '2', type: 'friendRequest', message: 'Jane Smith sent you a friend request', time: '1 hour ago' },
    { id: '3', type: 'like', message: 'Alex Johnson liked your post', time: '3 hours ago' },
    { id: '4', type: 'follow', message: 'Sarah Williams started following you', time: '1 day ago' },
    { id: '5', type: 'like', message: 'Mike Brown liked your comment', time: '2 days ago' },
  ]

  if (showProfile) {
    return (
      <ProfilePage
        user={selectedUser || user}
        onBack={() => {
          setShowProfile(false)
          setSelectedUser(null)
        }}
        onUpdateAvatar={handleUpdateAvatar}
      />
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden pb-16">
      {/* Collapsible sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Menu</h2>
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <Button variant="ghost" size="sm" className="justify-start w-full" onClick={toggleSettings}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <SettingsWindow isOpen={isSettingsOpen} toggleProfile={toggleProfile} />
            </div>
            <Button variant="ghost" size="sm" className="justify-start" onClick={toggleProfile}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button variant="ghost" size="sm" className="justify-start" onClick={toggleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="ghost" size="sm" className="justify-start" onClick={toggleNotifications}>
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="ghost" size="sm" className="justify-start" onClick={toggleGroups}>
              <Users className="h-4 w-4 mr-2" />
              Groups
            </Button>
          </div>
        </div>
      </div>

      {/* Arrow to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 left-0 z-40 bg-primary text-primary-foreground p-2 rounded-r-md transform -translate-y-1/2 focus:outline-none"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
      </button>

      <div className="flex flex-col flex-1 relative">
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 relative">
          {showMainContent ? (
            <>
              {/* Existing main content */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
                <p className="text-2xl font-bold text-theme opacity-70 flex items-center">
                  Welcome, {user.username} <Heart className="ml-2 h-5 w-5 text-red-500" />
                </p>
              </div>
              {/* Theme toggle and cherry icon buttons */}
              <div className="absolute top-4 left-4 z-10 flex flex-col items-center space-y-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                  ) : (
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleGroups}
                  className="rounded-full p-2 bg-white dark:bg-gray-800"
                  aria-label={isGroupWindowOpen ? "Close group window" : "Open group window"} // Updated aria-label
                >
                  <Cherry className="h-8 w-8 text-red-500" />
                </Button>
              </div>

              {/* Add story button and stories toggle on the right */}
              <div className="absolute top-4 right-4 z-10 flex flex-col items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleAddStory}
                  aria-label="Add your story"
                >
                  <Plus className="h-6 w-6" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleStories}
                  className="mt-2"
                  aria-label={isStoriesExpanded ? "Hide stories" : "Show stories"}
                >
                  <ChevronDown className={`h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${isStoriesExpanded ? 'rotate-180' : ''}`} />
                </Button>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1">
                  Stories
                </span>
              </div>

              {/* Large application icon with heart */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <div className={`text-9xl font-bold opacity-20 transform rotate-12 transition-all duration-300 hover:rotate-0 hover:scale-110 hover:opacity-30 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                    KRZ
                  </div>
                  <div className="absolute -top-12 left-0 text-6xl text-red-400 dark:text-red-600 opacity-30 transform -rotate-12 transition-all duration-300 hover:rotate-0 hover:scale-110 hover:opacity-50">
                    ♥
                  </div>
                </div>
              </div>

              {/* Stories section */}
              {isStoriesExpanded && (
                <div className="absolute top-32 right-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20 max-h-[calc(100vh-180px)] overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {stories.map((story, index) => (
                      <button
                        key={story.id}
                        className="flex items-center w-full focus:outline-none group"
                        onClick={() => handleStoryClick(index)}
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-0.5 transform rotate-45 overflow-hidden flex-shrink-0">
                          <img
                            src={story.imageUrl}
                            alt={`${story.username}'s story`}
                            className="w-full h-full object-cover rounded-full transform -rotate-45"
                          />
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">{story.username}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Story viewer */}
              {selectedStory !== null && (
                <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                  <img
                    src={stories[selectedStory].imageUrl}
                    alt={`${stories[selectedStory].username}'s story`}
                    className="max-w-full max-h-full object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeStory}
                    className="absolute top-4 right-4 text-white"
                    aria-label="Close story"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              )}

              {/* Notifications Panel */}
              {showNotifications && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Notifications</h2>
                      <Button variant="ghost" size="sm" onClick={toggleNotifications}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <NotificationsPanel notifications={notifications} />
                  </div>
                </div>
              )}

              {/* Search Window */}
              <SearchWindow
                isOpen={showSearch}
                onClose={() => setShowSearch(false)}
                onSelectUser={handleSelectUser}
              />


              {/* Remaining content area */}
              <div className="mt-20 relative z-10">
                <h1 className="text-2xl font-bold mb-4 text-theme">Main Content</h1>
                <p className="text-theme">Your main content goes here.</p>
              </div>
            </>
          ) : null}

          {isGroupWindowOpen && (
            <GroupSideWindow
              serverName="Valentine's server"
              onClose={() => setIsGroupWindowOpen(false)}
              onToggle={toggleGroups}
            />
          )}
        </main>

        {/* Bottom navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
          <div className="flex justify-around">
            <Button variant="ghost" className="flex-1 py-4 group" onClick={closeAllWindows}>
              <HomeIcon className="h-6 w-6 group-hover:animate-vibrate" />
              <span className="sr-only">Home</span>
            </Button>
            <Button variant="ghost" className="flex-1 py-4 group" onClick={toggleGroups}>
              <Users className="h-6 w-6 group-hover:animate-vibrate" />
              <span className="sr-only">Groups</span>
            </Button>
            <Button variant="ghost" className="flex-1 py-4 group" onClick={toggleSearch}>
              <Search className="h-6 w-6 group-hover:animate-vibrate" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" className="flex-1 py-4 group" onClick={toggleNotifications}>
              <Heart className="h-6 w-6 group-hover:animate-vibrate" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" className="flex-1 py-4 group" onClick={toggleProfile}>
              <User className="h-6 w-6 group-hover:animate-vibrate" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}

