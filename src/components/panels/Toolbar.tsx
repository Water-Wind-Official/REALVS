// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Toolbar
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useCallback, useRef } from 'react';
import { useVisualScriptingStore } from '../../store/visualScriptingStore';
import { Undo2, Redo2, Download, Upload, Trash2, Map, LayoutGrid, Copy } from 'lucide-react';
import { generateCode } from '../../utils/codeGenerator';

export function Toolbar() {
  const {
    nodes, edges, language, showMinimap, showGrid,
    setLanguage, setNodes, setEdges, clearCanvas,
    undo, redo, past, future,
    toggleMinimap, toggleGrid,
  } = useVisualScriptingStore();

  const fileRef = useRef<HTMLInputElement>(null);

  /* ── export / import ────────────────────────────────────────────────── */
  const handleExport = useCallback(() => {
    const blob = new Blob([JSON.stringify({ nodes, edges }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'realvs-project.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }, [nodes, edges]);

  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.nodes && data.edges) { setNodes(data.nodes); setEdges(data.edges); }
      } catch { /* ignore bad files */ }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, [setNodes, setEdges]);

  const handleCopyCode = useCallback(() => {
    const code = generateCode(nodes, edges, language);
    navigator.clipboard.writeText(code);
  }, [nodes, edges, language]);

  return (
    <header className="vs-toolbar">
      {/* Left: branding + language */}
      <div className="vs-toolbar__left">
        <div className="vs-toolbar__brand">
          <span className="vs-toolbar__logo">⟐</span>
          <span className="vs-toolbar__name">REALVS</span>
        </div>

        <div className="vs-toolbar__divider" />

        <div className="vs-toolbar__lang">
          <button
            className={`vs-toolbar__lang-btn ${language === 'python' ? 'vs-toolbar__lang-btn--active' : ''}`}
            onClick={() => setLanguage('python')}
          >
            <span className="vs-toolbar__lang-icon">🐍</span> Python
          </button>
          <button
            className={`vs-toolbar__lang-btn ${language === 'csharp' ? 'vs-toolbar__lang-btn--active' : ''}`}
            onClick={() => setLanguage('csharp')}
          >
            <span className="vs-toolbar__lang-icon">C#</span> C#
          </button>
        </div>
      </div>

      {/* Center: undo / redo */}
      <div className="vs-toolbar__center">
        <button className="vs-toolbar__btn" onClick={undo} disabled={past.length === 0} title="Undo (Ctrl+Z)">
          <Undo2 size={15} />
        </button>
        <button className="vs-toolbar__btn" onClick={redo} disabled={future.length === 0} title="Redo (Ctrl+Y)">
          <Redo2 size={15} />
        </button>

        <div className="vs-toolbar__divider" />

        <button className={`vs-toolbar__btn ${showMinimap ? 'vs-toolbar__btn--active' : ''}`} onClick={toggleMinimap} title="Minimap">
          <Map size={15} />
        </button>
        <button className={`vs-toolbar__btn ${showGrid ? 'vs-toolbar__btn--active' : ''}`} onClick={toggleGrid} title="Grid">
          <LayoutGrid size={15} />
        </button>
      </div>

      {/* Right: actions */}
      <div className="vs-toolbar__right">
        <button className="vs-toolbar__btn" onClick={handleCopyCode} title="Copy Code">
          <Copy size={15} /> <span>Copy Code</span>
        </button>

        <label className="vs-toolbar__btn" title="Import project JSON">
          <Upload size={15} /> <span>Import</span>
          <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>

        <button className="vs-toolbar__btn" onClick={handleExport} title="Export project JSON">
          <Download size={15} /> <span>Export</span>
        </button>

        <button className="vs-toolbar__btn vs-toolbar__btn--danger" onClick={clearCanvas} title="Clear canvas">
          <Trash2 size={15} /> <span>Clear</span>
        </button>
      </div>
    </header>
  );
}
