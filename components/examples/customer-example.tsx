import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, ThumbsUp, User } from "lucide-react"

export default function CustomerExample() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-gray-500" />
                Customer Agent
              </CardTitle>
              <CardDescription>Provides personalized recommendations and enhances customer experience</CardDescription>
            </div>
            <Badge className="bg-gray-100 text-gray-800">Personalization</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Input</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Customer Preferences:</span> ['shampoo', 'personal care']
                  </div>
                  <div>
                    <span className="font-medium">Purchase History:</span> ['soap', 'toothpaste']
                  </div>
                  <div>
                    <span className="font-medium">Current Product View:</span> Shampoo (ID: 101)
                  </div>
                  <div>
                    <span className="font-medium">Available Related Products:</span>
                    <ul className="list-disc list-inside ml-2 mt-1 text-sm">
                      <li>Conditioner (ID: 104)</li>
                      <li>Body Wash (ID: 105)</li>
                      <li>Hair Serum (ID: 106)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Logic</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div>
                    <span className="font-medium">Process:</span>
                    <ol className="list-decimal list-inside ml-2 mt-1 space-y-1 text-sm">
                      <li>Analyze customer preferences and purchase history</li>
                      <li>Identify complementary products to current view</li>
                      <li>Check inventory status of potential recommendations</li>
                      <li>Score products based on relevance and availability</li>
                      <li>Generate personalized recommendations</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Output: Recommendations</h3>
                <div className="bg-gray-50 border p-4 rounded-md space-y-3">
                  <div className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-blue-500 mr-2" />
                    <div className="text-lg font-medium">Personalized Recommendations</div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-md border">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">Conditioner (ID: 104)</div>
                          <div className="text-sm text-gray-500">Perfect pair with your shampoo</div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Relevance Score:</span> 95%
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-md border">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">Body Wash (ID: 105)</div>
                          <div className="text-sm text-gray-500">Complete your personal care routine</div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Relevance Score:</span> 85%
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-md border">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">Hair Serum (ID: 106)</div>
                          <div className="text-sm text-gray-500">Enhanced hair care</div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Relevance Score:</span> 75%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Customer UI Display</h3>
                <div className="bg-white border p-4 rounded-md">
                  <div className="text-lg font-medium mb-3">Customers Also Bought</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border rounded-md p-2 text-center">
                      <div className="w-full h-16 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="text-sm font-medium truncate">Conditioner</div>
                      <div className="text-xs text-gray-500">$4.99</div>
                      <button className="mt-2 w-full text-xs bg-blue-500 text-white rounded-md py-1">
                        Add to Cart
                      </button>
                    </div>

                    <div className="border rounded-md p-2 text-center">
                      <div className="w-full h-16 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="text-sm font-medium truncate">Body Wash</div>
                      <div className="text-xs text-gray-500">$3.99</div>
                      <button className="mt-2 w-full text-xs bg-blue-500 text-white rounded-md py-1">
                        Add to Cart
                      </button>
                    </div>

                    <div className="border rounded-md p-2 text-center">
                      <div className="w-full h-16 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="text-sm font-medium truncate">Hair Serum</div>
                      <div className="text-xs text-gray-500">$7.99</div>
                      <button className="mt-2 w-full text-xs bg-blue-500 text-white rounded-md py-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">How It Works</h3>
            <p className="text-gray-700">
              The Customer Agent enhances the shopping experience by providing personalized product recommendations.
              When a customer views a product like Shampoo, the agent analyzes their preferences and purchase history to
              identify complementary products they might be interested in. It then checks inventory to ensure the
              recommended products are in stock and displays them in the UI with relevant messaging. This increases
              average order value while helping customers discover products that match their needs.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Agent Features</CardTitle>
          <CardDescription>Additional capabilities that enhance the customer experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Personalized Recommendations</h4>
                </div>
                <Badge className="bg-blue-100 text-blue-800">AI-Powered</Badge>
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p>
                  Analyzes customer browsing behavior, purchase history, and preferences to recommend relevant products.
                </p>
                <p>Adapts recommendations based on real-time inventory to avoid suggesting out-of-stock items.</p>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Stock Availability Alerts</h4>
                </div>
                <Badge className="bg-green-100 text-green-800">Real-time</Badge>
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p>Notifies customers when previously out-of-stock items become available.</p>
                <p>Displays accurate inventory status on product pages to set proper expectations.</p>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Dynamic Bundling</h4>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Smart Offers</Badge>
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p>Creates personalized product bundles based on complementary items and customer preferences.</p>
                <p>Offers special pricing on bundles to increase average order value while providing customer value.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Customer Experience Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Personalized Shopping Experience</h4>
                <p className="text-sm text-gray-700">
                  Each customer receives tailored recommendations and offers based on their unique preferences and
                  behavior, creating a more engaging and relevant shopping experience.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Reduced Search Time</h4>
                <p className="text-sm text-gray-700">
                  Customers spend less time searching for products as the system proactively suggests items they're
                  likely to be interested in, improving shopping efficiency.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Inventory Transparency</h4>
                <p className="text-sm text-gray-700">
                  Real-time stock information helps customers make informed decisions and reduces disappointment from
                  attempting to purchase out-of-stock items.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Discovery of New Products</h4>
                <p className="text-sm text-gray-700">
                  Intelligent recommendations help customers discover new products they might not have found otherwise,
                  expanding their awareness of the product catalog.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

