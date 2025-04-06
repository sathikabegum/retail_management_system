import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAgents } from "@/lib/data"
import AgentCard from "@/components/agent-card"
import AgentNetworkVisualization from "@/components/agent-network-visualization"
import DashboardHeader from "@/components/dashboard-header"

export default function AgentsPage() {
  const agents = getAgents()

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">AI Agents</h1>
        </div>

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="network">
            <Card>
              <CardHeader>
                <CardTitle>Agent Communication Network</CardTitle>
                <CardDescription>Visualization of how agents communicate and share information</CardDescription>
              </CardHeader>
              <CardContent>
                <AgentNetworkVisualization />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Agent Activity Logs</CardTitle>
                <CardDescription>Detailed logs of all agent activities and decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Placeholder for agent logs */}
                  <p className="text-muted-foreground">
                    Agent activity logs will be displayed here. This feature is coming soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

