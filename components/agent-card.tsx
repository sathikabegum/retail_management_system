import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, ShoppingCart, Warehouse, Truck, PieChart, Network } from "lucide-react"

interface AgentCardProps {
  agent: {
    id: string
    name: string
    description: string
    status: string
    type: string
    lastAction: string
    lastActionTime: string
    metrics: {
      responseTime: string
      accuracy: string
      decisions: number
    }
  }
}

export default function AgentCard({ agent }: AgentCardProps) {
  // Determine which icon to use based on agent type
  const getAgentIcon = (type: string) => {
    switch (type) {
      case "forecast":
        return <Brain className="h-5 w-5" />
      case "store":
        return <ShoppingCart className="h-5 w-5" />
      case "warehouse":
        return <Warehouse className="h-5 w-5" />
      case "supplier":
        return <Truck className="h-5 w-5" />
      case "pricing":
        return <PieChart className="h-5 w-5" />
      case "coordinator":
        return <Network className="h-5 w-5" />
      default:
        return <Brain className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary">{getAgentIcon(agent.type)}</div>
            <div>
              <CardTitle>{agent.name}</CardTitle>
              <CardDescription className="mt-1">{agent.description}</CardDescription>
            </div>
          </div>
          <Badge variant={agent.status === "active" ? "default" : "outline"}>
            {agent.status === "active" ? "Active" : agent.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Last Action</h4>
            <p className="text-sm text-muted-foreground">{agent.lastAction}</p>
            <p className="text-xs text-muted-foreground mt-1">{agent.lastActionTime}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-muted p-2 rounded">
              <p className="text-xs font-medium">Response Time</p>
              <p className="text-sm">{agent.metrics.responseTime}</p>
            </div>
            <div className="bg-muted p-2 rounded">
              <p className="text-xs font-medium">Accuracy</p>
              <div className="flex items-center">
                <p className="text-sm">{agent.metrics.accuracy}</p>
                <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
              </div>
            </div>
            <div className="bg-muted p-2 rounded">
              <p className="text-xs font-medium">Decisions</p>
              <p className="text-sm">{agent.metrics.decisions}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

