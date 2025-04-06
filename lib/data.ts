// Mock data for the retail management system

// Inventory status data
export function getInventoryStatus() {
  return [
    {
      product: "Organic Milk 1L",
      sku: "OM-1001",
      status: "Low",
      current: 12,
      threshold: 15,
    },
    {
      product: "Premium Coffee Beans 500g",
      sku: "PCB-2234",
      status: "Critical",
      current: 3,
      threshold: 10,
    },
    {
      product: "Whole Grain Bread 700g",
      sku: "WGB-3421",
      status: "OK",
      current: 28,
      threshold: 20,
    },
    {
      product: "Fresh Orange Juice 1L",
      sku: "FOJ-4532",
      status: "Low",
      current: 8,
      threshold: 12,
    },
    {
      product: "Free Range Eggs (12 pack)",
      sku: "FRE-5643",
      status: "Critical",
      current: 4,
      threshold: 15,
    },
  ]
}

// Recent agent activities
export function getRecentAgentActivities() {
  return [
    {
      type: "order",
      message: "Ordered 120 units of Organic Milk from Supplier A",
      time: "10 minutes ago",
    },
    {
      type: "price",
      message: "Adjusted price of Premium Coffee Beans from $12.99 to $10.99",
      time: "25 minutes ago",
    },
    {
      type: "alert",
      message: "Critical stock level for Free Range Eggs detected",
      time: "32 minutes ago",
    },
    {
      type: "restock",
      message: "Restocked 50 units of Whole Grain Bread",
      time: "1 hour ago",
    },
    {
      type: "price",
      message: "Increased price of Fresh Orange Juice from $3.49 to $3.99 due to high demand",
      time: "1.5 hours ago",
    },
  ]
}

// Product performance data for pie chart
export function getProductPerformance() {
  return [
    { name: "Dairy", value: 35 },
    { name: "Bakery", value: 25 },
    { name: "Beverages", value: 20 },
    { name: "Produce", value: 15 },
    { name: "Other", value: 5 },
  ]
}

// Sales data for line chart
export function getSalesData() {
  return [
    { date: "Mon", sales: 4000, predicted: 4200 },
    { date: "Tue", sales: 3000, predicted: 3100 },
    { date: "Wed", sales: 2000, predicted: 2300 },
    { date: "Thu", sales: 2780, predicted: 2500 },
    { date: "Fri", sales: 1890, predicted: 2100 },
    { date: "Sat", sales: 2390, predicted: 2300 },
    { date: "Sun", sales: 3490, predicted: 3200 },
  ]
}

// Inventory data for bar chart
export function getInventoryData() {
  return [
    { category: "Dairy", current: 120, optimal: 150 },
    { category: "Bakery", current: 80, optimal: 100 },
    { category: "Beverages", current: 110, optimal: 120 },
    { category: "Produce", current: 60, optimal: 90 },
    { category: "Frozen", current: 95, optimal: 100 },
  ]
}

// Agent data for the agents page
export function getAgents() {
  return [
    {
      id: "forecast-agent",
      name: "Forecast Agent",
      description: "Predicts future demand based on historical sales data and trends",
      status: "active",
      type: "forecast",
      lastAction: "Updated demand predictions for next week",
      lastActionTime: "5 minutes ago",
      metrics: {
        responseTime: "1.2s",
        accuracy: "92%",
        decisions: 128,
      },
    },
    {
      id: "store-agent",
      name: "Store Agent",
      description: "Monitors store inventory levels and requests restocks when needed",
      status: "active",
      type: "store",
      lastAction: "Reported low stock for dairy products",
      lastActionTime: "12 minutes ago",
      metrics: {
        responseTime: "0.8s",
        accuracy: "95%",
        decisions: 243,
      },
    },
    {
      id: "warehouse-agent",
      name: "Warehouse Agent",
      description: "Manages warehouse inventory and fulfills store restock requests",
      status: "active",
      type: "warehouse",
      lastAction: "Processed transfer of goods to Store #12",
      lastActionTime: "28 minutes ago",
      metrics: {
        responseTime: "1.5s",
        accuracy: "97%",
        decisions: 186,
      },
    },
    {
      id: "supplier-agent",
      name: "Supplier Agent",
      description: "Handles communication with suppliers and places orders",
      status: "active",
      type: "supplier",
      lastAction: "Placed order with Supplier XYZ",
      lastActionTime: "1 hour ago",
      metrics: {
        responseTime: "2.1s",
        accuracy: "91%",
        decisions: 97,
      },
    },
    {
      id: "pricing-agent",
      name: "Pricing Agent",
      description: "Optimizes product pricing based on demand, inventory, and competition",
      status: "active",
      type: "pricing",
      lastAction: "Adjusted prices for 15 slow-moving items",
      lastActionTime: "45 minutes ago",
      metrics: {
        responseTime: "1.7s",
        accuracy: "89%",
        decisions: 156,
      },
    },
    {
      id: "coordinator-agent",
      name: "Coordinator Agent",
      description: "Orchestrates communication between all agents and optimizes system-wide decisions",
      status: "active",
      type: "coordinator",
      lastAction: "Optimized system-wide inventory allocation",
      lastActionTime: "17 minutes ago",
      metrics: {
        responseTime: "2.3s",
        accuracy: "94%",
        decisions: 312,
      },
    },
  ]
}

// Get agent network data for visualization
export function getAgentNetwork() {
  return {
    nodes: [
      { id: "forecast", name: "Forecast Agent", group: 1 },
      { id: "store", name: "Store Agent", group: 2 },
      { id: "warehouse", name: "Warehouse Agent", group: 3 },
      { id: "supplier", name: "Supplier Agent", group: 4 },
      { id: "pricing", name: "Pricing Agent", group: 5 },
      { id: "coordinator", name: "Coordinator Agent", group: 6 },
    ],
    links: [
      { source: "forecast", target: "store", value: 5 },
      { source: "forecast", target: "coordinator", value: 7 },
      { source: "store", target: "warehouse", value: 8 },
      { source: "store", target: "coordinator", value: 6 },
      { source: "warehouse", target: "supplier", value: 5 },
      { source: "warehouse", target: "coordinator", value: 4 },
      { source: "supplier", target: "coordinator", value: 3 },
      { source: "pricing", target: "store", value: 4 },
      { source: "pricing", target: "coordinator", value: 6 },
      { source: "coordinator", target: "forecast", value: 3 },
      { source: "coordinator", target: "warehouse", value: 5 },
    ],
  }
}

// Get product data
export function getProducts(count = 10) {
  const products = [
    {
      id: "P001",
      name: "Organic Milk 1L",
      sku: "OM-1001",
      category: "Dairy",
      price: 3.99,
      stock: 12,
      threshold: 15,
      supplier: "Organic Farms Inc.",
      lastRestocked: "2023-04-10",
      salesVelocity: "High",
      status: "Low",
    },
    {
      id: "P002",
      name: "Premium Coffee Beans 500g",
      sku: "PCB-2234",
      category: "Beverages",
      price: 12.99,
      stock: 3,
      threshold: 10,
      supplier: "Global Coffee Traders",
      lastRestocked: "2023-04-05",
      salesVelocity: "Medium",
      status: "Critical",
    },
    {
      id: "P003",
      name: "Whole Grain Bread 700g",
      sku: "WGB-3421",
      category: "Bakery",
      price: 4.49,
      stock: 28,
      threshold: 20,
      supplier: "Local Bakery Co.",
      lastRestocked: "2023-04-12",
      salesVelocity: "High",
      status: "OK",
    },
    {
      id: "P004",
      name: "Fresh Orange Juice 1L",
      sku: "FOJ-4532",
      category: "Beverages",
      price: 3.99,
      stock: 8,
      threshold: 12,
      supplier: "Citrus Growers Ltd.",
      lastRestocked: "2023-04-08",
      salesVelocity: "High",
      status: "Low",
    },
    {
      id: "P005",
      name: "Free Range Eggs (12 pack)",
      sku: "FRE-5643",
      category: "Dairy",
      price: 5.99,
      stock: 4,
      threshold: 15,
      supplier: "Happy Hens Farm",
      lastRestocked: "2023-04-07",
      salesVelocity: "Medium",
      status: "Critical",
    },
    {
      id: "P006",
      name: "Organic Apples (1kg)",
      sku: "OA-6754",
      category: "Produce",
      price: 4.99,
      stock: 25,
      threshold: 20,
      supplier: "Organic Farms Inc.",
      lastRestocked: "2023-04-11",
      salesVelocity: "Medium",
      status: "OK",
    },
    {
      id: "P007",
      name: "Premium Chocolate Bar 100g",
      sku: "PCB-7865",
      category: "Confectionery",
      price: 3.49,
      stock: 32,
      threshold: 25,
      supplier: "Luxury Chocolatiers",
      lastRestocked: "2023-04-09",
      salesVelocity: "Low",
      status: "OK",
    },
    {
      id: "P008",
      name: "Sparkling Mineral Water 1L",
      sku: "SMW-8976",
      category: "Beverages",
      price: 1.99,
      stock: 18,
      threshold: 24,
      supplier: "Mountain Springs Co.",
      lastRestocked: "2023-04-06",
      salesVelocity: "Medium",
      status: "Low",
    },
    {
      id: "P009",
      name: "Organic Chicken Breast (500g)",
      sku: "OCB-9087",
      category: "Meat",
      price: 8.99,
      stock: 7,
      threshold: 10,
      supplier: "Free Range Poultry Farms",
      lastRestocked: "2023-04-10",
      salesVelocity: "High",
      status: "Low",
    },
    {
      id: "P010",
      name: "Premium Olive Oil 500ml",
      sku: "POO-1098",
      category: "Pantry",
      price: 9.99,
      stock: 14,
      threshold: 12,
      supplier: "Mediterranean Imports",
      lastRestocked: "2023-04-04",
      salesVelocity: "Low",
      status: "OK",
    },
  ]

  return products.slice(0, count)
}

// Get simulation data
export function getSimulationData() {
  return {
    stores: [
      { id: 1, name: "Downtown Store", inventory: 85, sales: 120, restockNeeded: true },
      { id: 2, name: "Suburban Mall", inventory: 110, sales: 95, restockNeeded: false },
      { id: 3, name: "Westside Location", inventory: 65, sales: 80, restockNeeded: true },
      { id: 4, name: "Eastside Market", inventory: 95, sales: 85, restockNeeded: false },
    ],
    warehouse: {
      totalInventory: 1250,
      incomingShipments: 3,
      outgoingShipments: 5,
      utilizationRate: 78,
    },
    suppliers: [
      { id: 1, name: "Organic Farms Inc.", reliability: 92, leadTime: 2, costIndex: 85 },
      { id: 2, name: "Global Distributors", reliability: 87, leadTime: 3, costIndex: 75 },
      { id: 3, name: "Local Producers Co-op", reliability: 95, leadTime: 1, costIndex: 90 },
    ],
    products: [
      { id: "P001", name: "Organic Milk 1L", demand: "Increasing", price: "Stable", stockLevel: "Low" },
      { id: "P002", name: "Premium Coffee Beans 500g", demand: "Stable", price: "Decreasing", stockLevel: "Critical" },
      { id: "P003", name: "Whole Grain Bread 700g", demand: "Increasing", price: "Increasing", stockLevel: "OK" },
      { id: "P004", name: "Fresh Orange Juice 1L", demand: "Decreasing", price: "Stable", stockLevel: "Low" },
    ],
  }
}

