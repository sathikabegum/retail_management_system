import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowUpRight, CheckCircle2, Clock, RefreshCcw, Truck } from "lucide-react"
import {
  getInventoryStatus,
  getRecentAgentActivities,
  getProductPerformance,
  getSalesData,
  getInventoryData,
} from "@/lib/data"
import DashboardHeader from "@/components/dashboard-header"
import AgentStatusCard from "@/components/agent-status-card"

export default function DashboardPage() {
  const inventoryStatus = getInventoryStatus()
  const recentActivities = getRecentAgentActivities()
  const productPerformance = getProductPerformance()
  const salesData = getSalesData()
  const inventoryData = getInventoryData()

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">-5% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+3 new today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Price Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Daily sales for the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="predicted" stroke="#82ca9d" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Inventory Levels</CardTitle>
              <CardDescription>Current stock by category</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#8884d8" />
                  <Bar dataKey="optimal" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Sales distribution by product category</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productPerformance}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {productPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Current stock level alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryStatus.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.product}</p>
                      <p className="text-sm text-gray-500">{item.sku}</p>
                    </div>
                    <Badge
                      className={
                        item.status === "Low"
                          ? "bg-orange-100 text-orange-800"
                          : item.status === "Critical"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Agent Activities</CardTitle>
              <CardDescription>Latest actions taken by AI agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div
                      className={`mt-0.5 ${
                        activity.type === "order"
                          ? "text-blue-500"
                          : activity.type === "price"
                            ? "text-purple-500"
                            : activity.type === "alert"
                              ? "text-red-500"
                              : "text-green-500"
                      }`}
                    >
                      {activity.type === "order" && <Truck className="h-4 w-4" />}
                      {activity.type === "price" && <ArrowUpRight className="h-4 w-4" />}
                      {activity.type === "alert" && <AlertCircle className="h-4 w-4" />}
                      {activity.type === "restock" && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.message}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Agent Status</CardTitle>
              <CardDescription>Current status of all AI agents in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AgentStatusCard
                  name="Forecast Agent"
                  status="active"
                  lastAction="Updated demand predictions for next week"
                  lastActionTime="5 minutes ago"
                />
                <AgentStatusCard
                  name="Store Agent"
                  status="active"
                  lastAction="Reported low stock for dairy products"
                  lastActionTime="12 minutes ago"
                />
                <AgentStatusCard
                  name="Warehouse Agent"
                  status="active"
                  lastAction="Processed transfer of goods to Store #12"
                  lastActionTime="28 minutes ago"
                />
                <AgentStatusCard
                  name="Supplier Agent"
                  status="active"
                  lastAction="Placed order with Supplier XYZ"
                  lastActionTime="1 hour ago"
                />
                <AgentStatusCard
                  name="Pricing Agent"
                  status="active"
                  lastAction="Adjusted prices for 15 slow-moving items"
                  lastActionTime="45 minutes ago"
                />
                <AgentStatusCard
                  name="Coordinator Agent"
                  status="active"
                  lastAction="Optimized system-wide inventory allocation"
                  lastActionTime="17 minutes ago"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

