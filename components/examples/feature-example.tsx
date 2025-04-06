import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowDown, Calendar, Check, DollarSign, LineChart, ShoppingCart, Truck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface AgentExampleCardProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  badgeText: string
  badgeColor: string
  children: React.ReactNode
}

export default function FeatureExample() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Key System Features</CardTitle>
          <CardDescription>Advanced capabilities of the multi-agent retail management system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium flex items-center mb-2">
                  <ShoppingCart className="mr-2 h-5 w-5 text-green-500" />
                  Dynamic Stock Monitoring
                </h3>
                <div className="bg-green-50 border border-green-100 p-4 rounded-md space-y-3">
                  <p className="text-gray-700">
                    AI continuously monitors inventory levels across all stores and warehouses in real-time,
                    automatically detecting low stock or overstock situations without human intervention.
                  </p>

                  <div className="p-3 bg-white rounded-md border border-green-200">
                    <div className="font-medium mb-1">Example Scenario:</div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                      <div className="text-sm">
                        <strong>Only 4 shampoos left</strong>, predicted demand is 80 units →{" "}
                        <span className="text-green-600 font-medium">automatic restock request triggered</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="p-2 bg-white rounded-md border border-green-200">
                      <div className="text-sm font-medium">Benefits:</div>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                        <li>Eliminates manual stock checks</li>
                        <li>Prevents stockouts</li>
                        <li>Reduces excess inventory</li>
                      </ul>
                    </div>

                    <div className="p-2 bg-white rounded-md border border-green-200">
                      <div className="text-sm font-medium">Agents Involved:</div>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                        <li>Store Agent</li>
                        <li>Warehouse Agent</li>
                        <li>Forecast Agent</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium flex items-center mb-2">
                  <DollarSign className="mr-2 h-5 w-5 text-red-500" />
                  Smart Pricing Optimization
                </h3>
                <div className="bg-red-50 border border-red-100 p-4 rounded-md space-y-3">
                  <p className="text-gray-700">
                    AI dynamically adjusts product prices based on inventory levels, sales velocity, competitor pricing,
                    and demand patterns to maximize revenue and reduce excess inventory.
                  </p>

                  <div className="p-3 bg-white rounded-md border border-red-200">
                    <div className="font-medium mb-1">Example Scenario:</div>
                    <div className="flex items-start">
                      <ArrowDown className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <div className="text-sm">
                        <strong>Only 10 T-shirts sold in 2 weeks</strong> with 85 units in stock →{" "}
                        <span className="text-green-600 font-medium">price automatically reduced by 15%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="p-2 bg-white rounded-md border border-red-200">
                      <div className="text-sm font-medium">Benefits:</div>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                        <li>Increases sales for slow-moving items</li>
                        <li>Maximizes profit on high-demand items</li>
                        <li>Reduces markdown losses</li>
                      </ul>
                    </div>

                    <div className="p-2 bg-white rounded-md border border-red-200">
                      <div className="text-sm font-medium">Agents Involved:</div>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                        <li>Pricing Agent</li>
                        <li>Store Agent</li>
                        <li>Forecast Agent</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium flex items-center mb-2">
                  <Truck className="mr-2 h-5 w-5 text-purple-500" />
                  Supplier Recommendation
                </h3>
                <div className="bg-purple-50 border border-purple-100 p-4 rounded-md space-y-3">
                  <p className="text-gray-700">
                    AI evaluates and selects the optimal supplier for each order based on price, delivery speed,
                    reliability, and other factors to ensure the best overall value.
                  </p>

                  <div className="p-3 bg-white rounded-md border border-purple-200">
                    <div className="font-medium mb-1">Example Scenario:</div>
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <div className="text-sm">
                        <strong>Supplier B delivers 10% cheaper in 1 day</strong> compared to other options →{" "}
                        <span className="text-green-600 font-medium">automatically selected for urgent order</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="p-2 bg-white rounded-md border border-purple-200">
                      <div className="text-sm font-medium">Benefits:</div>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                        <li>Reduces procurement costs</li>
                        <li>Minimizes delivery times</li>
                        <li>Improves supplier reliability</li>
                      </ul>
                    </div>

                    <div className="p-2 bg-white rounded-md border border-purple-200">
                      <div className="text-sm font-medium">Agents Involved:</div>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                        <li>Supplier Agent</li>
                        <li>Warehouse Agent</li>
                        <li>Coordinator Agent</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium flex items-center mb-2">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Predictive Reordering
                </h3>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-md space-y-3">
                  <p className="text-gray-700">
                    AI predicts future demand and proactively places orders in advance, accounting for lead times,
                    seasonal trends, and supplier constraints to prevent stockouts.
                  </p>

                  <div className="p-3 bg-white rounded-md border border-blue-200">
                    <div className="font-medium mb-1">Example Scenario:</div>
                    <div className="flex items-start">
                      <LineChart className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                      <div className="text-sm">
                        <strong>Demand for cold drinks rising as summer approaches</strong> →{" "}
                        <span className="text-green-600 font-medium">inventory ordered 3 weeks in advance</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="p-2 bg-white rounded-md border border-blue-200">
                      <div className="text-sm font-medium">Benefits:</div>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                        <li>Prevents stockouts during peak demand</li>
                        <li>Optimizes order quantities</li>
                        <li>Reduces emergency shipping costs</li>
                      </ul>
                    </div>

                    <div className="p-2 bg-white rounded-md border border-blue-200">
                      <div className="text-sm font-medium">Agents Involved:</div>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                        <li>Forecast Agent</li>
                        <li>Supplier Agent</li>
                        <li>Warehouse Agent</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Performance Metrics</CardTitle>
          <CardDescription>Measurable improvements achieved by the multi-agent system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Stockout Reduction</h4>
                <Badge className="bg-green-100 text-green-800">-82%</Badge>
              </div>
              <div className="text-3xl font-bold text-green-600">82%</div>
              <div className="text-sm text-gray-500 mt-1">Fewer stockout events</div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Inventory Reduction</h4>
                <Badge className="bg-green-100 text-green-800">-24%</Badge>
              </div>
              <div className="text-3xl font-bold text-green-600">24%</div>
              <div className="text-sm text-gray-500 mt-1">Lower average inventory</div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "24%" }}></div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Revenue Increase</h4>
                <Badge className="bg-green-100 text-green-800">+18%</Badge>
              </div>
              <div className="text-3xl font-bold text-green-600">18%</div>
              <div className="text-sm text-gray-500 mt-1">Higher sales revenue</div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "18%" }}></div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Labor Efficiency</h4>
                <Badge className="bg-green-100 text-green-800">+35%</Badge>
              </div>
              <div className="text-3xl font-bold text-green-600">35%</div>
              <div className="text-sm text-gray-500 mt-1">Increased output per employee</div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AgentExampleCard({
  title,
  description,
  icon: Icon,
  iconColor,
  badgeText,
  badgeColor,
  children,
}: AgentExampleCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Icon className={`mr-2 h-5 w-5 text-${iconColor}-500`} />
              {title}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <Badge className={`bg-${badgeColor}-100 text-${badgeColor}-800`}>{badgeText}</Badge>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

