import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"

export default function PricingExample() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-red-500" />
                Pricing Agent
              </CardTitle>
              <CardDescription>Dynamically adjusts prices based on inventory and demand</CardDescription>
            </div>
            <Badge className="bg-red-100 text-red-800">Price Optimization</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Input: Slow-Moving Item</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Product:</span> T-shirt (ID: 102)
                  </div>
                  <div>
                    <span className="font-medium">Current Price:</span> $19.99
                  </div>
                  <div>
                    <span className="font-medium">Cost Price:</span> $8.00
                  </div>
                  <div>
                    <span className="font-medium">Stock Status:</span>{" "}
                    <Badge className="bg-blue-100 text-blue-800">Excess</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Sales Velocity:</span>{" "}
                    <Badge className="bg-orange-100 text-orange-800">Slow</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Days in Stock:</span> 45 days
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Logic</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Process:</span>
                    <ol className="list-decimal list-inside ml-2 mt-1 space-y-1 text-sm">
                      <li>Analyze stock status and sales velocity</li>
                      <li>Calculate current profit margin (($19.99 - $8.00) / $19.99 = 60%)</li>
                      <li>Determine appropriate price adjustment based on business rules</li>
                      <li>Ensure new price maintains minimum profit margin</li>
                      <li>Apply price change and monitor impact</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Output: Price Adjustment</h3>
                <div className="bg-red-50 border border-red-100 p-4 rounded-md space-y-3">
                  <div className="flex items-center">
                    <ArrowDown className="h-5 w-5 text-green-500 mr-2" />
                    <div className="text-lg font-medium text-red-800">Price Reduction Recommended</div>
                  </div>
                  <div>
                    <span className="font-medium">Original Price:</span> $19.99
                  </div>
                  <div>
                    <span className="font-medium">New Price:</span>{" "}
                    <span className="text-green-600 font-bold">$16.99</span>
                  </div>
                  <div>
                    <span className="font-medium">Adjustment:</span>{" "}
                    <Badge className="bg-green-100 text-green-800">-15%</Badge>
                  </div>
                  <div>
                    <span className="font-medium">New Margin:</span> 53% (still well above minimum 15%)
                  </div>
                  <div className="mt-2 p-3 bg-white rounded border border-red-200">
                    <div className="font-medium">Reason for Adjustment:</div>
                    <div className="mt-1">
                      Only 10 T-shirts sold in 45 days with excess inventory. Price reduction of $3.00 recommended to
                      increase sales velocity.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Expected Impact</h3>
                <div className="bg-white border p-4 rounded-md space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sales Velocity</span>
                      <span className="text-green-600">+40% (estimated)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Inventory Turnover</span>
                      <span className="text-green-600">+35% (estimated)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Profit per Unit</span>
                      <span className="text-red-600">-17% ($11.99 → $8.99)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "17%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Profit</span>
                      <span className="text-green-600">+16% (estimated)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "16%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">How It Works</h3>
            <p className="text-gray-700">
              The Pricing Agent continuously analyzes inventory levels, sales velocity, and profit margins to optimize
              pricing strategy. In this example, it identified that T-shirts have been selling slowly (only 10 sold in
              45 days) despite having excess inventory. The agent recommended a 15% price reduction from $19.99 to
              $16.99, which still maintains a healthy 53% profit margin. This price adjustment is expected to increase
              sales velocity by approximately 40%, improving inventory turnover while maintaining overall profitability.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Smart Pricing Optimization Examples</CardTitle>
          <CardDescription>How the Pricing Agent handles different scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Price Reduction</h4>
                  <p className="text-sm text-gray-500">T-shirt: Excess inventory, slow sales</p>
                </div>
                <Badge className="bg-green-100 text-green-800 flex items-center">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  -15%
                </Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Original:</span> $19.99
                </div>
                <div className="text-sm">
                  <span className="font-medium">New:</span> $16.99
                </div>
                <div className="text-sm">
                  <span className="font-medium">Reason:</span> Increase turnover of slow-moving stock
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Price Increase</h4>
                  <p className="text-sm text-gray-500">Shampoo: Low stock, high demand</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +8%
                </Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Original:</span> $5.99
                </div>
                <div className="text-sm">
                  <span className="font-medium">New:</span> $6.49
                </div>
                <div className="text-sm">
                  <span className="font-medium">Reason:</span> Optimize profit on high-demand item with limited stock
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Clearance Pricing</h4>
                  <p className="text-sm text-gray-500">Seasonal item: End of season</p>
                </div>
                <Badge className="bg-red-100 text-red-800 flex items-center">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  -30%
                </Badge>
              </div>
              <div className="mt-3 space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Original:</span> $24.99
                </div>
                <div className="text-sm">
                  <span className="font-medium">New:</span> $17.49
                </div>
                <div className="text-sm">
                  <span className="font-medium">Reason:</span> Clear inventory before new season arrives
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Pricing Optimization Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Dynamic Pricing</h4>
                <p className="text-sm text-gray-700">
                  Prices adjust automatically based on real-time inventory levels, demand patterns, and competitor
                  pricing, ensuring optimal balance between sales volume and profit margins.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Markdown Optimization</h4>
                <p className="text-sm text-gray-700">
                  Intelligently times and sizes markdowns to maximize revenue from slow-moving or seasonal inventory,
                  avoiding excessive discounting while ensuring stock clearance.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Elasticity Analysis</h4>
                <p className="text-sm text-gray-700">
                  Continuously analyzes price elasticity (how demand changes with price) for each product to determine
                  optimal price points that maximize overall profit.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Competitive Pricing</h4>
                <p className="text-sm text-gray-700">
                  Monitors competitor prices and adjusts accordingly to maintain market position while preserving
                  margins, ensuring prices remain competitive without unnecessary discounting.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

