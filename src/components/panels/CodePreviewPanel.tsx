// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Code Preview  (Monaco editor, read-only)
// ═══════════════════════════════════════════════════════════════════════════════

import { useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { useVisualScriptingStore } from '../../store/visualScriptingStore';
import { generateCode } from '../../utils/codeGenerator';

export function CodePreviewPanel() {
  const { nodes, edges, language } = useVisualScriptingStore();

  const code = useMemo(
    () => generateCode(nodes, edges, language),
    [nodes, edges, language],
  );

  return (
    <div className="vs-code">
      <Editor
        height="100%"
        language={language === 'python' ? 'python' : 'csharp'}
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 12,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          folding: true,
          foldingStrategy: 'indentation',
          showFoldingControls: 'always',
          renderWhitespace: 'selection',
          bracketPairColorization: { enabled: true },
          guides: { bracketPairs: true, indentation: true },
          contextmenu: false,
          padding: { top: 12 },
        }}
      />
    </div>
  );
}
