import { CalendarIcon, ClockIcon, MessageSquareIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface User {
  id : string;
  username: string;
  email : string;
}

interface Comment {
  id: string
  uid : string
  eid : string
  message: string
  user : User;
}

interface EventCardProps {
  eventName: string
  eventTime: string
  eventDay: string
  comments: Comment[]
}

export default function Event({ eventName, eventTime, eventDay, comments }: EventCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{eventName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <span>{eventDay}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-muted-foreground" />
            <span>{eventTime}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MessageSquareIcon className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Team Comments</span>
            </div>
            <ScrollArea className="h-40 rounded-md border p-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-4 mb-4">
                  <div>
                    <p className="font-semibold">{comment.user.username}</p>
                    <p className="text-sm text-muted-foreground">{comment.message}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}