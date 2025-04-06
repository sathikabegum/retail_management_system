"use client"

import { useEffect, useRef } from "react"

export default function SimulationVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Define locations
    const locations = {
      supplier: { x: canvas.width * 0.1, y: canvas.height * 0.5 },
      warehouse: { x: canvas.width * 0.3, y: canvas.height * 0.5 },
      store1: { x: canvas.width * 0.7, y: canvas.height * 0.3 },
      store2: { x: canvas.width * 0.7, y: canvas.height * 0.5 },
      store3: { x: canvas.width * 0.7, y: canvas.height * 0.7 },
      forecastAgent: { x: canvas.width * 0.5, y: canvas.height * 0.15 },
      pricingAgent: { x: canvas.width * 0.9, y: canvas.height * 0.5 },
      coordinatorAgent: { x: canvas.width * 0.5, y: canvas.height * 0.85 },
    }

    // Define colors
    const colors = {
      supplier: "#8b5cf6",
      warehouse: "#f59e0b",
      store: "#10b981",
      forecastAgent: "#3b82f6",
      pricingAgent: "#ef4444",
      coordinatorAgent: "#6366f1",
      product: "#94a3b8",
      message: "#64748b",
      background: "#f8fafc",
    }

    // Define products in transit
    const products = []

    // Define messages
    const messages = []

    // Draw location
    const drawLocation = (x: number, y: number, label: string, color: string) => {
      ctx.beginPath()
      ctx.arc(x, y, 30, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      ctx.fillStyle = "#ffffff"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(label, x, y)
    }

    // Draw product
    const drawProduct = (x: number, y: number) => {
      ctx.beginPath()
      ctx.rect(x - 5, y - 5, 10, 10)
      ctx.fillStyle = colors.product
      ctx.fill()
    }

    // Draw message
    const drawMessage = (x: number, y: number) => {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = colors.message
      ctx.fill()
    }

    // Draw connection
    const drawConnection = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Create new product
    const createProduct = (from: keyof typeof locations, to: keyof typeof locations) => {
      const fromLoc = locations[from]
      const toLoc = locations[to]

      products.push({
        x: fromLoc.x,
        y: fromLoc.y,
        targetX: toLoc.x,
        targetY: toLoc.y,
        progress: 0,
      })
    }

    // Create new message
    const createMessage = (from: keyof typeof locations, to: keyof typeof locations) => {
      const fromLoc = locations[from]
      const toLoc = locations[to]

      messages.push({
        x: fromLoc.x,
        y: fromLoc.y,
        targetX: toLoc.x,
        targetY: toLoc.y,
        progress: 0,
      })
    }

    // Update simulation
    const updateSimulation = () => {
      // Update products
      for (let i = 0; i < products.length; i++) {
        const product = products[i]
        product.progress += 0.01

        if (product.progress >= 1) {
          products.splice(i, 1)
          i--
          continue
        }

        product.x = product.x + (product.targetX - product.x) * 0.01
        product.y = product.y + (product.targetY - product.y) * 0.01
      }

      // Update messages
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i]
        message.progress += 0.02

        if (message.progress >= 1) {
          messages.splice(i, 1)
          i--
          continue
        }

        message.x = message.x + (message.targetX - message.x) * 0.02
        message.y = message.y + (message.targetY - message.y) * 0.02
      }

      // Randomly create new products and messages
      if (Math.random() < 0.02) {
        const fromLocations = ["supplier", "warehouse"] as const
        const toLocations = ["warehouse", "store1", "store2", "store3"] as const

        const from = fromLocations[Math.floor(Math.random() * fromLocations.length)]
        let to

        if (from === "supplier") {
          to = "warehouse"
        } else {
          to = toLocations[Math.floor(Math.random() * (toLocations.length - 1)) + 1]
        }

        createProduct(from, to)
      }

      if (Math.random() < 0.03) {
        const agentLocations = ["forecastAgent", "pricingAgent", "coordinatorAgent"] as const
        const otherLocations = ["supplier", "warehouse", "store1", "store2", "store3"] as const

        if (Math.random() < 0.5) {
          const from = agentLocations[Math.floor(Math.random() * agentLocations.length)]
          const to = otherLocations[Math.floor(Math.random() * otherLocations.length)]
          createMessage(from, to)
        } else {
          const from = otherLocations[Math.floor(Math.random() * otherLocations.length)]
          const to = agentLocations[Math.floor(Math.random() * agentLocations.length)]
          createMessage(from, to)
        }
      }
    }

    // Draw simulation
    const drawSimulation = () => {
      // Clear canvas
      ctx.fillStyle = colors.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      drawConnection(locations.supplier.x, locations.supplier.y, locations.warehouse.x, locations.warehouse.y)
      drawConnection(locations.warehouse.x, locations.warehouse.y, locations.store1.x, locations.store1.y)
      drawConnection(locations.warehouse.x, locations.warehouse.y, locations.store2.x, locations.store2.y)
      drawConnection(locations.warehouse.x, locations.warehouse.y, locations.store3.x, locations.store3.y)

      drawConnection(
        locations.forecastAgent.x,
        locations.forecastAgent.y,
        locations.coordinatorAgent.x,
        locations.coordinatorAgent.y,
      )
      drawConnection(
        locations.pricingAgent.x,
        locations.pricingAgent.y,
        locations.coordinatorAgent.x,
        locations.coordinatorAgent.y,
      )

      drawConnection(locations.forecastAgent.x, locations.forecastAgent.y, locations.warehouse.x, locations.warehouse.y)
      drawConnection(locations.pricingAgent.x, locations.pricingAgent.y, locations.store1.x, locations.store1.y)
      drawConnection(locations.pricingAgent.x, locations.pricingAgent.y, locations.store2.x, locations.store2.y)
      drawConnection(locations.pricingAgent.x, locations.pricingAgent.y, locations.store3.x, locations.store3.y)
      drawConnection(
        locations.coordinatorAgent.x,
        locations.coordinatorAgent.y,
        locations.warehouse.x,
        locations.warehouse.y,
      )

      // Draw products
      for (const product of products) {
        drawProduct(product.x, product.y)
      }

      // Draw messages
      for (const message of messages) {
        drawMessage(message.x, message.y)
      }

      // Draw locations
      drawLocation(locations.supplier.x, locations.supplier.y, "Supplier", colors.supplier)
      drawLocation(locations.warehouse.x, locations.warehouse.y, "Warehouse", colors.warehouse)
      drawLocation(locations.store1.x, locations.store1.y, "Store 1", colors.store)
      drawLocation(locations.store2.x, locations.store2.y, "Store 2", colors.store)
      drawLocation(locations.store3.x, locations.store3.y, "Store 3", colors.store)
      drawLocation(locations.forecastAgent.x, locations.forecastAgent.y, "Forecast", colors.forecastAgent)
      drawLocation(locations.pricingAgent.x, locations.pricingAgent.y, "Pricing", colors.pricingAgent)
      drawLocation(locations.coordinatorAgent.x, locations.coordinatorAgent.y, "Coordinator", colors.coordinatorAgent)
    }

    // Animation loop
    const animate = () => {
      updateSimulation()
      drawSimulation()
      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>
}

