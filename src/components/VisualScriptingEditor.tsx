import React, { useCallback, useMemo, useRef } from 'react'
import ReactFlow, {
  Node,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  NodeTypes,
  Handle,
  Position,
  useReactFlow,
} from 'reactflow'
import { Trash2, Download, Upload } from 'lucide-react'
import 'reactflow/dist/style.css'

import { NodeLibrary } from './NodeLibrary'
import { CodePreview } from './CodePreview'
import { useVisualScriptingStore } from '../store/visualScriptingStore'
import { generateCode } from '../utils/codeGenerator'

const nodeTypes: NodeTypes = {
  customNode: CustomNode,
}

function CustomNode({ data, selected }: { data: any; selected: boolean }) {
  const nodeColor = data.category === 'input' ? 'bg-green-500' : 
                   data.category === 'output' ? 'bg-amber-500' : 
                   data.category === 'control' ? 'bg-purple-500' : 
                   data.category === 'file' ? 'bg-blue-500' :
                   data.category === 'gui' ? 'bg-pink-500' :
                   data.category === 'utility' ? 'bg-indigo-500' :
                   data.category === 'network' ? 'bg-orange-500' : 'bg-cyan-500'

  const [value, setValue] = React.useState(data.value || '')

  const onDragStart = (event: React.DragEvent) => {
    // Store the node data for potential deletion
    const nodeData = {
      id: data.id,
      label: data.label,
      category: data.category
    }
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData))
    event.dataTransfer.effectAllowed = 'move'
  }

  const updateNodeValue = (newValue: string) => {
    setValue(newValue)
    // Update the node data in the store
    const { nodes, setNodes } = useVisualScriptingStore.getState()
    const updatedNodes = nodes.map(node => 
      node.id === data.id ? { ...node, data: { ...node.data, value: newValue } } : node
    )
    setNodes(updatedNodes)
  }

  const renderValueInput = () => {
    if (data.label === 'String Value') {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => updateNodeValue(e.target.value)}
          placeholder="Enter text..."
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
          onClick={(e) => e.stopPropagation()}
        />
      )
    }
    if (data.label === 'Number Value') {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => updateNodeValue(e.target.value)}
          placeholder="Enter number..."
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
          onClick={(e) => e.stopPropagation()}
        />
      )
    }
    if (data.label === 'Boolean Value') {
      return (
        <select
          value={value}
          onChange={(e) => updateNodeValue(e.target.value)}
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="">Select...</option>
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
      )
    }
    return null
  }

  return (
    <div 
      className={`px-4 py-2 shadow-lg rounded-lg bg-white border-2 ${
        selected ? 'border-blue-500' : 'border-gray-200'
      } min-w-[150px] hover:shadow-xl transition-shadow cursor-move`}
      draggable
      onDragStart={onDragStart}
    >
      {data.inputs && data.inputs.length > 0 && (
        <div className="absolute -left-1 top-0 flex flex-col gap-2">
          {data.inputs.map((input: string, i: number) => (
            <Handle
              key={`input-${i}`}
              type="target"
              position={Position.Left}
              id={input}
              className="node-input"
              style={{ top: `${25 + i * 20}px` }}
            />
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${nodeColor}`} />
        <span className="text-sm font-medium">{data.label}</span>
      </div>
      
      {/* Value input for value nodes */}
      {renderValueInput()}
      
      {data.inputs && data.inputs.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          {data.inputs.map((input: string, i: number) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>{input}</span>
            </div>
          ))}
        </div>
      )}
      {data.outputs && data.outputs.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          {data.outputs.map((output: string, i: number) => (
            <div key={i} className="flex items-center gap-1 justify-end">
              <span>{output}</span>
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
            </div>
          ))}
        </div>
      )}
      
      {data.outputs && data.outputs.length > 0 && (
        <div className="absolute -right-1 top-0 flex flex-col gap-2">
          {data.outputs.map((output: string, i: number) => (
            <Handle
              key={`output-${i}`}
              type="source"
              position={Position.Right}
              id={output}
              className="node-output"
              style={{ top: `${25 + i * 20}px` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function VisualScriptingEditor() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { nodes, edges, language, setNodes, setEdges, setLanguage, clearCanvas } = useVisualScriptingStore()
  const [localNodes, setLocalNodes, onNodesChange] = useNodesState(nodes)
  const [localEdges, setLocalEdges, onEdgesChange] = useEdgesState(edges)
  const { getViewport } = useReactFlow()

  const onConnect = useCallback(
    (params: Connection) => setLocalEdges((eds) => addEdge(params, eds)),
    [setLocalEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')

      if (typeof type === 'undefined' || !type) {
        return
      }

      // Check if dropping on the library area (left sidebar)
      const libraryBounds = event.currentTarget.getBoundingClientRect()
      const isDroppingOnLibrary = event.clientX < libraryBounds.left + 256 // 256px is library width

      if (isDroppingOnLibrary) {
        // This is a node being dragged to the library for deletion
        const nodeData = JSON.parse(type)
        if (nodeData.id && nodeData.id.startsWith('node-')) {
          // Remove the node from the canvas
          setLocalNodes((nds) => nds.filter(n => n.id !== nodeData.id))
          setLocalEdges((eds) => eds.filter(e => e.source !== nodeData.id && e.target !== nodeData.id))
        }
        return
      }

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      if (!reactFlowBounds) return

      // Get current viewport transformation
      const { x: viewportX, y: viewportY, zoom: viewportZoom } = getViewport()

      const nodeTemplate = JSON.parse(type)
      
      // Calculate position accounting for viewport transformation
      const position = {
        x: (event.clientX - reactFlowBounds.left - viewportX) / viewportZoom - 75,
        y: (event.clientY - reactFlowBounds.top - viewportY) / viewportZoom - 25,
      }

      const newNode: Node = {
        id: `${nodeTemplate.id}-${Date.now()}`,
        type: 'customNode',
        position,
        data: {
          ...nodeTemplate,
          id: `${nodeTemplate.id}-${Date.now()}`
        },
      }

      setLocalNodes((nds) => nds.concat(newNode))
    },
    [setLocalNodes, setLocalEdges, getViewport]
  )

  const handleClearCanvas = useCallback(() => {
    clearCanvas()
    setLocalNodes([])
    setLocalEdges([])
  }, [clearCanvas, setLocalNodes, setLocalEdges])

  const handleExport = useCallback(() => {
    const data = {
      nodes: localNodes,
      edges: localEdges,
      language
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'visual-script.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [localNodes, localEdges, language])

  const handleImport = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string)
            setLocalNodes(data.nodes || [])
            setLocalEdges(data.edges || [])
            if (data.language) {
              setLanguage(data.language)
            }
          } catch (error) {
            console.error('Failed to import file:', error)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }, [setLocalNodes, setLocalEdges, setLanguage])

  const generatedCode = useMemo(() => {
    return generateCode(localNodes, localEdges, language)
  }, [localNodes, localEdges, language])

  React.useEffect(() => {
    setNodes(localNodes)
    setEdges(localEdges)
  }, [localNodes, localEdges, setNodes, setEdges])

  return (
    <div className="h-screen flex">
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Node Library</h2>
        <NodeLibrary />
      </div>
      
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={localNodes}
          edges={localEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={() => console.log('React Flow initialized')}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 flex items-center gap-2">
          <button
            onClick={handleImport}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Import project"
          >
            <Upload className="w-4 h-4" />
          </button>
          <button
            onClick={handleExport}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Export project"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleClearCanvas}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors text-red-500"
            title="Clear canvas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="border-l border-gray-300 h-6 mx-2" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'python' | 'csharp')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="python">Python</option>
            <option value="csharp">C#</option>
          </select>
        </div>
      </div>
      
      <div className="w-96 bg-gray-900 text-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Generated Code</h2>
        <CodePreview code={generatedCode} language={language} />
      </div>
    </div>
  )
}
