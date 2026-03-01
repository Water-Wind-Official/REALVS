// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Zustand Store  (full state management with undo / redo)
// ═══════════════════════════════════════════════════════════════════════════════

import { create } from 'zustand';
import { Node, Edge } from 'reactflow';
import { VSNodeData } from '../types';

/* ── History snapshot ─────────────────────────────────────────────────────── */
interface Snapshot {
  nodes: Node<VSNodeData>[];
  edges: Edge[];
}

/* ── State shape ──────────────────────────────────────────────────────────── */
export interface VisualScriptingState {
  // Canvas data
  nodes: Node<VSNodeData>[];
  edges: Edge[];
  language: 'python' | 'csharp';

  // Selection / UI
  selectedNodeId: string | null;
  rightPanelTab: 'properties' | 'code';
  searchQuery: string;
  showMinimap: boolean;
  showGrid: boolean;

  // Undo / redo
  past: Snapshot[];
  future: Snapshot[];

  // ── Mutators ───────────────────────────────────────────────────────────
  setNodes: (v: Node<VSNodeData>[] | ((prev: Node<VSNodeData>[]) => Node<VSNodeData>[])) => void;
  setEdges: (v: Edge[] | ((prev: Edge[]) => Edge[])) => void;
  addNode: (node: Node<VSNodeData>) => void;
  removeNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  updateNodeConfig: (nodeId: string, key: string, value: string) => void;
  setLanguage: (l: 'python' | 'csharp') => void;
  setSelectedNodeId: (id: string | null) => void;
  setRightPanelTab: (tab: 'properties' | 'code') => void;
  setSearchQuery: (q: string) => void;
  toggleMinimap: () => void;
  toggleGrid: () => void;
  clearCanvas: () => void;

  // History
  pushHistory: () => void;
  undo: () => void;
  redo: () => void;
}

/* ── Store ────────────────────────────────────────────────────────────────── */
export const useVisualScriptingStore = create<VisualScriptingState>((set, get) => ({
  nodes: [],
  edges: [],
  language: 'python',

  selectedNodeId: null,
  rightPanelTab: 'code',
  searchQuery: '',
  showMinimap: true,
  showGrid: true,

  past: [],
  future: [],

  // ── Canvas data ──────────────────────────────────────────────────────────

  setNodes: (v) =>
    set((s) => ({ nodes: typeof v === 'function' ? v(s.nodes) : v })),

  setEdges: (v) =>
    set((s) => ({ edges: typeof v === 'function' ? v(s.edges) : v })),

  addNode: (node) => {
    get().pushHistory();
    set((s) => ({ nodes: [...s.nodes, node] }));
  },

  removeNode: (nodeId) => {
    get().pushHistory();
    set((s) => ({
      nodes: s.nodes.filter((n) => n.id !== nodeId),
      edges: s.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      selectedNodeId: s.selectedNodeId === nodeId ? null : s.selectedNodeId,
    }));
  },

  duplicateNode: (nodeId) => {
    const s = get();
    const node = s.nodes.find((n) => n.id === nodeId);
    if (!node) return;
    get().pushHistory();
    const newId = `${node.data.templateId}-${Date.now()}`;
    const clone: Node<VSNodeData> = {
      ...node,
      id: newId,
      position: { x: node.position.x + 40, y: node.position.y + 40 },
      selected: false,
      data: { ...node.data, configValues: { ...node.data.configValues } },
    };
    set((s) => ({ nodes: [...s.nodes, clone], selectedNodeId: newId }));
  },

  updateNodeConfig: (nodeId, key, value) =>
    set((s) => ({
      nodes: s.nodes.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, configValues: { ...n.data.configValues, [key]: value } } }
          : n,
      ),
    })),

  setLanguage: (language) => set({ language }),

  setSelectedNodeId: (id) =>
    set({ selectedNodeId: id, rightPanelTab: id ? 'properties' : get().rightPanelTab }),

  setRightPanelTab: (tab) => set({ rightPanelTab: tab }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  toggleMinimap: () => set((s) => ({ showMinimap: !s.showMinimap })),
  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),

  clearCanvas: () => {
    get().pushHistory();
    set({ nodes: [], edges: [], selectedNodeId: null });
  },

  // ── History (undo / redo) ────────────────────────────────────────────────

  pushHistory: () =>
    set((s) => {
      const snap: Snapshot = {
        nodes: JSON.parse(JSON.stringify(s.nodes)),
        edges: JSON.parse(JSON.stringify(s.edges)),
      };
      const past = [...s.past, snap].slice(-60);
      return { past, future: [] };
    }),

  undo: () =>
    set((s) => {
      if (s.past.length === 0) return s;
      const previous = s.past[s.past.length - 1];
      const current: Snapshot = {
        nodes: JSON.parse(JSON.stringify(s.nodes)),
        edges: JSON.parse(JSON.stringify(s.edges)),
      };
      return {
        past: s.past.slice(0, -1),
        future: [current, ...s.future].slice(0, 60),
        nodes: previous.nodes,
        edges: previous.edges,
      };
    }),

  redo: () =>
    set((s) => {
      if (s.future.length === 0) return s;
      const next = s.future[0];
      const current: Snapshot = {
        nodes: JSON.parse(JSON.stringify(s.nodes)),
        edges: JSON.parse(JSON.stringify(s.edges)),
      };
      return {
        future: s.future.slice(1),
        past: [...s.past, current].slice(-60),
        nodes: next.nodes,
        edges: next.edges,
      };
    }),
}))
