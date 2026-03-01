import React, { useCallback, useRef, useState } from 'react'
import ReactFlow, {
  Node,
  addEdge,
  Controls,
  MiniMap,
  Background,
  Connection,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  Handle,
  Position,
  useReactFlow,
  NodeTypes
} from 'reactflow'
import 'reactflow/dist/style.css'
import { NodeLibrary } from './NodeLibrary'
import { CodePreview } from './CodePreview'
import { useVisualScriptingStore } from '../store/visualScriptingStore'
import { generateCode } from '../utils/codeGenerator'
import { Download, Upload, Trash2, Copy, Edit3 } from 'lucide-react'

const nodeTypes: NodeTypes = {
  customNode: CustomNode,
}

function CustomNode({ data, selected }: { data: any; selected: boolean }) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const { removeNode, nodes, setNodes } = useVisualScriptingStore()
  
  const nodeColor = data.category === 'input' ? 'bg-green-500' : 
                   data.category === 'output' ? 'bg-amber-500' : 
                   data.category === 'control' ? 'bg-purple-500' : 
                   data.category === 'file' ? 'bg-blue-500' :
                   data.category === 'gui' ? 'bg-pink-500' :
                   data.category === 'utility' ? 'bg-indigo-500' :
                   data.category === 'network' ? 'bg-orange-500' : 'bg-cyan-500'

  const [value, setValue] = useState(data.value || '')

  const onDragStart = (event: React.DragEvent) => {
    const nodeData = {
      id: data.id,
      label: data.label,
      category: data.category
    }
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData))
    event.dataTransfer.effectAllowed = 'move'
  }

  const onContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu({ x: event.clientX, y: event.clientY })
  }

  const closeContextMenu = () => {
    setContextMenu(null)
  }

  const handleDelete = () => {
    removeNode(data.id)
    closeContextMenu()
  }

  const handleDuplicate = () => {
    const newNode = {
      ...data,
      id: `${data.id}-${Date.now()}`,
      position: {
        x: (data.position?.x || 0) + 50,
        y: (data.position?.y || 0) + 50
      }
    }
    setNodes([...nodes, newNode])
    closeContextMenu()
  }

  const handleQuickEdit = () => {
    if (data.label.includes('Value') || data.label === 'Position' || data.label === 'Size' || data.label === 'Color') {
      const input = document.querySelector(`[data-node-id="${data.id}"] input`) as HTMLInputElement
      if (input) {
        input.focus()
        input.select()
      }
    }
    closeContextMenu()
  }

  React.useEffect(() => {
    const handleClickOutside = () => closeContextMenu()
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const updateNodeValue = (newValue: string) => {
    setValue(newValue)
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
    if (data.label === 'Position') {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => updateNodeValue(e.target.value)}
          placeholder="x,y (e.g., 10,20)"
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
          onClick={(e) => e.stopPropagation()}
        />
      )
    }
    if (data.label === 'Size') {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => updateNodeValue(e.target.value)}
          placeholder="widthxheight (e.g., 200x100)"
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
          onClick={(e) => e.stopPropagation()}
        />
      )
    }
    if (data.label === 'Color') {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => updateNodeValue(e.target.value)}
          placeholder="red, #FF0000, etc."
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
          onClick={(e) => e.stopPropagation()}
        />
      )
    }
    return null
  }

  return (
    <>
      <div 
        className={`px-4 py-2 shadow-lg rounded-lg bg-white border-2 ${
          selected ? 'border-blue-500' : 'border-gray-200'
        } min-w-[150px] hover:shadow-xl transition-shadow cursor-move`}
        draggable
        onDragStart={onDragStart}
        onContextMenu={onContextMenu}
        data-node-id={data.id}
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

      {contextMenu && (
        <div
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[150px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            onClick={handleQuickEdit}
          >
            <Edit3 className="w-4 h-4" />
            Quick Edit
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            onClick={handleDuplicate}
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </>
  )
}

export function VisualScriptingEditor() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { getViewport } = useReactFlow()
  const { nodes, edges, language, setNodes, setEdges, setLanguage, clearCanvas } = useVisualScriptingStore()

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes)
      setNodes(updatedNodes)
    },
    [nodes, setNodes]
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(changes, edges)
      setEdges(updatedEdges)
    },
    [edges, setEdges]
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      console.log('Connecting:', connection)
      const newEdge = {
        ...connection,
        id: `edge-${Date.now()}`,
      }
      const updatedEdges = addEdge(newEdge, edges)
      setEdges(updatedEdges)
    },
    [edges, setEdges]
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

      const libraryBounds = event.currentTarget.getBoundingClientRect()
      const isDroppingOnLibrary = event.clientX < libraryBounds.left + 256

      if (isDroppingOnLibrary) {
        const nodeData = JSON.parse(type)
        if (nodeData.id && nodeData.id.startsWith('node-')) {
          setNodes((nds) => nds.filter(n => n.id !== nodeData.id))
          setEdges((eds) => eds.filter(e => e.source !== nodeData.id && e.target !== nodeData.id))
        }
        return
      }

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      if (!reactFlowBounds) return

      const { x: viewportX, y: viewportY, zoom: viewportZoom } = getViewport()

      const nodeTemplate = JSON.parse(type)
      
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

      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes, setEdges, getViewport]
  )

  const handleClearCanvas = useCallback(() => {
    clearCanvas()
  }, [clearCanvas])

  const handleExport = useCallback(() => {
    const data = {
      nodes: nodes,
      edges: edges
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'visual-script.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [nodes, edges])

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.nodes && data.edges) {
          setNodes(data.nodes)
          setEdges(data.edges)
        }
      } catch (error) {
        console.error('Failed to import file:', error)
      }
    }
    reader.readAsText(file)
  }, [setNodes, setEdges])

  const generatedCode = React.useMemo(() => {
    // Debug logging to see what we're getting
    console.log('Generated code memo:', { nodes, edges, language })
    
    // Safety check: ensure nodes and edges are arrays before generating code
    if (!Array.isArray(nodes) || !Array.isArray(edges)) {
      console.error('Invalid nodes/edges data:', { nodes, edges })
      return language === 'python' ? '# Error: Invalid node/edge data' : '// Error: Invalid node/edge data'
    }
    return generateCode(nodes, edges, language)
  }, [nodes, edges, language])

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Node Library</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NodeLibrary />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800">Visual Scripting Editor</h1>
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-1 rounded ${
                  language === 'python' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setLanguage('python')}
              >
                Python
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  language === 'csharp' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setLanguage('csharp')}
              >
                C#
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
              <Upload className="w-4 h-4" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
              onClick={handleClearCanvas}
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="flex-1" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>

          <div className="w-1/2 bg-white border-l border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Generated Code</h3>
            </div>
            <div className="h-full">
              <CodePreview code={generatedCode} language={language} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
