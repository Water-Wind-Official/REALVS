// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Visual Scripting Editor  (main canvas + panels)
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useCallback, useRef, useEffect } from 'react';
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
  useReactFlow,
  NodeTypes,
  DefaultEdgeOptions,
  MarkerType,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { CustomNode } from './nodes/CustomNode';
import { Toolbar } from './panels/Toolbar';
import { NodeLibraryPanel } from './panels/NodeLibraryPanel';
import { PropertiesPanel } from './panels/PropertiesPanel';
import { CodePreviewPanel } from './panels/CodePreviewPanel';
import { useVisualScriptingStore } from '../store/visualScriptingStore';
import { VSNodeData, NodeTemplate } from '../types';
import { Code, Settings } from 'lucide-react';

/* ── Node types registry ──────────────────────────────────────────────────── */
const nodeTypes: NodeTypes = { vsNode: CustomNode };

/* ── Default edge styling ─────────────────────────────────────────────────── */
const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#6366f1', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1', width: 16, height: 16 },
};

/* ── Component ────────────────────────────────────────────────────────────── */
export function VisualScriptingEditor() {
  const wrapper = useRef<HTMLDivElement>(null);
  const { getViewport } = useReactFlow();

  const {
    nodes, edges, showMinimap, showGrid,
    setNodes, setEdges, setSelectedNodeId, pushHistory,
    rightPanelTab, setRightPanelTab,
    undo, redo,
  } = useVisualScriptingStore();

  /* ── Keyboard shortcuts ─────────────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  /* ── ReactFlow callbacks ────────────────────────────────────────────────── */
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes(applyNodeChanges(changes, nodes) as Node<VSNodeData>[]),
    [nodes, setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(applyEdgeChanges(changes, edges)),
    [edges, setEdges],
  );

  const onConnect = useCallback(
    (conn: Connection) => {
      pushHistory();
      setEdges(addEdge({ ...conn, id: `e-${Date.now()}` }, edges));
    },
    [edges, setEdges, pushHistory],
  );

  const onPaneClick = useCallback(() => setSelectedNodeId(null), [setSelectedNodeId]);

  /* ── Drop from library ──────────────────────────────────────────────────── */
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('application/realvs-node');
      if (!raw) return;

      const tpl: NodeTemplate = JSON.parse(raw);
      const bounds = wrapper.current?.getBoundingClientRect();
      if (!bounds) return;

      const { x: vx, y: vy, zoom } = getViewport();
      const position = {
        x: (e.clientX - bounds.left - vx) / zoom - 90,
        y: (e.clientY - bounds.top - vy) / zoom - 20,
      };

      const newId = `${tpl.id}-${Date.now()}`;
      const configValues: Record<string, string> = {};
      tpl.config?.forEach((c) => { if (c.defaultValue !== undefined) configValues[c.id] = c.defaultValue; });

      const newNode: Node<VSNodeData> = {
        id: newId,
        type: 'vsNode',
        position,
        data: {
          templateId: tpl.id,
          label: tpl.label,
          category: tpl.category,
          description: tpl.description,
          inputs: tpl.inputs,
          outputs: tpl.outputs,
          config: tpl.config,
          configValues,
          color: tpl.color,
        },
      };
      pushHistory();
      setNodes((prev) => [...prev, newNode]);
    },
    [setNodes, getViewport, pushHistory],
  );

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <div className="vs-editor">
      {/* Toolbar strip */}
      <Toolbar />

      <div className="vs-editor__body">
        {/* Left: Node Library */}
        <NodeLibraryPanel />

        {/* Center: Canvas */}
        <div className="vs-canvas" ref={wrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onPaneClick={onPaneClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            fitView
            snapToGrid
            snapGrid={[16, 16]}
            minZoom={0.15}
            maxZoom={3}
            proOptions={{ hideAttribution: true }}
          >
            <Controls className="vs-controls" />
            {showMinimap && (
              <MiniMap
                className="vs-minimap"
                nodeColor={(n: any) => n.data?.color ?? '#6b7280'}
                maskColor="rgba(15, 17, 23, 0.7)"
              />
            )}
            {showGrid && <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#2a2b3d" />}
          </ReactFlow>
        </div>

        {/* Right: Properties / Code tabs */}
        <div className="vs-right">
          <div className="vs-right__tabs">
            <button
              className={`vs-right__tab ${rightPanelTab === 'properties' ? 'vs-right__tab--active' : ''}`}
              onClick={() => setRightPanelTab('properties')}
            >
              <Settings size={14} /> Properties
            </button>
            <button
              className={`vs-right__tab ${rightPanelTab === 'code' ? 'vs-right__tab--active' : ''}`}
              onClick={() => setRightPanelTab('code')}
            >
              <Code size={14} /> Code
            </button>
          </div>

          <div className="vs-right__content">
            {rightPanelTab === 'properties' ? <PropertiesPanel /> : <CodePreviewPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
