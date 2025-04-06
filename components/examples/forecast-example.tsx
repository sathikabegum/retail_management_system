import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

export default function ForecastExample() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                Forecast Agent
              </CardTitle>
              <CardDescription>Predicts future demand based on historical data and trends</CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800">AI Prediction</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Input</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Product ID:</span> 101
                  </div>
                  <div>
                    <span className="font-medium">Product Name:</span> Shampoo
                  </div>
                  <div>
                    <span className="font-medium">Past Sales Data:</span> [40, 50, 60, 70]
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Logic</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Algorithm:</span> Linear Regression
                  </div>
                  <div>
                    <span className="font-medium">Process:</span>
                    <ol className="list-decimal list-inside ml-2 mt-1 space-y-1 text-sm">
                      <li>Analyze historical sales pattern</li>
                      <li>Identify trend direction and magnitude</li>
                      <li>Calculate next value in sequence</li>
                      <li>Apply seasonal adjustments if applicable</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Output</h3>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-md space-y-2">
                  <div className="text-lg font-bold text-blue-800">📈 Forecasted demand for Shampoo: 80 units</div>
                  <div>
                    <span className="font-medium">Trend:</span>{" "}
                    <Badge className="bg-green-100 text-green-800">Increasing</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Confidence:</span> 92%
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Visualization</h3>
                <div className="bg-white border p-4 rounded-md h-48 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {/* Simple chart visualization */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
                    <div className="absolute left-0 bottom-0 h-full w-px bg-gray-300"></div>

                    {/* Data points */}
                    <div className="absolute bottom-0 left-[10%] h-[40%] w-2 bg-blue-500 rounded-t-sm"></div>
                    <div className="absolute bottom-0 left-[30%] h-[50%] w-2 bg-blue-500 rounded-t-sm"></div>
                    <div className="absolute bottom-0 left-[50%] h-[60%] w-2 bg-blue-500 rounded-t-sm"></div>
                    <div className="absolute bottom-0 left-[70%] h-[70%] w-2 bg-blue-500 rounded-t-sm"></div>
                    <div className="absolute bottom-0 left-[90%] h-[80%] w-2 bg-blue-600 rounded-t-sm border-2 border-dashed border-blue-700"></div>

                    {/* Trend line */}
                    <div className="absolute bottom-[40%] left-[10%] w-[80%] h-px bg-red-400 transform -rotate-[15deg] origin-bottom-left"></div>

                    {/* Labels */}
                    <div className="absolute bottom-[-20px] left-[10%] text-xs">Week 1</div>
                    <div className="absolute bottom-[-20px] left-[30%] text-xs">Week 2</div>
                    <div className="absolute bottom-[-20px] left-[50%] text-xs">Week 3</div>
                    <div className="absolute bottom-[-20px] left-[70%] text-xs">Week 4</div>
                    <div className="absolute bottom-[-20px] left-[90%] text-xs font-bold">Forecast</div>

                    <div className="absolute left-[-25px] bottom-[40%] text-xs">40</div>
                    <div className="absolute left-[-25px] bottom-[50%] text-xs">50</div>
                    <div className="absolute left-[-25px] bottom-[60%] text-xs">60</div>
                    <div className="absolute left-[-25px] bottom-[70%] text-xs">70</div>
                    <div className="absolute left-[-25px] bottom-[80%] text-xs font-bold">80</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">How It Works</h3>
            <p className="text-gray-700">
              The Forecast Agent uses machine learning algorithms to analyze historical sales data and identify
              patterns. For this example, it detected a clear upward trend in Shampoo sales, increasing by approximately
              10 units each week. Based on this pattern, it predicts that next week's sales will reach 80 units. This
              prediction helps other agents prepare for the expected demand by adjusting inventory and pricing
              accordingly.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Forecast Examples</CardTitle>
          <CardDescription>Different forecasting scenarios for various products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">T-shirt (ID: 102)</h4>
                  <p className="text-sm text-gray-500">Past sales: [30, 25, 20, 15]</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Decreasing</Badge>
              </div>
              <div className="mt-4 text-lg font-bold">📉 Forecasted demand: 10 units</div>
              <div className="mt-1 text-sm text-gray-600">Confidence: 88% • Trend: Steady decline</div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Cold Drinks (ID: 103)</h4>
                  <p className="text-sm text-gray-500">Past sales: [100, 120, 150, 200]</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Increasing</Badge>
              </div>
              <div className="mt-4 text-lg font-bold">📈 Forecasted demand: 250 units</div>
              <div className="mt-1 text-sm text-gray-600">Confidence: 95% • Trend: Rapid growth</div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Seasonal Item: Sunscreen</h4>
                  <p className="text-sm text-gray-500">Monthly pattern analysis</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Seasonal</Badge>
              </div>
              <div className="mt-4 text-lg font-bold">🌞 Peak month: June-July</div>
              <div className="mt-1 text-sm text-gray-600">300% increase compared to winter months</div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">New Product: Smart Watch</h4>
                  <p className="text-sm text-gray-500">Similar product analysis</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Prediction</Badge>
              </div>
              <div className="mt-4 text-lg font-bold">🆕 Initial demand: 120 units/week</div>
              <div className="mt-1 text-sm text-gray-600">Confidence: 75% • Based on similar product launches</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

