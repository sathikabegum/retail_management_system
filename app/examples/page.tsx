import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Box, DollarSign, ShoppingCart, Truck, TrendingUp, User } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import ForecastExample from "@/components/examples/forecast-example"
import StoreExample from "@/components/examples/store-example"
import SupplierExample from "@/components/examples/supplier-example"
import WarehouseExample from "@/components/examples/warehouse-example"
import CustomerExample from "@/components/examples/customer-example"
import PricingExample from "@/components/examples/pricing-example"
import FeatureExample from "@/components/examples/feature-example"

export default function ExamplesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Agent Examples</h1>
        </div>

        <Tabs defaultValue="forecast" className="mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-4">
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
            <TabsTrigger value="supplier">Supplier</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast">
            <ForecastExample />
          </TabsContent>

          <TabsContent value="store">
            <StoreExample />
          </TabsContent>

          <TabsContent value="warehouse">
            <WarehouseExample />
          </TabsContent>

          <TabsContent value="supplier">
            <SupplierExample />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingExample />
          </TabsContent>

          <TabsContent value="customer">
            <CustomerExample />
          </TabsContent>

          <TabsContent value="features">
            <FeatureExample />
          </TabsContent>
        </Tabs>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Multi-Agent System Overview</CardTitle>
            <CardDescription>How all agents work together to optimize retail operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Agent Interactions</h3>
                <p className="text-gray-600">
                  Our multi-agent system consists of specialized AI agents that communicate and collaborate to optimize
                  inventory management, pricing, and customer experience. Each agent has a specific role but works in
                  coordination with others to achieve system-wide optimization.
                </p>

                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 text-blue-500">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Forecast Agent</p>
                      <p className="text-sm text-gray-600">
                        Predicts future demand using historical sales data and trends
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 text-green-500">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Store Agent</p>
                      <p className="text-sm text-gray-600">
                        Monitors inventory levels and triggers restock requests when needed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 text-amber-500">
                      <Box className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Warehouse Agent</p>
                      <p className="text-sm text-gray-600">Manages central inventory and fulfills store requests</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 text-purple-500">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Supplier Agent</p>
                      <p className="text-sm text-gray-600">
                        Handles ordering from suppliers and manages delivery tracking
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 text-red-500">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Pricing Agent</p>
                      <p className="text-sm text-gray-600">Dynamically adjusts prices based on inventory and demand</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 text-gray-500">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Customer Agent</p>
                      <p className="text-sm text-gray-600">
                        Provides personalized recommendations and tracks customer behavior
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 text-indigo-500">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Coordinator Agent</p>
                      <p className="text-sm text-gray-600">Oversees all agents and ensures system-wide optimization</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Example Workflow</h3>
                <ol className="space-y-3 list-decimal list-inside text-gray-600">
                  <li className="pl-2">
                    <span className="font-medium text-gray-800">Forecast Agent</span> predicts that Shampoo demand will
                    increase to 80 units next week
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-gray-800">Store Agent</span> detects that current stock (4 units)
                    is critically low compared to predicted demand
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-gray-800">Store Agent</span> requests 76 more units from the
                    Warehouse Agent
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-gray-800">Warehouse Agent</span> checks available stock and
                    fulfills the request (partially or completely)
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-gray-800">Warehouse Agent</span> orders more stock from the
                    Supplier Agent if warehouse inventory is low
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-gray-800">Supplier Agent</span> processes the order and confirms
                    delivery timeline
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-gray-800">Pricing Agent</span> may increase the price slightly due
                    to high demand and low stock
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-gray-800">Customer Agent</span> recommends related products to
                    customers who view or purchase Shampoo
                  </li>
                  <li className="pl-2">
                    <span className="font-medium text-gray-800">Coordinator Agent</span> monitors the entire process and
                    optimizes system-wide inventory allocation
                  </li>
                </ol>

                <div className="mt-6">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    View Detailed Simulation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

