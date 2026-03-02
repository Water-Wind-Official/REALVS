// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Type System
// ═══════════════════════════════════════════════════════════════════════════════

export type PortType = 'flow' | 'string' | 'number' | 'boolean' | 'any' | 'list' | 'object' | 'widget';

export type NodeCategory =
  | 'flow'
  | 'variables'
  | 'data'
  | 'math'
  | 'comparison'
  | 'string'
  | 'collections'
  | 'functions'
  | 'io'
  | 'errors'
  | 'gui'
  | 'network'
  | 'advanced';

export interface PortDefinition {
  id: string;
  label: string;
  type: PortType;
  defaultValue?: string;
}

export interface ConfigField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'color' | 'textarea';
  defaultValue?: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
}

export interface NodeTemplate {
  id: string;
  label: string;
  category: NodeCategory;
  subcategory?: string; // e.g., "Containers", "Inputs", "Display" for GUI category
  description: string;
  inputs: PortDefinition[];
  outputs: PortDefinition[];
  config?: ConfigField[];
  color: string;
  tags?: string[]; // Search tags: "form", "button", "ui", etc.
}

export interface VSNodeData {
  templateId: string;
  label: string;
  category: NodeCategory;
  description: string;
  inputs: PortDefinition[];
  outputs: PortDefinition[];
  config?: ConfigField[];
  configValues: Record<string, string>;
  color: string;
}

// ── Category metadata ────────────────────────────────────────────────────────

export const CATEGORY_COLORS: Record<NodeCategory, string> = {
  flow:        '#8b5cf6',
  variables:   '#06b6d4',
  data:        '#22c55e',
  math:        '#3b82f6',
  comparison:  '#f59e0b',
  string:      '#10b981',
  collections: '#a855f7',
  functions:   '#ec4899',
  io:          '#f97316',
  errors:      '#ef4444',
  gui:         '#d946ef',
  network:     '#14b8a6',
  advanced:    '#6b7280',
};

export const CATEGORY_LABELS: Record<NodeCategory, string> = {
  flow:        'Flow Control',
  variables:   'Variables',
  data:        'Data Types',
  math:        'Math',
  comparison:  'Comparison & Logic',
  string:      'String Operations',
  collections: 'Collections',
  functions:   'Functions',
  io:          'Input / Output',
  errors:      'Error Handling',
  gui:         'GUI (Tkinter)',
  network:     'Network & JSON',
  advanced:    'Advanced',
};

export const CATEGORY_ICONS: Record<NodeCategory, string> = {
  flow:        '⟐',
  variables:   '𝑥',
  data:        '◈',
  math:        '∑',
  comparison:  '⋈',
  string:      'T',
  collections: '⊞',
  functions:   'ƒ',
  io:          '⇄',
  errors:      '⚠',
  gui:         '◻',
  network:     '⊛',
  advanced:    '⚙',
};

export const PORT_COLORS: Record<PortType, string> = {
  flow:    '#94a3b8',
  string:  '#22c55e',
  number:  '#3b82f6',
  boolean: '#ef4444',
  any:     '#9ca3af',
  list:    '#a855f7',
  object:  '#f59e0b',
  widget:  '#ec4899',
};
