export default function SimpleGraph({ graph }) {
  if (!graph) {
    return <div className="text-center text-gray-500">No graph data available</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Story Graph</h3>
      
      <div className="flex flex-wrap gap-4 justify-center">
        {graph.nodes && graph.nodes.map(node => (
          <div
            key={node.id}
            className={`px-4 py-2 rounded-lg border-2 font-semibold text-center min-w-24 ${
              node.isTerminal
                ? 'bg-red-100 border-red-400 text-red-800'
                : node.isMainTrunk
                ? 'bg-blue-100 border-blue-400 text-blue-800'
                : 'bg-gray-100 border-gray-400 text-gray-800'
            }`}
          >
            Page {node.id}
          </div>
        ))}
      </div>

      {/* Show connections as text for simplicity */}
      {graph.edges && graph.edges.length > 0 && (
        <div className="mt-6 text-sm text-gray-600">
          <h4 className="font-semibold text-gray-700 mb-2">Connections:</h4>
          <ul className="space-y-1">
            {graph.edges.map((edge, idx) => (
              <li key={idx}>
                Page {edge.source} → Page {edge.target}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
