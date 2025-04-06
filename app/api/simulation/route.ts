import { NextResponse } from "next/server"
import { createMultiAgentSystem, runSimulationStep } from "@/lib/agents"

export async function GET() {
  const agents = createMultiAgentSystem()
  const simulationResult = runSimulationStep(agents)

  return NextResponse.json({
    success: true,
    data: simulationResult,
    agents: {
      forecastAgent: {
        name: agents.forecastAgent.name,
        status: agents.forecastAgent.status,
        lastAction: agents.forecastAgent.lastAction,
        lastActionTime: agents.forecastAgent.lastActionTime,
      },
      storeAgent1: {
        name: agents.storeAgent1.name,
        status: agents.storeAgent1.status,
        lastAction: agents.storeAgent1.lastAction,
        lastActionTime: agents.storeAgent1.lastActionTime,
      },
      warehouseAgent: {
        name: agents.warehouseAgent.name,
        status: agents.warehouseAgent.status,
        lastAction: agents.warehouseAgent.lastAction,
        lastActionTime: agents.warehouseAgent.lastActionTime,
      },
      supplierAgent: {
        name: agents.supplierAgent.name,
        status: agents.supplierAgent.status,
        lastAction: agents.supplierAgent.lastAction,
        lastActionTime: agents.supplierAgent.lastActionTime,
      },
      pricingAgent: {
        name: agents.pricingAgent.name,
        status: agents.pricingAgent.status,
        lastAction: agents.pricingAgent.lastAction,
        lastActionTime: agents.pricingAgent.lastActionTime,
      },
      coordinatorAgent: {
        name: agents.coordinatorAgent.name,
        status: agents.coordinatorAgent.status,
        lastAction: agents.coordinatorAgent.lastAction,
        lastActionTime: agents.coordinatorAgent.lastActionTime,
      },
    },
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const {
    simulationSpeed = 1,
    enableSeasonalDemand = true,
    enableSupplyDisruptions = false,
    enableCompetitorPrices = true,
    agentAutonomy = "full",
  } = body

  const agents = createMultiAgentSystem()

  // Configure agents based on settings
  if (agentAutonomy === "low") {
    agents.coordinatorAgent.decisionAuthority = "approval"
  } else if (agentAutonomy === "medium") {
    agents.coordinatorAgent.decisionAuthority = "advisory"
  } else {
    agents.coordinatorAgent.decisionAuthority = "full"
  }

  // Run multiple simulation steps based on speed
  const results = []
  for (let i = 0; i < simulationSpeed; i++) {
    results.push(runSimulationStep(agents))
  }

  return NextResponse.json({
    success: true,
    data: results,
    settings: {
      simulationSpeed,
      enableSeasonalDemand,
      enableSupplyDisruptions,
      enableCompetitorPrices,
      agentAutonomy,
    },
  })
}

