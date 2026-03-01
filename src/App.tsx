import { ReactFlowProvider } from 'reactflow'
import { VisualScriptingEditor } from './components/VisualScriptingEditor'

function App() {
  return (
    <ReactFlowProvider>
      <VisualScriptingEditor />
    </ReactFlowProvider>
  )
}

export default App
