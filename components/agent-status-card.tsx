import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Brain, MessageSquare, TrendingDown, TrendingUp } from "lucide-react"

interface AgentStatusCardProps {
  title: string
  value: string
  description: string
  trend: "increase" | "decrease" | "stable"
  icon: string
}

export default function AgentStatusCard({ title, value, description, trend, icon }: AgentStatusCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "Activity":
        return <Activity className="h-4 w-4" />
      case "Brain":
        return <Brain className="h-4 w-4" />
      case "MessageSquare":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getTrendIcon = () => {
    if (trend === "increase") {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (trend === "decrease") {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{getIcon()}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {description}
          {getTrendIcon() && <span className="ml-1">{getTrendIcon()}</span>}
        </div>
      </CardContent>
    </Card>
  )
}

