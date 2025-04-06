"use client"

import { useEffect, useRef, useState } from "react"

export default function AgentCommunication() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [aframeLoaded, setAframeLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Dynamically import A-Frame
    const loadAframe = async () => {
      try {
        // First load A-Frame
        await import("aframe")

        // Wait a moment to ensure A-Frame is initialized
        setTimeout(async () => {
          // Then load the force-graph component
          await import("aframe-forcegraph-component")
          setAframeLoaded(true)
        }, 100)
      } catch (error) {
        console.error("Error loading A-Frame:", error)
      }
    }

    loadAframe()

    return () => {
      // Clean up A-Frame scene when component unmounts
      if (containerRef.current) {
        const scene = containerRef.current.querySelector("a-scene")
        if (scene) {
          scene.parentNode?.removeChild(scene)
        }
      }
    }
  }, [])

  // Sample data for the agent network
  const nodes = [
    { id: "forecast", name: "Forecast Agent", group: 1 },
    { id: "store", name: "Store Agent", group: 2 },
    { id: "warehouse", name: "Warehouse Agent", group: 3 },
    { id: "supplier", name: "Supplier Agent", group: 4 },
    { id: "pricing", name: "Pricing Agent", group: 5 },
  ]

  const links = [
    { source: "forecast", target: "store", value: 5 },
    { source: "forecast", target: "warehouse", value: 7 },
    { source: "store", target: "warehouse", value: 9 },
    { source: "warehouse", target: "supplier", value: 6 },
    { source: "pricing", target: "store", value: 4 },
    { source: "pricing", target: "forecast", value: 3 },
    { source: "supplier", target: "warehouse", value: 8 },
  ]

  const graphData = {
    nodes,
    links,
  }

  if (!isClient) {
    return <div className="w-full h-full flex items-center justify-center">Loading agent network...</div>
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      {aframeLoaded ? (
        <a-scene embedded background="color: #f8fafc">
          <a-entity forcegraph="nodes: #nodes; links: #links" position="0 0 -15"></a-entity>
          <a-text id="nodes" value={JSON.stringify(nodes)} visible="false"></a-text>
          <a-text id="links" value={JSON.stringify(links)} visible="false"></a-text>
        </a-scene>
      ) : (
        <div className="w-full h-full flex items-center justify-center">Loading 3D visualization...</div>
      )}
    </div>
  )
}

