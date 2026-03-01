import React from 'react'
import { ReactFlowProvider } from 'reactflow'
import { VisualScriptingEditor } from './components/VisualScriptingEditor'

function App() {
  return (
    <ReactFlowProvider>
      <div className="h-screen w-full bg-gray-50">
        <VisualScriptingEditor />
      </div>
    </ReactFlowProvider>
  )
}

export default App
