import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ShoppingCart } from "lucide-react"

export default function StoreExample() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-green-500" />
                Store Agent
              </CardTitle>
              <CardDescription>Monitors stock levels in the store and triggers restock requests</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">Stock Monitoring</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Input</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Product:</span> Shampoo (ID: 101)
                  </div>
                  <div>
                    <span className="font-medium">Current Stock:</span> 4 units
                  </div>
                  <div>
                    <span className="font-medium">Stock Threshold:</span> Alert if stock &lt; 10
                  </div>
                  <div>
                    <span className="font-medium">Predicted Demand:</span> 80 units (from Forecast Agent)
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Logic</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Process:</span>
                    <ol className="list-decimal list-inside ml-2 mt-1 space-y-1 text-sm">
                      <li>Compare current stock (4) with threshold (10)</li>
                      <li>Determine stock status (Critical, Low, Normal, Excess)</li>
                      <li>Compare stock with predicted demand (80)</li>
                      <li>Calculate restock amount needed (80 - 4 = 76)</li>
                      <li>Calculate days until stockout (4 ÷ daily demand)</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Output</h3>
                <div className="bg-red-50 border border-red-100 p-4 rounded-md space-y-3">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <div className="text-lg font-bold text-red-800">CRITICAL ALERT: Stock level critically low!</div>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>{" "}
                    <Badge className="bg-red-100 text-red-800">Critical</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Current Stock:</span> 4 units (4% of capacity)
                  </div>
                  <div>
                    <span className="font-medium">Days Until Stockout:</span> ~1 day
                  </div>
                  <div className="mt-2 p-3 bg-white rounded border border-red-200">
                    <div className="font-medium text-red-800">Action Taken:</div>
                    <div className="mt-1">⚠️ Stock low! Requesting 76 more units from Warehouse Agent.</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Visualization</h3>
                <div className="bg-white border p-4 rounded-md h-48">
                  <div className="h-full flex flex-col">
                    <div className="text-sm font-medium mb-2">Stock Level vs. Capacity</div>
                    <div className="flex-grow relative">
                      {/* Stock level visualization */}
                      <div className="absolute inset-0 border border-gray-200 rounded-sm overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gray-100 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-full h-4% bg-red-500"></div>

                        {/* Threshold markers */}
                        <div className="absolute bottom-10% left-0 w-full h-px bg-orange-400 border-dashed"></div>
                        <div className="absolute bottom-20% left-0 w-full h-px bg-yellow-400 border-dashed"></div>

                        {/* Labels */}
                        <div className="absolute bottom-10% right-1 text-xs text-orange-600">Low (10%)</div>
                        <div className="absolute bottom-20% right-1 text-xs text-yellow-600">Reorder (20%)</div>
                        <div className="absolute bottom-4% right-1 text-xs font-bold text-red-600">Current (4%)</div>
                        <div className="absolute bottom-80% right-1 text-xs text-blue-600">Predicted Demand (80%)</div>

                        {/* Predicted demand marker */}
                        <div className="absolute bottom-80% left-0 w-full h-px bg-blue-500 border-dashed"></div>
                        <div className="absolute bottom-80% left-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-6 flex justify-between items-center text-xs text-gray-500 mt-2">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">How It Works</h3>
            <p className="text-gray-700">
              The Store Agent continuously monitors inventory levels for all products in the store. When it detects that
              Shampoo stock has fallen to a critical level (4 units), it compares this with the predicted demand from
              the Forecast Agent (80 units). Recognizing a significant shortfall, it automatically generates a restock
              request for 76 units and sends it to the Warehouse Agent. This proactive approach prevents stockouts and
              ensures products are available when customers need them.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dynamic Stock Monitoring Examples</CardTitle>
          <CardDescription>How the Store Agent handles different inventory scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Critical Stock</h4>
                  <p className="text-sm text-gray-500">Shampoo: 4 units</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Critical</Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: "4%" }}></div>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Action:</span> Urgent restock request sent
                </div>
                <div className="text-sm">
                  <span className="font-medium">Priority:</span> High
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Low Stock</h4>
                  <p className="text-sm text-gray-500">Toothpaste: 15 units</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">Low</Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Action:</span> Standard restock request sent
                </div>
                <div className="text-sm">
                  <span className="font-medium">Priority:</span> Medium
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Excess Stock</h4>
                  <p className="text-sm text-gray-500">T-shirts: 85 units</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Excess</Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Action:</span> Alert sent to Pricing Agent
                </div>
                <div className="text-sm">
                  <span className="font-medium">Recommendation:</span> Consider price reduction
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Real-time Monitoring Benefits</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  <strong>Automated Detection:</strong> No need for manual stock checks, saving time and reducing human
                  error
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  <strong>Proactive Restocking:</strong> Orders placed before items run out completely
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  <strong>Prioritized Alerts:</strong> Critical items get immediate attention
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  <strong>Excess Management:</strong> Identifies overstocked items for potential promotions
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>
                  <strong>Multi-store Coordination:</strong> Balances inventory across multiple locations
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

