import React from 'react'
import { Trash2 } from 'lucide-react'
import { useVisualScriptingStore } from '../store/visualScriptingStore'
import { v4 as uuidv4 } from 'uuid'

const nodeTemplates = [
  {
    id: 'start',
    label: 'Start',
    category: 'control',
    inputs: [],
    outputs: ['flow'],
    description: 'Entry point of script'
  },
  {
    id: 'string-value',
    label: 'String Value',
    category: 'data',
    inputs: [],
    outputs: ['value'],
    description: 'Enter a text string'
  },
  {
    id: 'number-value',
    label: 'Number Value',
    category: 'data',
    inputs: [],
    outputs: ['value'],
    description: 'Enter a number'
  },
  {
    id: 'boolean-value',
    label: 'Boolean Value',
    category: 'data',
    inputs: [],
    outputs: ['value'],
    description: 'True or False'
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
    id: 'while-loop',
    label: 'While Loop',
    category: 'control',
    inputs: ['condition'],
    outputs: ['loop'],
    description: 'Loop while condition is true'
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
    id: 'math-power',
    label: 'Power',
    category: 'data',
    inputs: ['base', 'exponent'],
    outputs: ['result'],
    description: 'Raise to power'
  },
  {
    id: 'math-mod',
    label: 'Modulo',
    category: 'data',
    inputs: ['a', 'b'],
    outputs: ['result'],
    description: 'Get remainder'
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
    id: 'string-concat',
    label: 'Concatenate',
    category: 'data',
    inputs: ['a', 'b'],
    outputs: ['result'],
    description: 'Join two strings'
  },
  {
    id: 'string-length',
    label: 'String Length',
    category: 'data',
    inputs: ['text'],
    outputs: ['length'],
    description: 'Get string length'
  },
  {
    id: 'list-create',
    label: 'Create List',
    category: 'data',
    inputs: ['items'],
    outputs: ['list'],
    description: 'Create a list'
  },
  {
    id: 'list-append',
    label: 'Append to List',
    category: 'data',
    inputs: ['list', 'item'],
    outputs: ['list'],
    description: 'Add item to list'
  },
  {
    id: 'list-get',
    label: 'Get List Item',
    category: 'data',
    inputs: ['list', 'index'],
    outputs: ['item'],
    description: 'Get item by index'
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
  },
  {
    id: 'return',
    label: 'Return',
    category: 'control',
    inputs: ['value'],
    outputs: [],
    description: 'Return from function'
  },
  {
    id: 'try-catch',
    label: 'Try-Catch',
    category: 'control',
    inputs: ['try', 'catch'],
    outputs: ['flow'],
    description: 'Error handling'
  },
  {
    id: 'file-read',
    label: 'Read File',
    category: 'file',
    inputs: ['path'],
    outputs: ['content'],
    description: 'Read file content'
  },
  {
    id: 'file-write',
    label: 'Write File',
    category: 'file',
    inputs: ['path', 'content'],
    outputs: [],
    description: 'Write to file'
  },
  {
    id: 'tkinter-window',
    label: 'Tkinter Window',
    category: 'gui',
    inputs: ['title', 'size'],
    outputs: ['window'],
    description: 'Create tkinter window'
  },
  {
    id: 'tkinter-label',
    label: 'Tkinter Label',
    category: 'gui',
    inputs: ['window', 'text', 'position'],
    outputs: ['label'],
    description: 'Add label to window'
  },
  {
    id: 'tkinter-button',
    label: 'Tkinter Button',
    category: 'gui',
    inputs: ['window', 'text', 'command', 'position'],
    outputs: ['button'],
    description: 'Add button to window'
  },
  {
    id: 'tkinter-entry',
    label: 'Tkinter Entry',
    category: 'gui',
    inputs: ['window', 'position'],
    outputs: ['entry'],
    description: 'Add text entry field'
  },
  {
    id: 'tkinter-canvas',
    label: 'Tkinter Canvas',
    category: 'gui',
    inputs: ['window', 'size', 'position'],
    outputs: ['canvas'],
    description: 'Add drawing canvas'
  },
  {
    id: 'tkinter-draw-line',
    label: 'Draw Line',
    category: 'gui',
    inputs: ['canvas', 'start', 'end', 'color'],
    outputs: [],
    description: 'Draw line on canvas'
  },
  {
    id: 'tkinter-draw-rect',
    label: 'Draw Rectangle',
    category: 'gui',
    inputs: ['canvas', 'position', 'size', 'color'],
    outputs: [],
    description: 'Draw rectangle on canvas'
  },
  {
    id: 'tkinter-draw-circle',
    label: 'Draw Circle',
    category: 'gui',
    inputs: ['canvas', 'center', 'radius', 'color'],
    outputs: [],
    description: 'Draw circle on canvas'
  },
  {
    id: 'tkinter-mainloop',
    label: 'Tkinter Main Loop',
    category: 'gui',
    inputs: ['window'],
    outputs: [],
    description: 'Start tkinter event loop'
  },
  {
    id: 'sleep',
    label: 'Sleep',
    category: 'utility',
    inputs: ['seconds'],
    outputs: [],
    description: 'Pause execution'
  },
  {
    id: 'random-int',
    label: 'Random Integer',
    category: 'utility',
    inputs: ['min', 'max'],
    outputs: ['value'],
    description: 'Generate random integer'
  },
  {
    id: 'random-float',
    label: 'Random Float',
    category: 'utility',
    inputs: ['min', 'max'],
    outputs: ['value'],
    description: 'Generate random float'
  },
  {
    id: 'datetime-now',
    label: 'Current DateTime',
    category: 'utility',
    inputs: [],
    outputs: ['datetime'],
    description: 'Get current date and time'
  },
  {
    id: 'json-parse',
    label: 'Parse JSON',
    category: 'data',
    inputs: ['json_string'],
    outputs: ['data'],
    description: 'Parse JSON string'
  },
  {
    id: 'json-stringify',
    label: 'Stringify JSON',
    category: 'data',
    inputs: ['data'],
    outputs: ['json_string'],
    description: 'Convert to JSON string'
  },
  {
    id: 'http-get',
    label: 'HTTP GET',
    category: 'network',
    inputs: ['url'],
    outputs: ['response'],
    description: 'Make HTTP GET request'
  },
  {
    id: 'http-post',
    label: 'HTTP POST',
    category: 'network',
    inputs: ['url', 'data'],
    outputs: ['response'],
    description: 'Make HTTP POST request'
  }
]

export function NodeLibrary() {
  const { addNode } = useVisualScriptingStore()
  const [isDragOver, setIsDragOver] = React.useState(false)

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

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    const data = event.dataTransfer.getData('application/reactflow')
    if (data) {
      const parsed = JSON.parse(data)
      // Only show delete zone for actual nodes (not templates)
      if (parsed.id && !parsed.category) {
        setIsDragOver(true)
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    // The actual deletion is handled in VisualScriptingEditor
  }

  const categories = ['control', 'data', 'input', 'output', 'file', 'gui', 'utility', 'network'] as const

  return (
    <div 
      className={`h-full overflow-y-auto space-y-4 relative ${
        isDragOver ? 'bg-red-50 border-2 border-red-300 border-dashed' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-90 z-20">
          <div className="text-center">
            <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 font-medium">Drop here to delete node</p>
          </div>
        </div>
      )}
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-sm font-medium text-gray-700 capitalize mb-2 sticky top-0 bg-white z-10 py-1">
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
                      template.category === 'control' ? 'bg-purple-500' : 
                      template.category === 'file' ? 'bg-blue-500' :
                      template.category === 'gui' ? 'bg-pink-500' :
                      template.category === 'utility' ? 'bg-indigo-500' :
                      template.category === 'network' ? 'bg-orange-500' : 'bg-cyan-500'
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
