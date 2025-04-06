import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Check, Clock, Truck } from "lucide-react"

export default function SupplierExample() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5 text-purple-500" />
                Supplier Agent
              </CardTitle>
              <CardDescription>Handles ordering from suppliers and manages delivery tracking</CardDescription>
            </div>
            <Badge className="bg-purple-100 text-purple-800">Supply Chain</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Input</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Request from Warehouse Agent:</span>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-100 rounded-md">
                    <div className="text-sm">
                      <strong>Order Request:</strong> Need 76 units of Shampoo (ID: 101)
                    </div>
                    <div className="text-sm">
                      <strong>Warehouse:</strong> Warehouse-Main
                    </div>
                    <div className="text-sm">
                      <strong>Priority:</strong> Standard
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
                      <li>Check supplier availability and terms</li>
                      <li>Select optimal supplier based on price, lead time, and reliability</li>
                      <li>Generate purchase order</li>
                      <li>Calculate estimated delivery date</li>
                      <li>Track order status</li>
                      <li>Notify Warehouse Agent of confirmation and delivery timeline</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Output</h3>
                <div className="bg-purple-50 border border-purple-100 p-4 rounded-md space-y-3">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <div className="text-lg font-medium text-purple-800">Order Confirmation</div>
                  </div>
                  <div>
                    <span className="font-medium">Order Number:</span> PO-28754
                  </div>
                  <div>
                    <span className="font-medium">Supplier:</span> Supplier-XYZ
                  </div>
                  <div>
                    <span className="font-medium">Quantity:</span> 76 units of Shampoo
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Estimated Delivery:</span>
                    <Badge className="bg-green-100 text-green-800 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />2 days
                    </Badge>
                  </div>
                  <div className="mt-2 p-3 bg-white rounded border border-purple-200">
                    <div className="font-medium">Response to Warehouse:</div>
                    <div className="mt-1">✅ Restock confirmed: 76 units arriving in 2 days.</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Order Tracking</h3>
                <div className="bg-white border p-4 rounded-md">
                  <div className="text-sm font-medium mb-3">Order Status Timeline</div>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-3">
                        <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="h-full w-px bg-gray-300 mx-auto mt-1"></div>
                      </div>
                      <div>
                        <div className="font-medium">Order Placed</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Today, 10:30 AM
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-3">
                        <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="h-full w-px bg-gray-300 mx-auto mt-1"></div>
                      </div>
                      <div>
                        <div className="font-medium">Order Confirmed</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Today, 10:45 AM
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                          <div className="h-2 w-2 bg-white rounded-full"></div>
                        </div>
                        <div className="h-full w-px bg-gray-300 mx-auto mt-1"></div>
                      </div>
                      <div>
                        <div className="font-medium">Processing</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          In Progress
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-3">
                        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="h-full w-px bg-gray-300 mx-auto mt-1"></div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-400">Shipped</div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Expected Tomorrow
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-3">
                        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-400">Delivered</div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Expected in 2 days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">How It Works</h3>
            <p className="text-gray-700">
              The Supplier Agent acts as the interface between the retail system and external suppliers. When it
              receives an order request from the Warehouse Agent, it evaluates available suppliers based on multiple
              factors including price, delivery speed, and reliability. For this Shampoo order, it selected Supplier-XYZ
              as the optimal choice, generated purchase order PO-28754, and confirmed a 2-day delivery timeline. The
              agent will continue to track the order status and provide updates to the Warehouse Agent until delivery is
              complete.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supplier Recommendation System</CardTitle>
          <CardDescription>How the Supplier Agent selects the optimal supplier for each order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Supplier Comparison</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Supplier
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lead Time
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reliability
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">Supplier B</div>
                        <Badge className="mt-1 bg-green-100 text-green-800">Selected</Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">$3.50/unit</td>
                      <td className="px-4 py-3 whitespace-nowrap">1 day</td>
                      <td className="px-4 py-3 whitespace-nowrap">92%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">Supplier A</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">$3.80/unit</td>
                      <td className="px-4 py-3 whitespace-nowrap">2 days</td>
                      <td className="px-4 py-3 whitespace-nowrap">95%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">Supplier C</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">$3.20/unit</td>
                      <td className="px-4 py-3 whitespace-nowrap">5 days</td>
                      <td className="px-4 py-3 whitespace-nowrap">88%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <strong>Decision:</strong> Supplier B selected due to 10% cheaper price and 1-day delivery time, despite
                slightly lower reliability than Supplier A.
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Supplier Selection Factors</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-md">
                  <div className="font-medium">Price Optimization</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Compares unit prices across suppliers, including volume discounts and promotional offers.
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="font-medium">Delivery Speed</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Evaluates lead times and shipping options, prioritizing faster delivery for critical items.
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="font-medium">Reliability Score</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Tracks on-time delivery rate, order accuracy, and quality consistency for each supplier.
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="font-medium">Minimum Order Requirements</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Considers minimum order quantities and optimizes order sizes accordingly.
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="font-medium">Historical Performance</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Uses past supplier performance data to inform future ordering decisions.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Predictive Reordering</h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                The Supplier Agent doesn't just react to low stock situations—it proactively predicts when to place
                orders based on lead times, seasonal demand, and historical patterns.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div className="border rounded-md p-3">
                  <div className="font-medium">Lead Time Calculation</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Orders are placed early enough to account for supplier processing and shipping time.
                  </div>
                </div>

                <div className="border rounded-md p-3">
                  <div className="font-medium">Seasonal Anticipation</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Example: Cold drinks are ordered in advance of summer to prevent stockouts during peak demand.
                  </div>
                </div>

                <div className="border rounded-md p-3">
                  <div className="font-medium">Bulk Order Optimization</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Combines multiple product orders to reach volume discount thresholds when appropriate.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

