import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Download, Filter, RefreshCcw, Search } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import ProductTable from "@/components/product-table"
import { getProducts } from "@/lib/data"

export default function ProductsPage() {
  const products = getProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            <TabsTrigger value="overstock">Overstock</TabsTrigger>
            <TabsTrigger value="price-changes">Recent Price Changes</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Manage and monitor your product inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input placeholder="Search products..." className="pl-8" />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort
                    </Button>
                    <select className="rounded-md border border-gray-300 p-2 text-sm">
                      <option>All Categories</option>
                      <option>Dairy</option>
                      <option>Produce</option>
                      <option>Bakery</option>
                      <option>Meat</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                </div>

                <ProductTable products={products} />

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">Showing 1-10 of 1,284 products</div>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="bg-gray-100">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      ...
                    </Button>
                    <Button variant="outline" size="sm">
                      128
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="low-stock">
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Products</CardTitle>
                <CardDescription>Products that need to be restocked soon</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductTable
                  products={products.filter((p) => p.stockStatus === "Low" || p.stockStatus === "Critical")}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overstock">
            <Card>
              <CardHeader>
                <CardTitle>Overstocked Products</CardTitle>
                <CardDescription>Products with excess inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductTable products={products.filter((p) => p.stockStatus === "Excess")} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="price-changes">
            <Card>
              <CardHeader>
                <CardTitle>Recent Price Changes</CardTitle>
                <CardDescription>Products with price adjustments in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductTable products={products.filter((p) => p.priceChange !== null)} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Insights</CardTitle>
              <CardDescription>AI-generated recommendations for inventory optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-blue-50">
                  <h3 className="font-medium mb-2">Seasonal Demand Prediction</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Based on historical data, we predict a 32% increase in demand for ice cream and frozen desserts in
                    the next 30 days due to seasonal trends.
                  </p>
                  <div className="flex space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">Forecast Agent</Badge>
                    <Badge className="bg-green-100 text-green-800">High Confidence</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-md bg-amber-50">
                  <h3 className="font-medium mb-2">Pricing Optimization</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    15 products in the "Dairy" category are showing slow movement. Consider a 10-15% temporary discount
                    to increase turnover and prevent spoilage.
                  </p>
                  <div className="flex space-x-2">
                    <Badge className="bg-amber-100 text-amber-800">Pricing Agent</Badge>
                    <Badge className="bg-green-100 text-green-800">Medium Confidence</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-md bg-red-50">
                  <h3 className="font-medium mb-2">Critical Stock Alert</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    8 high-demand products are at critical stock levels and require immediate reordering. Estimated
                    stockout in 3-5 days if not addressed.
                  </p>
                  <div className="flex space-x-2">
                    <Badge className="bg-red-100 text-red-800">Store Agent</Badge>
                    <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-md bg-green-50">
                  <h3 className="font-medium mb-2">Supplier Recommendation</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Supplier XYZ is offering a 12% discount on bulk orders of canned goods. Recommended to increase
                    order quantity for next shipment.
                  </p>
                  <div className="flex space-x-2">
                    <Badge className="bg-green-100 text-green-800">Supplier Agent</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Cost Saving</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agent Actions</CardTitle>
              <CardDescription>Recent automated actions taken by AI agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">
                        {i === 0 && "Automatic Price Adjustment"}
                        {i === 1 && "Inventory Transfer"}
                        {i === 2 && "Purchase Order Created"}
                        {i === 3 && "Demand Forecast Update"}
                        {i === 4 && "Stock Level Alert"}
                      </h3>
                      <Badge>
                        {i === 0 && "Pricing Agent"}
                        {i === 1 && "Warehouse Agent"}
                        {i === 2 && "Supplier Agent"}
                        {i === 3 && "Forecast Agent"}
                        {i === 4 && "Store Agent"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {i === 0 &&
                        "Reduced prices for 12 slow-moving dairy products by an average of 15% to increase turnover."}
                      {i === 1 &&
                        "Transferred 120 units of SKU #45872 from Warehouse B to Store #12 to prevent stockout."}
                      {i === 2 &&
                        "Created purchase order #PO-28754 for 500 units of Organic Milk from Supplier XYZ with expedited delivery."}
                      {i === 3 &&
                        "Updated demand forecast for fresh produce based on seasonal trends, predicting 28% increase."}
                      {i === 4 &&
                        "Detected critical low stock for 8 essential items and notified Warehouse Agent for immediate action."}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{i * 2 + 1} hours ago</span>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

