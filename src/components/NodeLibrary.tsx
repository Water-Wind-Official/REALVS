import React from 'react'
import { useVisualScriptingStore } from '../store/visualScriptingStore'
import { v4 as uuidv4 } from 'uuid'

const nodeTemplates = [
  {
    id: 'start',
    label: 'Start',
    category: 'control',
    inputs: [],
    outputs: ['flow'],
    description: 'Entry point of the script'
  },
  {
    id: 'variable',
    label: 'Variable',
    category: 'data',
    inputs: ['value'],
    outputs: ['variable'],
    description: 'Store a value in a variable'
  },
  {
    id: 'print',
    label: 'Print',
    category: 'output',
    inputs: ['value'],
    outputs: [],
    description: 'Output a value to console'
  },
  {
    id: 'input',
    label: 'Input',
    category: 'input',
    inputs: [],
    outputs: ['value'],
    description: 'Get user input'
  },
  {
    id: 'if',
    label: 'If Statement',
    category: 'control',
    inputs: ['condition'],
    outputs: ['true', 'false'],
    description: 'Conditional branching'
  },
  {
    id: 'loop',
    label: 'For Loop',
    category: 'control',
    inputs: ['start', 'end'],
    outputs: ['loop'],
    description: 'Iterate through a range'
  },
  {
    id: 'math-add',
    label: 'Add',
    category: 'data',
    inputs: ['a', 'b'],
    outputs: ['result'],
    description: 'Add two numbers'
  },
  {
    id: 'math-subtract',
    label: 'Subtract',
    category: 'data',
    inputs: ['a', 'b'],
    outputs: ['result'],
    description: 'Subtract two numbers'
  },
  {
    id: 'math-multiply',
    label: 'Multiply',
    category: 'data',
    inputs: ['a', 'b'],
    outputs: ['result'],
    description: 'Multiply two numbers'
  },
  {
    id: 'math-divide',
    label: 'Divide',
    category: 'data',
    inputs: ['a', 'b'],
    outputs: ['result'],
    description: 'Divide two numbers'
  },
  {
    id: 'compare',
    label: 'Compare',
    category: 'data',
    inputs: ['a', 'b'],
    outputs: ['result'],
    description: 'Compare two values'
  },
  {
    id: 'function',
    label: 'Function',
    category: 'control',
    inputs: ['parameters'],
    outputs: ['return'],
    description: 'Define a function'
  },
  {
    id: 'call',
    label: 'Function Call',
    category: 'control',
    inputs: ['function', 'parameters'],
    outputs: ['return'],
    description: 'Call a function'
  }
]

export function NodeLibrary() {
  const { addNode } = useVisualScriptingStore()

  const handleDragStart = (event: React.DragEvent, template: typeof nodeTemplates[0]) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(template))
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleAddNode = (template: typeof nodeTemplates[0]) => {
    const newNode = {
      id: uuidv4(),
      type: 'customNode',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        ...template,
        id: uuidv4()
      }
    }
    addNode(newNode)
  }

  const categories = ['control', 'data', 'input', 'output'] as const

  return (
    <div className="space-y-4">
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-sm font-medium text-gray-700 capitalize mb-2">
            {category}
          </h3>
          <div className="space-y-1">
            {nodeTemplates
              .filter(node => node.category === category)
              .map(template => (
                <div
                  key={template.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, template)}
                  onClick={() => handleAddNode(template)}
                  className="p-2 bg-gray-50 rounded-md cursor-move hover:bg-gray-100 transition-colors"
                  title={template.description}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      template.category === 'input' ? 'bg-green-500' : 
                      template.category === 'output' ? 'bg-amber-500' : 
                      template.category === 'control' ? 'bg-purple-500' : 'bg-cyan-500'
                    }`} />
                    <span className="text-sm font-medium">{template.label}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {template.inputs.length > 0 && (
                      <span>In: {template.inputs.join(', ')} </span>
                    )}
                    {template.outputs.length > 0 && (
                      <span>Out: {template.outputs.join(', ')}</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
