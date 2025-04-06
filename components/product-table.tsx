import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  stockStatus: "Critical" | "Low" | "Normal" | "Excess"
  priceChange: { direction: "up" | "down"; percent: number } | null
}

interface ProductTableProps {
  products: Product[]
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="font-medium">{product.name}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">{product.category}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">${product.price.toFixed(2)}</span>
                  {product.priceChange && (
                    <div
                      className={`ml-2 flex items-center ${
                        product.priceChange.direction === "up" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {product.priceChange.direction === "up" ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      <span className="text-xs">{product.priceChange.percent}%</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">{product.stock} units</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <Badge
                  className={
                    product.stockStatus === "Critical"
                      ? "bg-red-100 text-red-800"
                      : product.stockStatus === "Low"
                        ? "bg-orange-100 text-orange-800"
                        : product.stockStatus === "Excess"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                  }
                >
                  {product.stockStatus}
                </Badge>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

