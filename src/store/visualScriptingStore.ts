import { create } from 'zustand'
import { Node, Edge } from 'reactflow'

interface VisualScriptingState {
  nodes: Node[]
  edges: Edge[]
  language: 'python' | 'csharp'
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  addNode: (node: Node) => void
  removeNode: (nodeId: string) => void
  setLanguage: (language: 'python' | 'csharp') => void
  clearCanvas: () => void
}

export const useVisualScriptingStore = create<VisualScriptingState>((set) => ({
  nodes: [
    {
      id: 'start-1',
      type: 'customNode',
      position: { x: 100, y: 100 },
      data: {
        id: 'start-1',
        label: 'Start',
        category: 'control',
        inputs: [],
        outputs: ['flow']
      }
    }
  ],
  edges: [],
  language: 'python',
  
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, node] 
  })),
  
  removeNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== nodeId),
    edges: state.edges.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    )
  })),
  
  setLanguage: (language) => set({ language }),
  
  clearCanvas: () => set({ nodes: [], edges: [] })
}))
