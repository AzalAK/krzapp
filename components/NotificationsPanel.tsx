import { Bell, UserPlus, Heart } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

interface Notification {
  id: string;
  type: 'follow' | 'friendRequest' | 'like';
  message: string;
  time: string;
}

interface NotificationsPanelProps {
  notifications: Notification[];
}

export function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'follow':
        return <Bell className="h-4 w-4 text-blue-500" />;
      case 'friendRequest':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] p-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-4 mb-4">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

