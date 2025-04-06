"use client"

import { useEffect, useRef } from "react"
import { getAgentNetwork } from "@/lib/data"
import * as d3 from "d3"

export default function AgentNetworkVisualization() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const data = getAgentNetwork()

    // Clear any existing visualization
    d3.select(svgRef.current).selectAll("*").remove()

    const width = 600
    const height = 400

    // Create a force simulation
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink(data.links)
          .id((d) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Create the SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;")

    // Define arrow markers for the links
    svg
      .append("defs")
      .selectAll("marker")
      .data(["end"])
      .join("marker")
      .attr("id", (d) => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#999")
      .attr("d", "M0,-5L10,0L0,5")

    // Create the links
    const link = svg
      .append("g")
      .selectAll("path")
      .data(data.links)
      .join("path")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value))
      .attr("marker-end", "url(#arrow-end)")

    // Create the nodes
    const node = svg.append("g").selectAll("g").data(data.nodes).join("g").call(drag(simulation))

    // Add circles to the nodes
    node
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d) => d3.schemeCategory10[d.group % 10])

    // Add labels to the nodes
    node
      .append("text")
      .attr("x", 12)
      .attr("y", 3)
      .text((d) => d.name)
      .attr("font-size", "10px")
      .attr("font-family", "sans-serif")

    // Update positions on each tick of the simulation
    simulation.on("tick", () => {
      link.attr("d", linkArc)
      node.attr("transform", (d) => `translate(${d.x},${d.y})`)
    })

    // Drag functionality
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
    }

    // Create curved links
    function linkArc(d) {
      const dx = d.target.x - d.source.x
      const dy = d.target.y - d.source.y
      const dr = Math.sqrt(dx * dx + dy * dy)
      return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`
    }

    // Cleanup function
    return () => {
      simulation.stop()
    }
  }, [])

  return (
    <div className="w-full flex justify-center p-4 bg-white rounded-lg shadow">
      <svg ref={svgRef} className="border border-gray-200 rounded"></svg>
    </div>
  )
}

