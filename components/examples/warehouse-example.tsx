import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Box, Check, Truck } from "lucide-react"

export default function WarehouseExample() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Box className="mr-2 h-5 w-5 text-amber-500" />
                Warehouse Agent
              </CardTitle>
              <CardDescription>Tracks central inventory and fulfills store requests</CardDescription>
            </div>
            <Badge className="bg-amber-100 text-amber-800">Inventory Management</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Input</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Request from Store Agent:</span>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                    <div className="text-sm">
                      <strong>Request:</strong> Need 76 units of Shampoo (ID: 101)
                    </div>
                    <div className="text-sm">
                      <strong>Store:</strong> Store-001
                    </div>
                    <div className="text-sm">
                      <strong>Priority:</strong> High
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Logic</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Process:</span>
                    <ol className="list-decimal list-inside ml-2 mt-1 space-y-1 text-sm">
                      <li>Check available stock in warehouse</li>
                      <li>Determine if request can be fulfilled completely</li>
                      <li>If partial fulfillment, determine amount to send</li>
                      <li>Update warehouse inventory</li>
                      <li>Check if warehouse stock is below threshold</li>
                      <li>If needed, create order for supplier</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Warehouse Check</h3>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-md space-y-3">
                  <div className="flex items-center">
                    <Box className="h-5 w-5 text-amber-500 mr-2" />
                    <div className="text-lg font-medium">Warehouse Inventory Check</div>
                  </div>
                  <div>
                    <span className="font-medium">Product:</span> Shampoo (ID: 101)
                  </div>
                  <div>
                    <span className="font-medium">Available in Warehouse:</span> 200 units
                  </div>
                  <div>
                    <span className="font-medium">Can fulfill request?</span>{" "}
                    <Badge className="bg-green-100 text-green-800">Yes - Complete</Badge>
                  </div>
                  <div className="mt-2 p-3 bg-white rounded border border-amber-200">
                    <div className="font-medium">Response to Store:</div>
                    <div className="mt-1 flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                      <span>Warehouse has 200 units in stock. Can dispatch 76 units.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Action Taken</h3>
                <div className="bg-white border p-4 rounded-md space-y-3">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-green-500 mr-2" />
                    <div className="text-lg font-medium">Fulfillment Process</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium mr-2">
                        1
                      </div>
                      <div>Allocated 76 units for Store-001</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium mr-2">
                        2
                      </div>
                      <div>Updated warehouse inventory (200 → 124 units)</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium mr-2">
                        3
                      </div>
                      <div>Prepared shipment for delivery</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium mr-2">
                        4
                      </div>
                      <div>Notified Store Agent of fulfillment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">How It Works</h3>
            <p className="text-gray-700">
              The Warehouse Agent acts as the central inventory hub, receiving requests from Store Agents and
              coordinating with Supplier Agents. When it receives a request for 76 units of Shampoo, it first checks the
              warehouse inventory. With 200 units available, it can fully fulfill the request. The agent then updates
              the inventory records, prepares the shipment, and notifies the Store Agent that the requested items are on
              their way. If the warehouse stock had been insufficient, it would have initiated an order with the
              Supplier Agent to replenish inventory.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Warehouse Management Scenarios</CardTitle>
          <CardDescription>How the Warehouse Agent handles different fulfillment scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Complete Fulfillment</h4>
                  <p className="text-sm text-gray-500">Shampoo Request: 76 units</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Complete</Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Warehouse Stock:</span> 200 units
                </div>
                <div className="text-sm">
                  <span className="font-medium">Fulfilled:</span> 76 units (100%)
                </div>
                <div className="text-sm">
                  <span className="font-medium">Remaining Stock:</span> 124 units
                </div>
                <div className="text-sm">
                  <span className="font-medium">Supplier Order:</span> Not needed
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Partial Fulfillment</h4>
                  <p className="text-sm text-gray-500">T-shirt Request: 50 units</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800">Partial</Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Warehouse Stock:</span> 30 units
                </div>
                <div className="text-sm">
                  <span className="font-medium">Fulfilled:</span> 30 units (60%)
                </div>
                <div className="text-sm">
                  <span className="font-medium">Remaining Stock:</span> 0 units
                </div>
                <div className="text-sm">
                  <span className="font-medium">Supplier Order:</span> 100 units ordered
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">No Stock Available</h4>
                  <p className="text-sm text-gray-500">New Product Request: 25 units</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Unfulfilled</Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Warehouse Stock:</span> 0 units
                </div>
                <div className="text-sm">
                  <span className="font-medium">Fulfilled:</span> 0 units (0%)
                </div>
                <div className="text-sm">
                  <span className="font-medium">Remaining Stock:</span> 0 units
                </div>
                <div className="text-sm">
                  <span className="font-medium">Supplier Order:</span> 50 units ordered (expedited)
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Warehouse Optimization Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Inventory Distribution</h4>
                <p className="text-sm text-gray-700">
                  The Warehouse Agent optimizes inventory distribution across multiple stores based on predicted demand,
                  ensuring that each store has the right amount of stock without excess inventory.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Reorder Point Calculation</h4>
                <p className="text-sm text-gray-700">
                  Automatically calculates optimal reorder points for each product based on lead time, demand
                  variability, and service level requirements.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Cross-Docking</h4>
                <p className="text-sm text-gray-700">
                  For high-demand items, the agent can arrange for products to be cross-docked (transferred directly
                  from incoming shipments to outgoing store deliveries without warehouse storage).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Batch Optimization</h4>
                <p className="text-sm text-gray-700">
                  Combines multiple store requests into optimized batches to reduce shipping costs and improve logistics
                  efficiency.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

