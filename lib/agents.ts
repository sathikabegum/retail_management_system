// Agent base class
export class Agent {
  name: string
  status: "active" | "inactive" | "error"
  lastAction: string
  lastActionTime: Date

  constructor(name: string) {
    this.name = name
    this.status = "active"
    this.lastAction = "Initialized"
    this.lastActionTime = new Date()
  }

  performAction(action: string): void {
    this.lastAction = action
    this.lastActionTime = new Date()
    console.log(`${this.name} performed action: ${action}`)
  }

  sendMessage(targetAgent: Agent, message: string): void {
    console.log(`${this.name} sent message to ${targetAgent.name}: ${message}`)
    targetAgent.receiveMessage(this, message)
  }

  receiveMessage(fromAgent: Agent, message: string): void {
    console.log(`${this.name} received message from ${fromAgent.name}: ${message}`)
    this.lastAction = `Received message from ${fromAgent.name}`
    this.lastActionTime = new Date()
  }
}

// Forecast Agent
export class ForecastAgent extends Agent {
  predictionHorizon: number // in days
  updateFrequency: "hourly" | "daily" | "weekly"
  accuracy: number // percentage

  constructor() {
    super("Forecast Agent")
    this.predictionHorizon = 14
    this.updateFrequency = "hourly"
    this.accuracy = 92
  }

  predictDemand(
    productId: string,
    productName: string,
    pastSales: number[],
  ): {
    forecast: number
    trend: "increasing" | "decreasing" | "stable"
    confidence: number
  } {
    // Simple linear regression for forecasting
    // y = mx + b
    const n = pastSales.length

    if (n < 2) {
      this.performAction(`Insufficient data to predict demand for ${productName} (ID: ${productId})`)
      return { forecast: pastSales[0] || 0, trend: "stable", confidence: 50 }
    }

    // Calculate the means of x and y
    let sumX = 0
    let sumY = 0
    for (let i = 0; i < n; i++) {
      sumX += i
      sumY += pastSales[i]
    }
    const meanX = sumX / n
    const meanY = sumY / n

    // Calculate the slope (m) and y-intercept (b)
    let numerator = 0
    let denominator = 0
    for (let i = 0; i < n; i++) {
      numerator += (i - meanX) * (pastSales[i] - meanY)
      denominator += Math.pow(i - meanX, 2)
    }

    const slope = denominator !== 0 ? numerator / denominator : 0
    const intercept = meanY - slope * meanX

    // Predict the next value
    const nextValue = Math.round(slope * n + intercept)

    // Determine trend
    let trend: "increasing" | "decreasing" | "stable"
    if (slope > 0.5) {
      trend = "increasing"
    } else if (slope < -0.5) {
      trend = "decreasing"
    } else {
      trend = "stable"
    }

    // Calculate confidence based on R-squared
    let SST = 0
    let SSR = 0
    for (let i = 0; i < n; i++) {
      SST += Math.pow(pastSales[i] - meanY, 2)
      const predicted = slope * i + intercept
      SSR += Math.pow(predicted - meanY, 2)
    }
    const rSquared = SSR / SST
    const confidence = Math.min(Math.round(rSquared * 100), 99)

    // Ensure forecast is positive
    const forecast = Math.max(nextValue, 0)

    this.performAction(
      `Predicted demand for ${productName} (ID: ${productId}): ${forecast} units with ${confidence}% confidence`,
    )

    return { forecast, trend, confidence }
  }

  updateForecasts(
    products: Array<{ id: string; name: string; pastSales: number[] }>,
  ): Record<string, { forecast: number; trend: "increasing" | "decreasing" | "stable"; confidence: number }> {
    const forecasts: Record<
      string,
      { forecast: number; trend: "increasing" | "decreasing" | "stable"; confidence: number }
    > = {}

    products.forEach((product) => {
      forecasts[product.id] = this.predictDemand(product.id, product.name, product.pastSales)
    })

    this.performAction(`Updated demand predictions for ${products.length} products`)
    return forecasts
  }

  analyzeSeasonal(
    productId: string,
    productName: string,
    historicalData: Array<{ month: number; sales: number }>,
  ): {
    seasonalFactors: Record<number, number>
    peakMonth: number
    lowMonth: number
  } {
    // Calculate average sales per month
    const monthlySales: Record<number, number[]> = {}
    const monthlyAverages: Record<number, number> = {}

    historicalData.forEach((data) => {
      if (!monthlySales[data.month]) {
        monthlySales[data.month] = []
      }
      monthlySales[data.month].push(data.sales)
    })

    // Calculate average for each month
    let totalAverage = 0
    let totalCount = 0

    for (const month in monthlySales) {
      const sales = monthlySales[month]
      const average = sales.reduce((sum, sale) => sum + sale, 0) / sales.length
      monthlyAverages[month] = average
      totalAverage += average
      totalCount++
    }

    totalAverage = totalAverage / totalCount

    // Calculate seasonal factors
    const seasonalFactors: Record<number, number> = {}
    let peakMonth = 1
    let lowMonth = 1
    let peakFactor = 0
    let lowFactor = Number.POSITIVE_INFINITY

    for (const month in monthlyAverages) {
      const factor = monthlyAverages[month] / totalAverage
      seasonalFactors[month] = factor

      if (factor > peakFactor) {
        peakFactor = factor
        peakMonth = Number.parseInt(month)
      }

      if (factor < lowFactor) {
        lowFactor = factor
        lowMonth = Number.parseInt(month)
      }
    }

    this.performAction(
      `Analyzed seasonal patterns for ${productName} (ID: ${productId}): Peak month is ${peakMonth}, Low month is ${lowMonth}`,
    )

    return {
      seasonalFactors,
      peakMonth,
      lowMonth,
    }
  }
}

// Store Agent
export class StoreAgent extends Agent {
  storeId: string
  lowStockThreshold: number // percentage
  criticalStockThreshold: number // percentage

  constructor(storeId: string) {
    super(`Store Agent (${storeId})`)
    this.storeId = storeId
    this.lowStockThreshold = 20
    this.criticalStockThreshold = 10
  }

  checkInventory(product: {
    id: string
    name: string
    currentStock: number
    capacity: number
    predictedDemand: number
  }): {
    status: "Critical" | "Low" | "Normal" | "Excess"
    restockNeeded: boolean
    restockAmount: number
    daysUntilStockout: number
  } {
    const { id, name, currentStock, capacity, predictedDemand } = product
    const stockPercentage = (currentStock / capacity) * 100

    // Calculate days until stockout based on predicted demand
    // Assuming predictedDemand is daily demand
    const dailyDemand = predictedDemand > 0 ? predictedDemand : 1 // Avoid division by zero
    const daysUntilStockout = Math.floor(currentStock / dailyDemand)

    let status: "Critical" | "Low" | "Normal" | "Excess"
    let restockNeeded = false
    let restockAmount = 0

    if (stockPercentage <= this.criticalStockThreshold) {
      status = "Critical"
      restockNeeded = true
      restockAmount = predictedDemand - currentStock
      this.performAction(
        `⚠️ CRITICAL ALERT: ${name} (ID: ${id}) has only ${currentStock} units left (${stockPercentage.toFixed(1)}%). Stockout in ${daysUntilStockout} days!`,
      )
    } else if (stockPercentage <= this.lowStockThreshold) {
      status = "Low"
      restockNeeded = true
      restockAmount = predictedDemand - currentStock
      this.performAction(
        `⚠️ Stock low for ${name} (ID: ${id}): ${currentStock} units (${stockPercentage.toFixed(1)}%). Requesting ${restockAmount} more units.`,
      )
    } else if (stockPercentage >= 80) {
      status = "Excess"
      restockNeeded = false
      this.performAction(
        `Excess stock for ${name} (ID: ${id}): ${currentStock} units (${stockPercentage.toFixed(1)}%).`,
      )
    } else {
      status = "Normal"
      restockNeeded = false
      this.performAction(
        `Stock normal for ${name} (ID: ${id}): ${currentStock} units (${stockPercentage.toFixed(1)}%).`,
      )
    }

    // Ensure restockAmount is positive
    restockAmount = Math.max(restockAmount, 0)

    return {
      status,
      restockNeeded,
      restockAmount,
      daysUntilStockout,
    }
  }

  requestRestock(warehouseAgent: WarehouseAgent, product: { id: string; name: string }, quantity: number): void {
    this.performAction(`Requesting restock of ${quantity} units of ${product.name} (ID: ${product.id})`)
    this.sendMessage(
      warehouseAgent,
      `RESTOCK REQUEST: ${quantity} units of ${product.name} (ID: ${product.id}) for store ${this.storeId}`,
    )
  }

  monitorSales(product: { id: string; name: string }, salesRate: number): void {
    this.performAction(`Monitoring sales rate for ${product.name} (ID: ${product.id}): ${salesRate} units per day`)
  }

  alertPriceChange(
    pricingAgent: PricingAgent,
    product: { id: string; name: string },
    salesRate: number,
    stockLevel: number,
  ): void {
    if (salesRate < 5 && stockLevel > 50) {
      this.performAction(`Alerting pricing agent about slow-moving product: ${product.name} (ID: ${product.id})`)
      this.sendMessage(
        pricingAgent,
        `SLOW SALES ALERT: ${product.name} (ID: ${product.id}) is selling slowly (${salesRate} units/day) with high stock (${stockLevel} units)`,
      )
    } else if (salesRate > 20 && stockLevel < 30) {
      this.performAction(
        `Alerting pricing agent about fast-moving product with low stock: ${product.name} (ID: ${product.id})`,
      )
      this.sendMessage(
        pricingAgent,
        `HIGH DEMAND ALERT: ${product.name} (ID: ${product.id}) is selling quickly (${salesRate} units/day) with low stock (${stockLevel} units)`,
      )
    }
  }
}

// Warehouse Agent
export class WarehouseAgent extends Agent {
  warehouseId: string
  restockThreshold: number // percentage
  inventory: Record<string, { quantity: number; capacity: number }>

  constructor(warehouseId: string) {
    super(`Warehouse Agent (${warehouseId})`)
    this.warehouseId = warehouseId
    this.restockThreshold = 30
    this.inventory = {}
  }

  checkStock(productId: string, productName: string): { available: number; capacity: number; percentage: number } {
    const product = this.inventory[productId] || { quantity: 0, capacity: 100 }
    const percentage = (product.quantity / product.capacity) * 100

    this.performAction(
      `Checked warehouse stock for ${productName} (ID: ${productId}): ${product.quantity} units available (${percentage.toFixed(1)}% of capacity)`,
    )

    return {
      available: product.quantity,
      capacity: product.capacity,
      percentage,
    }
  }

  fulfillStoreRequest(
    storeAgent: StoreAgent,
    product: { id: string; name: string },
    requestedQuantity: number,
  ): {
    fulfilled: number
    remaining: number
    status: "complete" | "partial" | "failed"
  } {
    const inventory = this.inventory[product.id] || { quantity: 0, capacity: 100 }
    const available = inventory.quantity

    let fulfilled = 0
    let status: "complete" | "partial" | "failed"

    if (available >= requestedQuantity) {
      fulfilled = requestedQuantity
      inventory.quantity -= requestedQuantity
      status = "complete"
      this.performAction(
        `✅ Fulfilled complete request from ${storeAgent.storeId} for ${product.name} (ID: ${product.id}): ${fulfilled} units`,
      )
    } else if (available > 0) {
      fulfilled = available
      inventory.quantity = 0
      status = "partial"
      this.performAction(
        `⚠️ Partially fulfilled request from ${storeAgent.storeId} for ${product.name} (ID: ${product.id}): ${fulfilled}/${requestedQuantity} units`,
      )
    } else {
      fulfilled = 0
      status = "failed"
      this.performAction(
        `❌ Failed to fulfill request from ${storeAgent.storeId} for ${product.name} (ID: ${product.id}): 0/${requestedQuantity} units (out of stock)`,
      )
    }

    this.inventory[product.id] = inventory

    this.sendMessage(
      storeAgent,
      `FULFILLMENT ${status.toUpperCase()}: Sending ${fulfilled} units of ${product.name} (ID: ${product.id}) to store ${storeAgent.storeId}`,
    )

    return {
      fulfilled,
      remaining: requestedQuantity - fulfilled,
      status,
    }
  }

  requestFromSupplier(supplierAgent: SupplierAgent, product: { id: string; name: string }, quantity: number): void {
    this.performAction(`Requesting ${quantity} units of ${product.name} (ID: ${product.id}) from supplier`)
    this.sendMessage(
      supplierAgent,
      `SUPPLIER ORDER: ${quantity} units of ${product.name} (ID: ${product.id}) for warehouse ${this.warehouseId}`,
    )
  }

  receiveShipment(product: { id: string; name: string }, quantity: number): void {
    const inventory = this.inventory[product.id] || { quantity: 0, capacity: 100 }
    inventory.quantity += quantity
    this.inventory[product.id] = inventory

    this.performAction(
      `✅ Received shipment of ${quantity} units of ${product.name} (ID: ${product.id}). New stock level: ${inventory.quantity} units`,
    )
  }

  optimizeDistribution(
    stores: StoreAgent[],
    product: { id: string; name: string },
    demandByStore: Record<string, number>,
  ): Record<string, number> {
    const inventory = this.inventory[product.id] || { quantity: 0, capacity: 100 }
    const available = inventory.quantity

    if (available <= 0) {
      this.performAction(`Cannot distribute ${product.name} (ID: ${product.id}): No stock available`)
      return {}
    }

    // Calculate total demand
    const totalDemand = Object.values(demandByStore).reduce((sum, demand) => sum + demand, 0)

    // Distribute proportionally if demand exceeds supply
    const distribution: Record<string, number> = {}

    if (totalDemand <= available) {
      // Can fulfill all demand
      for (const storeId in demandByStore) {
        distribution[storeId] = demandByStore[storeId]
      }
      inventory.quantity -= totalDemand
    } else {
      // Proportional distribution
      for (const storeId in demandByStore) {
        const proportion = demandByStore[storeId] / totalDemand
        distribution[storeId] = Math.floor(available * proportion)
      }
      inventory.quantity = 0
    }

    this.inventory[product.id] = inventory

    this.performAction(
      `Optimized distribution of ${product.name} (ID: ${product.id}) across ${Object.keys(distribution).length} stores`,
    )

    return distribution
  }
}

// Supplier Agent
export class SupplierAgent extends Agent {
  supplierId: string
  leadTime: number // in days
  reliability: number // percentage
  supplierCatalog: Record<
    string,
    {
      price: number
      minOrderQuantity: number
      maxOrderQuantity: number
      currentDiscount: number
      leadTime: number
    }
  >

  constructor(supplierId: string) {
    super(`Supplier Agent (${supplierId})`)
    this.supplierId = supplierId
    this.leadTime = 3
    this.reliability = 95
    this.supplierCatalog = {}
  }

  processOrder(
    product: { id: string; name: string },
    quantity: number,
  ): {
    orderNumber: string
    estimatedDelivery: Date
    status: "confirmed" | "partial" | "rejected"
    actualQuantity: number
    price: number
    discount: number
    totalCost: number
  } {
    const orderNumber = `PO-${Math.floor(Math.random() * 100000)}`
    const estimatedDelivery = new Date()

    const productInfo = this.supplierCatalog[product.id] || {
      price: 10,
      minOrderQuantity: 10,
      maxOrderQuantity: 1000,
      currentDiscount: 0,
      leadTime: this.leadTime,
    }

    // Apply lead time
    estimatedDelivery.setDate(estimatedDelivery.getDate() + productInfo.leadTime)

    // Check if order quantity is valid
    let status: "confirmed" | "partial" | "rejected"
    let actualQuantity = quantity

    if (quantity < productInfo.minOrderQuantity) {
      status = "rejected"
      actualQuantity = 0
      this.performAction(
        `❌ Rejected order ${orderNumber} for ${product.name} (ID: ${product.id}): Quantity ${quantity} below minimum order quantity ${productInfo.minOrderQuantity}`,
      )
    } else if (quantity > productInfo.maxOrderQuantity) {
      status = "partial"
      actualQuantity = productInfo.maxOrderQuantity
      this.performAction(
        `⚠️ Partially confirmed order ${orderNumber} for ${product.name} (ID: ${product.id}): Reduced quantity from ${quantity} to maximum ${actualQuantity}`,
      )
    } else {
      status = "confirmed"
      this.performAction(
        `✅ Confirmed order ${orderNumber} for ${quantity} units of ${product.name} (ID: ${product.id}). Estimated delivery: ${estimatedDelivery.toLocaleDateString()}`,
      )
    }

    // Calculate cost
    const price = productInfo.price
    const discount = productInfo.currentDiscount
    const discountedPrice = price * (1 - discount / 100)
    const totalCost = discountedPrice * actualQuantity

    return {
      orderNumber,
      estimatedDelivery,
      status,
      actualQuantity,
      price,
      discount,
      totalCost,
    }
  }

  offerDiscount(product: { id: string; name: string }, discountPercentage: number, minimumOrderQuantity: number): void {
    const productInfo = this.supplierCatalog[product.id] || {
      price: 10,
      minOrderQuantity: 10,
      maxOrderQuantity: 1000,
      currentDiscount: 0,
      leadTime: this.leadTime,
    }

    productInfo.currentDiscount = discountPercentage
    this.supplierCatalog[product.id] = productInfo

    this.performAction(
      `Offering ${discountPercentage}% discount on ${product.name} (ID: ${product.id}) for orders of ${minimumOrderQuantity}+ units`,
    )
  }

  compareSuppliers(
    product: { id: string; name: string },
    suppliers: Array<{
      id: string
      price: number
      leadTime: number
      reliability: number
    }>,
  ): {
    bestSupplierId: string
    reason: string
  } {
    // Calculate a score for each supplier
    const scores = suppliers.map((supplier) => {
      // Normalize values (lower is better for price and lead time, higher is better for reliability)
      const priceScore = 100 - (supplier.price / Math.max(...suppliers.map((s) => s.price))) * 100
      const leadTimeScore = 100 - (supplier.leadTime / Math.max(...suppliers.map((s) => s.leadTime))) * 100
      const reliabilityScore = supplier.reliability

      // Weight the scores (adjust weights as needed)
      const weightedScore = priceScore * 0.4 + leadTimeScore * 0.3 + reliabilityScore * 0.3

      return {
        supplierId: supplier.id,
        score: weightedScore,
        price: supplier.price,
        leadTime: supplier.leadTime,
        reliability: supplier.reliability,
      }
    })

    // Find the best supplier
    scores.sort((a, b) => b.score - a.score)
    const bestSupplier = scores[0]

    // Determine the main reason for selection
    let reason = ""
    if (bestSupplier.price === Math.min(...suppliers.map((s) => s.price))) {
      reason = `lowest price ($${bestSupplier.price})`
    } else if (bestSupplier.leadTime === Math.min(...suppliers.map((s) => s.leadTime))) {
      reason = `fastest delivery (${bestSupplier.leadTime} days)`
    } else {
      reason = `highest reliability (${bestSupplier.reliability}%)`
    }

    this.performAction(
      `Selected supplier ${bestSupplier.supplierId} for ${product.name} (ID: ${product.id}) due to ${reason}`,
    )

    return {
      bestSupplierId: bestSupplier.supplierId,
      reason,
    }
  }

  updateDeliveryStatus(
    orderNumber: string,
    status: "processing" | "shipped" | "delivered" | "delayed",
    estimatedDelivery?: Date,
  ): void {
    let statusMessage = ""

    switch (status) {
      case "processing":
        statusMessage = `Order ${orderNumber} is being processed`
        break
      case "shipped":
        statusMessage = `Order ${orderNumber} has been shipped`
        break
      case "delivered":
        statusMessage = `Order ${orderNumber} has been delivered`
        break
      case "delayed":
        statusMessage = `Order ${orderNumber} is delayed. New estimated delivery: ${estimatedDelivery?.toLocaleDateString()}`
        break
    }

    this.performAction(statusMessage)
  }
}

// Pricing Agent
export class PricingAgent extends Agent {
  maxPriceAdjustment: number // percentage
  minMargin: number // percentage

  constructor() {
    super("Pricing Agent")
    this.maxPriceAdjustment = 20
    this.minMargin = 15
  }

  adjustPrice(product: {
    id: string
    name: string
    currentPrice: number
    costPrice: number
    stockStatus: "Critical" | "Low" | "Normal" | "Excess"
    salesVelocity: "Fast" | "Normal" | "Slow"
    daysInStock: number
  }): {
    newPrice: number
    adjustmentPercent: number
    reason: string
  } {
    const { id, name, currentPrice, costPrice, stockStatus, salesVelocity, daysInStock } = product

    let adjustmentFactor = 0
    let reason = ""

    // Calculate current margin
    const currentMargin = ((currentPrice - costPrice) / currentPrice) * 100

    // Determine adjustment based on stock status and sales velocity
    if (stockStatus === "Excess" && salesVelocity === "Slow") {
      // Significant price reduction for excess stock that's moving slowly
      adjustmentFactor = -1 * (Math.random() * (this.maxPriceAdjustment - 5) + 5)
      reason = `reduce excess inventory that's selling slowly (${daysInStock} days in stock)`
    } else if (stockStatus === "Excess") {
      // Moderate price reduction for excess stock
      adjustmentFactor = -1 * (Math.random() * (this.maxPriceAdjustment / 2) + 2)
      reason = `reduce excess inventory`
    } else if (stockStatus === "Critical" && salesVelocity === "Fast") {
      // Increase price for high-demand, low-stock items
      if (currentMargin > this.minMargin + 10) {
        adjustmentFactor = Math.random() * (this.maxPriceAdjustment / 2) + 5
        reason = `high demand with limited stock`
      }
    } else if (stockStatus === "Low" && salesVelocity === "Fast") {
      // Slight increase for low stock items
      if (currentMargin > this.minMargin + 5) {
        adjustmentFactor = Math.random() * (this.maxPriceAdjustment / 3) + 2
        reason = `increasing demand with decreasing stock`
      }
    } else if (salesVelocity === "Slow" && daysInStock > 30) {
      // Reduce price for items that have been in stock too long
      adjustmentFactor = -1 * (Math.random() * (this.maxPriceAdjustment / 3) + 3)
      reason = `item not selling (${daysInStock} days in stock)`
    }

    // Calculate new price
    const newPrice = currentPrice * (1 + adjustmentFactor / 100)

    // Ensure minimum margin is maintained
    const newMargin = ((newPrice - costPrice) / newPrice) * 100

    if (newMargin < this.minMargin) {
      // Adjust to maintain minimum margin
      const minPrice = costPrice / (1 - this.minMargin / 100)

      this.performAction(`Adjusted price of ${name} (ID: ${id}) to maintain minimum margin: $${minPrice.toFixed(2)}`)

      return {
        newPrice: minPrice,
        adjustmentPercent: ((minPrice - currentPrice) / currentPrice) * 100,
        reason: `maintain minimum profit margin of ${this.minMargin}%`,
      }
    }

    if (adjustmentFactor !== 0) {
      const direction = adjustmentFactor > 0 ? "increased" : "decreased"
      this.performAction(
        `${direction} price of ${name} (ID: ${id}) by ${Math.abs(adjustmentFactor).toFixed(1)}% to $${newPrice.toFixed(2)} to ${reason}`,
      )
    } else {
      this.performAction(`Maintained current price of ${name} (ID: ${id}) at $${currentPrice.toFixed(2)}`)
    }

    return {
      newPrice: Math.round(newPrice * 100) / 100, // Round to 2 decimal places
      adjustmentPercent: adjustmentFactor,
      reason: adjustmentFactor !== 0 ? reason : "price is optimal",
    }
  }

  bulkPriceAdjustment(
    category: string,
    products: Array<{
      id: string
      name: string
      currentPrice: number
      costPrice: number
      stockStatus: "Critical" | "Low" | "Normal" | "Excess"
      salesVelocity: "Fast" | "Normal" | "Slow"
      daysInStock: number
    }>,
  ): Array<{
    id: string
    name: string
    oldPrice: number
    newPrice: number
    adjustmentPercent: number
  }> {
    const results = []

    for (const product of products) {
      const { newPrice, adjustmentPercent } = this.adjustPrice(product)

      results.push({
        id: product.id,
        name: product.name,
        oldPrice: product.currentPrice,
        newPrice,
        adjustmentPercent,
      })
    }

    this.performAction(`Applied bulk price adjustments to ${results.length} products in ${category} category`)

    return results
  }

  analyzePriceElasticity(
    product: { id: string; name: string },
    priceHistory: Array<{ price: number; sales: number }>,
  ): {
    elasticity: number
    optimalPrice: number
    isElastic: boolean
  } {
    if (priceHistory.length < 2) {
      this.performAction(`Insufficient data to analyze price elasticity for ${product.name} (ID: ${product.id})`)
      return { elasticity: 0, optimalPrice: priceHistory[0]?.price || 0, isElastic: false }
    }

    // Calculate price elasticity
    let totalElasticity = 0
    let validPairs = 0

    for (let i = 1; i < priceHistory.length; i++) {
      const prevPrice = priceHistory[i - 1].price
      const currentPrice = priceHistory[i].price
      const prevSales = priceHistory[i - 1].sales
      const currentSales = priceHistory[i].sales

      // Avoid division by zero
      if (prevPrice === currentPrice || prevSales === 0 || currentSales === 0) {
        continue
      }

      // Calculate percentage changes
      const priceChange = (currentPrice - prevPrice) / prevPrice
      const salesChange = (currentSales - prevSales) / prevSales

      // Calculate elasticity
      if (priceChange !== 0) {
        const pairElasticity = Math.abs(salesChange / priceChange)
        totalElasticity += pairElasticity
        validPairs++
      }
    }

    // Calculate average elasticity
    const elasticity = validPairs > 0 ? totalElasticity / validPairs : 0

    // Determine if product is elastic (elasticity > 1)
    const isElastic = elasticity > 1

    // Find optimal price (simple approach: price with highest sales)
    let optimalPrice = priceHistory[0].price
    let maxSales = priceHistory[0].sales

    for (let i = 1; i < priceHistory.length; i++) {
      if (priceHistory[i].sales > maxSales) {
        maxSales = priceHistory[i].sales
        optimalPrice = priceHistory[i].price
      }
    }

    this.performAction(
      `Analyzed price elasticity for ${product.name} (ID: ${product.id}): Elasticity = ${elasticity.toFixed(2)}, Optimal price = $${optimalPrice.toFixed(2)}`,
    )

    return {
      elasticity,
      optimalPrice,
      isElastic,
    }
  }

  recommendPromotions(
    products: Array<{
      id: string
      name: string
      category: string
      stockStatus: "Critical" | "Low" | "Normal" | "Excess"
      salesVelocity: "Fast" | "Normal" | "Slow"
      margin: number
    }>,
  ): Array<{
    id: string
    name: string
    promotionType: "discount" | "bundle" | "clearance" | "none"
    discountPercent?: number
    reason: string
  }> {
    const recommendations = []

    for (const product of products) {
      let promotionType: "discount" | "bundle" | "clearance" | "none" = "none"
      let discountPercent = 0
      let reason = ""

      if (product.stockStatus === "Excess" && product.salesVelocity === "Slow") {
        promotionType = "clearance"
        discountPercent = Math.min(30, product.margin * 0.7) // Up to 30% discount, but preserve some margin
        reason = "Clear excess slow-moving inventory"
      } else if (product.stockStatus === "Excess") {
        promotionType = "discount"
        discountPercent = Math.min(15, product.margin * 0.5) // Up to 15% discount
        reason = "Reduce excess inventory"
      } else if (product.stockStatus === "Normal" && product.salesVelocity === "Slow") {
        promotionType = "bundle"
        reason = "Increase sales velocity through bundling"
      } else if (product.stockStatus === "Critical" || product.stockStatus === "Low") {
        promotionType = "none"
        reason = "Maintain price due to limited stock"
      }

      recommendations.push({
        id: product.id,
        name: product.name,
        promotionType,
        ...(discountPercent > 0 ? { discountPercent } : {}),
        reason,
      })
    }

    this.performAction(`Generated promotion recommendations for ${products.length} products`)

    return recommendations
  }
}

// Customer Agent (for recommendations and UI)
export class CustomerAgent extends Agent {
  constructor() {
    super("Customer Agent")
  }

  recommendProducts(
    customerPreferences: string[],
    purchaseHistory: string[],
    availableProducts: Array<{
      id: string
      name: string
      category: string
      tags: string[]
      inStock: boolean
      popularity: number
    }>,
  ): Array<{
    id: string
    name: string
    score: number
    reason: string
  }> {
    // Filter out of stock products
    const inStockProducts = availableProducts.filter((p) => p.inStock)

    // Score each product
    const scoredProducts = inStockProducts.map((product) => {
      let score = 0
      const reasons = []

      // Score based on preferences match
      const preferenceMatches = customerPreferences.filter(
        (pref) =>
          product.category.toLowerCase().includes(pref.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(pref.toLowerCase())),
      )

      if (preferenceMatches.length > 0) {
        score += preferenceMatches.length * 20
        reasons.push(`matches ${preferenceMatches.length} preferences`)
      }

      // Score based on purchase history
      const historyMatches = purchaseHistory.filter(
        (item) =>
          product.category.toLowerCase().includes(item.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(item.toLowerCase())),
      )

      if (historyMatches.length > 0) {
        score += historyMatches.length * 15
        reasons.push(`similar to ${historyMatches.length} previous purchases`)
      }

      // Score based on popularity
      score += product.popularity * 5
      if (product.popularity > 7) {
        reasons.push("popular item")
      }

      return {
        id: product.id,
        name: product.name,
        score,
        reason: reasons.join(", "),
      }
    })

    // Sort by score and take top 5
    scoredProducts.sort((a, b) => b.score - a.score)
    const recommendations = scoredProducts.slice(0, 5)

    this.performAction(
      `Generated ${recommendations.length} product recommendations based on customer preferences and history`,
    )

    return recommendations
  }

  personalizeOffers(
    customerId: string,
    customerSegment: string,
    availableOffers: Array<{
      id: string
      name: string
      discount: number
      applicableSegments: string[]
    }>,
  ): Array<{
    id: string
    name: string
    discount: number
    isPersonalized: boolean
  }> {
    // Filter offers applicable to this customer segment
    const applicableOffers = availableOffers.filter(
      (offer) => offer.applicableSegments.includes(customerSegment) || offer.applicableSegments.includes("all"),
    )

    // Mark offers as personalized
    const personalizedOffers = applicableOffers.map((offer) => ({
      id: offer.id,
      name: offer.name,
      discount: offer.discount,
      isPersonalized: offer.applicableSegments.includes(customerSegment),
    }))

    this.performAction(
      `Personalized ${personalizedOffers.length} offers for customer ${customerId} (${customerSegment} segment)`,
    )

    return personalizedOffers
  }

  trackBrowsingBehavior(
    customerId: string,
    browsingData: Array<{
      productId: string
      timeSpent: number
      addedToCart: boolean
      purchased: boolean
    }>,
  ): {
    interestedCategories: string[]
    potentialPurchases: string[]
    abandonedCarts: string[]
  } {
    // Simplified analysis
    const potentialPurchases = browsingData
      .filter((item) => item.timeSpent > 60 && !item.purchased)
      .map((item) => item.productId)

    const abandonedCarts = browsingData
      .filter((item) => item.addedToCart && !item.purchased)
      .map((item) => item.productId)

    // Dummy categories (in a real system, we'd look up the categories)
    const interestedCategories = ["Electronics", "Clothing"]

    this.performAction(
      `Analyzed browsing behavior for customer ${customerId}: ${potentialPurchases.length} potential purchases, ${abandonedCarts.length} abandoned cart items`,
    )

    return {
      interestedCategories,
      potentialPurchases,
      abandonedCarts,
    }
  }
}

// Coordinator Agent
export class CoordinatorAgent extends Agent {
  optimizationPriority: "balanced" | "profit" | "customer"
  decisionAuthority: "full" | "approval" | "advisory"

  constructor() {
    super("Coordinator Agent")
    this.optimizationPriority = "balanced"
    this.decisionAuthority = "full"
  }

  coordinateAgents(agents: Agent[]): void {
    this.performAction(`Coordinating actions between ${agents.length} agents`)

    // Simplified coordination logic
    agents.forEach((agent) => {
      this.sendMessage(agent, "Coordination update: optimize for current system state")
    })
  }

  optimizeSystemWide(
    inventoryData: Record<string, { stock: number; capacity: number }>,
    salesData: Record<string, number>,
    forecastData: Record<string, number>,
    supplierData: Record<string, { leadTime: number; reliability: number }>,
  ): {
    inventoryRecommendations: Record<string, { action: "increase" | "decrease" | "maintain"; amount: number }>
    pricingRecommendations: Record<string, { action: "increase" | "decrease" | "maintain"; percent: number }>
    supplierRecommendations: Record<string, { action: "change" | "maintain"; supplierId?: string }>
    systemEfficiency: number
  } {
    // Simplified optimization logic
    const inventoryRecommendations: Record<string, { action: "increase" | "decrease" | "maintain"; amount: number }> =
      {}
    const pricingRecommendations: Record<string, { action: "increase" | "decrease" | "maintain"; percent: number }> = {}
    const supplierRecommendations: Record<string, { action: "change" | "maintain"; supplierId?: string }> = {}

    // Process each product
    for (const productId in inventoryData) {
      const inventory = inventoryData[productId]
      const sales = salesData[productId] || 0
      const forecast = forecastData[productId] || sales

      // Inventory recommendations
      const stockRatio = inventory.stock / inventory.capacity
      const forecastRatio = forecast / inventory.capacity

      if (stockRatio < 0.2 && forecastRatio > stockRatio) {
        // Low stock with increasing demand
        inventoryRecommendations[productId] = {
          action: "increase",
          amount: Math.min(inventory.capacity - inventory.stock, forecast * 2),
        }
      } else if (stockRatio > 0.8 && forecastRatio < stockRatio / 2) {
        // High stock with decreasing demand
        inventoryRecommendations[productId] = {
          action: "decrease",
          amount: Math.floor(inventory.stock * 0.3),
        }
      } else {
        inventoryRecommendations[productId] = { action: "maintain", amount: 0 }
      }

      // Pricing recommendations
      if (stockRatio > 0.7 && sales < forecast * 0.7) {
        // High stock, low sales - decrease price
        pricingRecommendations[productId] = { action: "decrease", percent: 10 }
      } else if (stockRatio < 0.3 && sales > forecast * 1.2) {
        // Low stock, high sales - increase price
        pricingRecommendations[productId] = { action: "increase", percent: 5 }
      } else {
        pricingRecommendations[productId] = { action: "maintain", percent: 0 }
      }

      // Supplier recommendations
      // In a real system, we'd compare suppliers
      supplierRecommendations[productId] = { action: "maintain" }
    }

    // Calculate system efficiency (simplified)
    const inventoryEfficiency =
      Object.values(inventoryData).reduce((sum, inv) => sum + inv.stock / inv.capacity, 0) /
      Object.keys(inventoryData).length

    const salesEfficiency =
      Object.keys(salesData).reduce((sum, id) => sum + salesData[id] / (forecastData[id] || salesData[id]), 0) /
      Object.keys(salesData).length

    const systemEfficiency = (inventoryEfficiency * 0.5 + salesEfficiency * 0.5) * 100

    this.performAction(
      `Performed system-wide optimization with ${this.optimizationPriority} priority. System efficiency: ${systemEfficiency.toFixed(1)}%`,
    )

    return {
      inventoryRecommendations,
      pricingRecommendations,
      supplierRecommendations,
      systemEfficiency,
    }
  }

  generateReport(): string {
    const report = `System Status Report - ${new Date().toLocaleString()}
- Optimization Priority: ${this.optimizationPriority}
- Overall System Efficiency: 94%
- Pending Actions: 12
- Completed Actions: 87
- Alerts: 3`

    this.performAction("Generated system status report")

    return report
  }

  handleExceptions(
    exceptions: Array<{
      agentName: string
      exceptionType: "stockout" | "delivery_delay" | "price_war" | "demand_spike"
      productId: string
      severity: "low" | "medium" | "high"
    }>,
  ): Array<{
    agentName: string
    action: string
    priority: "low" | "medium" | "high"
  }> {
    const actions = []

    for (const exception of exceptions) {
      let action = ""

      switch (exception.exceptionType) {
        case "stockout":
          action = `Expedite emergency order for product ${exception.productId}`
          break
        case "delivery_delay":
          action = `Find alternative supplier for product ${exception.productId}`
          break
        case "price_war":
          action = `Adjust pricing strategy for product ${exception.productId} to maintain competitiveness`
          break
        case "demand_spike":
          action = `Reallocate inventory for product ${exception.productId} from other locations`
          break
      }

      actions.push({
        agentName: exception.agentName,
        action,
        priority: exception.severity,
      })
    }

    this.performAction(`Handled ${exceptions.length} exceptions with ${actions.length} corrective actions`)

    return actions
  }
}

// Create a multi-agent system
export function createMultiAgentSystem() {
  const forecastAgent = new ForecastAgent()
  const storeAgent1 = new StoreAgent("Store-001")
  const storeAgent2 = new StoreAgent("Store-002")
  const warehouseAgent = new WarehouseAgent("Warehouse-Main")
  const supplierAgent = new SupplierAgent("Supplier-XYZ")
  const pricingAgent = new PricingAgent()
  const customerAgent = new CustomerAgent()
  const coordinatorAgent = new CoordinatorAgent()

  const agents = {
    forecastAgent,
    storeAgent1,
    storeAgent2,
    warehouseAgent,
    supplierAgent,
    pricingAgent,
    customerAgent,
    coordinatorAgent,
  }

  return agents
}

// Example product data
export const exampleProducts = [
  {
    id: "101",
    name: "Shampoo",
    category: "Personal Care",
    pastSales: [40, 50, 60, 70],
    currentStock: 4,
    capacity: 100,
    costPrice: 2.5,
    currentPrice: 5.99,
    stockStatus: "Critical" as const,
    salesVelocity: "Fast" as const,
    daysInStock: 5,
  },
  {
    id: "102",
    name: "T-shirt",
    category: "Clothing",
    pastSales: [30, 25, 20, 15],
    currentStock: 85,
    capacity: 100,
    costPrice: 8.0,
    currentPrice: 19.99,
    stockStatus: "Excess" as const,
    salesVelocity: "Slow" as const,
    daysInStock: 45,
  },
  {
    id: "103",
    name: "Cold Drinks",
    category: "Beverages",
    pastSales: [100, 120, 150, 200],
    currentStock: 50,
    capacity: 200,
    costPrice: 0.75,
    currentPrice: 1.99,
    stockStatus: "Low" as const,
    salesVelocity: "Fast" as const,
    daysInStock: 3,
  },
]

// Run a simulation step with detailed examples
export function runDetailedSimulation() {
  const agents = createMultiAgentSystem()
  const results = {
    forecastResults: {},
    storeResults: {},
    warehouseResults: {},
    supplierResults: {},
    pricingResults: {},
    customerResults: {},
    coordinatorResults: {},
  }

  // Forecast Agent Example
  const shampooForecast = agents.forecastAgent.predictDemand("101", "Shampoo", [40, 50, 60, 70])
  results.forecastResults["shampoo"] = shampooForecast

  // Store Agent Example
  const shampooInventory = agents.storeAgent1.checkInventory({
    id: "101",
    name: "Shampoo",
    currentStock: 4,
    capacity: 100,
    predictedDemand: shampooForecast.forecast,
  })
  results.storeResults["shampoo"] = shampooInventory

  // If stock is low, request restock
  if (shampooInventory.restockNeeded) {
    agents.storeAgent1.requestRestock(
      agents.warehouseAgent,
      { id: "101", name: "Shampoo" },
      shampooInventory.restockAmount,
    )

    // Warehouse checks stock and fulfills request
    const warehouseStock = agents.warehouseAgent.checkStock("101", "Shampoo")
    results.warehouseResults["shampooStock"] = warehouseStock

    // Warehouse fulfills request
    const fulfillment = agents.warehouseAgent.fulfillStoreRequest(
      agents.storeAgent1,
      { id: "101", name: "Shampoo" },
      shampooInventory.restockAmount,
    )
    results.warehouseResults["shampooFulfillment"] = fulfillment

    // If warehouse stock is low after fulfillment, order from supplier
    if (fulfillment.status !== "complete") {
      agents.warehouseAgent.requestFromSupplier(
        agents.supplierAgent,
        { id: "101", name: "Shampoo" },
        shampooInventory.restockAmount - fulfillment.fulfilled,
      )

      // Supplier processes order
      const orderResult = agents.supplierAgent.processOrder(
        { id: "101", name: "Shampoo" },
        shampooInventory.restockAmount - fulfillment.fulfilled,
      )
      results.supplierResults["shampooOrder"] = orderResult
    }
  }

  // Pricing agent adjusts prices based on stock status
  const shampooPrice = agents.pricingAgent.adjustPrice({
    id: "101",
    name: "Shampoo",
    currentPrice: 5.99,
    costPrice: 2.5,
    stockStatus: "Critical",
    salesVelocity: "Fast",
    daysInStock: 5,
  })
  results.pricingResults["shampoo"] = shampooPrice

  // T-shirt example (slow-moving excess inventory)
  const tshirtPrice = agents.pricingAgent.adjustPrice({
    id: "102",
    name: "T-shirt",
    currentPrice: 19.99,
    costPrice: 8.0,
    stockStatus: "Excess",
    salesVelocity: "Slow",
    daysInStock: 45,
  })
  results.pricingResults["tshirt"] = tshirtPrice

  // Customer Agent recommendations
  const customerRecommendations = agents.customerAgent.recommendProducts(
    ["shampoo", "personal care"],
    ["soap", "toothpaste"],
    [
      { id: "101", name: "Shampoo", category: "Personal Care", tags: ["hair", "bath"], inStock: true, popularity: 8 },
      {
        id: "104",
        name: "Conditioner",
        category: "Personal Care",
        tags: ["hair", "bath"],
        inStock: true,
        popularity: 7,
      },
      { id: "105", name: "Body Wash", category: "Personal Care", tags: ["bath", "soap"], inStock: true, popularity: 9 },
    ],
  )
  results.customerResults["recommendations"] = customerRecommendations

  // Coordinator optimizes the system
  const systemOptimization = agents.coordinatorAgent.optimizeSystemWide(
    {
      "101": { stock: 4, capacity: 100 },
      "102": { stock: 85, capacity: 100 },
      "103": { stock: 50, capacity: 200 },
    },
    {
      "101": 70,
      "102": 15,
      "103": 200,
    },
    {
      "101": 80,
      "102": 10,
      "103": 250,
    },
    {
      "101": { leadTime: 2, reliability: 95 },
      "102": { leadTime: 3, reliability: 90 },
      "103": { leadTime: 1, reliability: 98 },
    },
  )
  results.coordinatorResults["systemOptimization"] = systemOptimization

  return results
}

export function runSimulationStep(agents: {
  forecastAgent: ForecastAgent
  storeAgent1: StoreAgent
  storeAgent2: StoreAgent
  warehouseAgent: WarehouseAgent
  supplierAgent: SupplierAgent
  pricingAgent: PricingAgent
  customerAgent: CustomerAgent
  coordinatorAgent: CoordinatorAgent
}) {
  // Basic simulation logic - this will be expanded
  const productId = "101"
  const productName = "Shampoo"
  const pastSales = [40, 50, 60, 70]
  const currentStock = 4
  const capacity = 100

  // 1. Forecast demand
  const forecast = agents.forecastAgent.predictDemand(productId, productName, pastSales)

  // 2. Store agent checks inventory
  const inventoryStatus = agents.storeAgent1.checkInventory({
    id: productId,
    name: productName,
    currentStock: currentStock,
    capacity: capacity,
    predictedDemand: forecast.forecast,
  })

  // 3. If restock is needed, request it from the warehouse
  if (inventoryStatus.restockNeeded) {
    agents.storeAgent1.requestRestock(
      agents.warehouseAgent,
      { id: productId, name: productName },
      inventoryStatus.restockAmount,
    )
  }

  // 4. Pricing agent adjusts price (simplified)
  const priceAdjustment = agents.pricingAgent.adjustPrice({
    id: productId,
    name: productName,
    currentPrice: 5.99,
    costPrice: 2.5,
    stockStatus: inventoryStatus.status,
    salesVelocity: "Fast", // Simplified
    daysInStock: 5, // Simplified
  })

  return {
    forecast,
    inventoryStatus,
    priceAdjustment,
  }
}

