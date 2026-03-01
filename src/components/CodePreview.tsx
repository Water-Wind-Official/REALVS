import React from 'react'
import Editor from '@monaco-editor/react'

interface CodePreviewProps {
  code: string
  language: 'python' | 'csharp'
}

export function CodePreview({ code, language }: CodePreviewProps) {
  const monacoLanguage = language === 'python' ? 'python' : 'csharp'

  return (
    <div className="h-full">
      <Editor
        height="100%"
        language={monacoLanguage}
        value={code}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 12,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly: true,
          wordWrap: 'on',
          folding: true,
          foldingStrategy: 'indentation',
          showFoldingControls: 'always',
          contextmenu: false,
          cursorBlinking: 'solid',
          cursorStyle: 'line',
          renderWhitespace: 'selection',
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true
          }
        }}
      />
    </div>
  )
}
