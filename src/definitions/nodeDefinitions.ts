// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Comprehensive Node Definitions
// 70+ nodes across 13 categories for Python & C# visual scripting
// ═══════════════════════════════════════════════════════════════════════════════

import { NodeTemplate, NodeCategory } from '../types';

export const nodeDefinitions: NodeTemplate[] = [

  // ═══════════ FLOW CONTROL ═══════════════════════════════════════════════════
  {
    id: 'start', label: 'Start', category: 'flow', color: '#8b5cf6',
    description: '🎯 Where your program begins (always drag this first)',
    tags: ['entry', 'beginning', 'entry-point'],
    inputs: [],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
  },
  {
    id: 'end', label: 'End', category: 'flow', color: '#8b5cf6',
    description: '🏁 Where your program finishes',
    tags: ['exit', 'finish', 'end-point'],
    inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    outputs: [],
  },
  {
    id: 'if-else', label: 'If / Else', category: 'flow', color: '#8b5cf6',
    description: '❓ Check a condition, choose which path to take',
    tags: ['condition', 'decision', 'branch'],
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'condition', label: 'Condition', type: 'boolean' },
    ],
    outputs: [
      { id: 'true', label: 'True', type: 'flow' },
      { id: 'false', label: 'False', type: 'flow' },
    ],
  },
  {
    id: 'while-loop', label: 'While Loop', category: 'flow', color: '#8b5cf6',
    description: '🔁 Keep repeating until something changes',
    tags: ['loop', 'repeat', 'iteration', 'condition'],
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'condition', label: 'Condition', type: 'boolean' },
    ],
    outputs: [
      { id: 'loop', label: 'Loop Body', type: 'flow' },
      { id: 'done', label: 'Done', type: 'flow' },
    ],
  },
  {
    id: 'for-loop', label: 'For Loop', category: 'flow', color: '#8b5cf6',
    description: '📊 Repeat a specific number of times (count from 1 to 10, etc)',
    tags: ['loop', 'repeat', 'iteration', 'count'],
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'start', label: 'From', type: 'number' },
      { id: 'end', label: 'To', type: 'number' },
      { id: 'step', label: 'Step', type: 'number' },
    ],
    outputs: [
      { id: 'loop', label: 'Loop Body', type: 'flow' },
      { id: 'index', label: 'Index', type: 'number' },
      { id: 'done', label: 'Done', type: 'flow' },
    ],
    config: [
      { id: 'varName', label: 'Iterator', type: 'text', defaultValue: 'i', placeholder: 'i' },
    ],
  },
  {
    id: 'for-each', label: 'For Each', category: 'flow', color: '#8b5cf6',
    description: '📋 Process each item in a list one by one',
    tags: ['loop', 'repeat', 'iteration', 'collection'],
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'collection', label: 'Collection', type: 'list' },
    ],
    outputs: [
      { id: 'loop', label: 'Loop Body', type: 'flow' },
      { id: 'item', label: 'Item', type: 'any' },
      { id: 'done', label: 'Done', type: 'flow' },
    ],
    config: [
      { id: 'varName', label: 'Item Name', type: 'text', defaultValue: 'item', placeholder: 'item' },
    ],
  },
  {
    id: 'break', label: 'Break', category: 'flow', color: '#8b5cf6',
    description: 'Exit the current loop immediately',
    tags: ['loop', 'exit', 'break'],
    inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    outputs: [],
  },
  {
    id: 'continue', label: 'Continue', category: 'flow', color: '#8b5cf6',
    description: 'Skip to the next loop iteration',
    tags: ['loop', 'skip', 'iteration'],
    inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    outputs: [],
  },
  {
    id: 'comment', label: 'Comment', category: 'flow', color: '#8b5cf6',
    description: 'Add a code comment (no execution)',
    tags: ['documentation', 'note', 'code'],
    inputs: [],
    outputs: [],
    config: [
      { id: 'text', label: 'Comment', type: 'textarea', defaultValue: '', placeholder: 'Your comment…' },
    ],
  },

  // ═══════════ VARIABLES ══════════════════════════════════════════════════════
  {
    id: 'set-variable', label: 'Set Variable', category: 'variables', color: '#06b6d4',
    description: '💾 Save a value in a named container',
    tags: ['variable', 'storage', 'set', 'assignment'],
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'value', label: 'Value', type: 'any' },
    ],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    config: [
      { id: 'name', label: 'Name', type: 'text', defaultValue: 'myVar', placeholder: 'variable name' },
    ],
  },
  {
    id: 'get-variable', label: 'Get Variable', category: 'variables', color: '#06b6d4',
    description: '📂 Retrieve a saved value by name',
    tags: ['variable', 'retrieve', 'get', 'read'],
    inputs: [],
    outputs: [{ id: 'value', label: 'Value', type: 'any' }],
    config: [
      { id: 'name', label: 'Name', type: 'text', defaultValue: 'myVar', placeholder: 'variable name' },
    ],
  },

  // ═══════════ DATA TYPES ═════════════════════════════════════════════════════
  {
    id: 'string-literal', label: 'String', category: 'data', color: '#22c55e',
    description: '📝 Create a text value',
    subcategory: 'Literals',
    tags: ['text', 'string', 'literal'],
    inputs: [],
    outputs: [{ id: 'value', label: 'Value', type: 'string' }],
    config: [
      { id: 'value', label: 'Text', type: 'text', defaultValue: '', placeholder: 'Enter text…' },
    ],
  },
  {
    id: 'number-literal', label: 'Number', category: 'data', color: '#22c55e',
    description: '🔢 Create a numeric value (123, 45.67, etc)',
    subcategory: 'Literals',
    tags: ['number', 'numeric', 'literal', 'value'],
    inputs: [],
    outputs: [{ id: 'value', label: 'Value', type: 'number' }],
    config: [
      { id: 'value', label: 'Value', type: 'number', defaultValue: '0', placeholder: '0' },
    ],
  },
  {
    id: 'boolean-literal', label: 'Boolean', category: 'data', color: '#22c55e',
    description: '✓ A yes/no switch (True or False)',
    subcategory: 'Literals',
    tags: ['boolean', 'true', 'false', 'literal'],
    inputs: [],
    outputs: [{ id: 'value', label: 'Value', type: 'boolean' }],
    config: [
      { id: 'value', label: 'Value', type: 'select', defaultValue: 'true', options: [
        { label: 'True', value: 'true' },
        { label: 'False', value: 'false' },
      ]},
    ],
  },
  {
    id: 'null-literal', label: 'Null / None', category: 'data', color: '#22c55e',
    description: '∅ Empty/nothing value',
    subcategory: 'Literals',
    tags: ['null', 'none', 'empty', 'literal'],
    inputs: [],
    outputs: [{ id: 'value', label: 'Value', type: 'any' }],
  },

  // ═══════════ MATH ══════════════════════════════════════════════════════════
  {
    id: 'math-add', label: 'Add', category: 'math', color: '#3b82f6',
    description: '➕ Add two numbers together',
    subcategory: 'Basic Operations',
    tags: ['math', 'add', 'plus', 'arithmetic'],
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-subtract', label: 'Subtract', category: 'math', color: '#3b82f6',
    description: '➖ Subtract one number from another',
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-multiply', label: 'Multiply', category: 'math', color: '#3b82f6',
    description: '✖️ Multiply two numbers together',
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-divide', label: 'Divide', category: 'math', color: '#3b82f6',
    description: '➗ Divide one number by another',
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-modulo', label: 'Modulo', category: 'math', color: '#3b82f6',
    description: '📊 Get the remainder after division',
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-power', label: 'Power', category: 'math', color: '#3b82f6',
    description: '⚡ Raise number to a power (2³)',
    inputs: [
      { id: 'base', label: 'Base', type: 'number' },
      { id: 'exp', label: 'Exp', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-abs', label: 'Absolute', category: 'math', color: '#3b82f6',
    description: '📏 Distance from zero (ignores negative)',
    inputs: [{ id: 'value', label: 'Value', type: 'number' }],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-min', label: 'Min', category: 'math', color: '#3b82f6',
    description: '🔽 Find the smaller number',
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-max', label: 'Max', category: 'math', color: '#3b82f6',
    description: '🔼 Find the larger number',
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-round', label: 'Round', category: 'math', color: '#3b82f6',
    description: '🎯 Round to nearest whole number',
    inputs: [{ id: 'value', label: 'Value', type: 'number' }],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-sqrt', label: 'Square Root', category: 'math', color: '#3b82f6',
    description: '√ Square root calculation',
    inputs: [{ id: 'value', label: 'Value', type: 'number' }],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
  },
  {
    id: 'math-random', label: 'Random', category: 'math', color: '#3b82f6',
    description: 'Random number between min and max',
    inputs: [
      { id: 'min', label: 'Min', type: 'number' },
      { id: 'max', label: 'Max', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'number' }],
    config: [
      { id: 'type', label: 'Type', type: 'select', defaultValue: 'int', options: [
        { label: 'Integer', value: 'int' },
        { label: 'Float', value: 'float' },
      ]},
    ],
  },

  // ═══════════ COMPARISON & LOGIC ════════════════════════════════════════════
  {
    id: 'compare-equal', label: 'Equal ==', category: 'comparison', color: '#f59e0b',
    description: 'True if A equals B',
    inputs: [
      { id: 'a', label: 'A', type: 'any' },
      { id: 'b', label: 'B', type: 'any' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'boolean' }],
  },
  {
    id: 'compare-not-equal', label: 'Not Equal !=', category: 'comparison', color: '#f59e0b',
    description: 'True if A ≠ B',
    inputs: [
      { id: 'a', label: 'A', type: 'any' },
      { id: 'b', label: 'B', type: 'any' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'boolean' }],
  },
  {
    id: 'compare-greater', label: 'Greater >', category: 'comparison', color: '#f59e0b',
    description: 'True if A > B',
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'boolean' }],
  },
  {
    id: 'compare-less', label: 'Less <', category: 'comparison', color: '#f59e0b',
    description: 'True if A < B',
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'boolean' }],
  },
  {
    id: 'compare-gte', label: 'Greater ≥', category: 'comparison', color: '#f59e0b',
    description: 'True if A ≥ B',
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'boolean' }],
  },
  {
    id: 'compare-lte', label: 'Less ≤', category: 'comparison', color: '#f59e0b',
    description: 'True if A ≤ B',
    inputs: [
      { id: 'a', label: 'A', type: 'number' },
      { id: 'b', label: 'B', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'boolean' }],
  },
  {
    id: 'logic-and', label: 'And &&', category: 'comparison', color: '#f59e0b',
    description: 'True if both A and B are true',
    inputs: [
      { id: 'a', label: 'A', type: 'boolean' },
      { id: 'b', label: 'B', type: 'boolean' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'boolean' }],
  },
  {
    id: 'logic-or', label: 'Or ||', category: 'comparison', color: '#f59e0b',
    description: 'True if A or B is true',
    inputs: [
      { id: 'a', label: 'A', type: 'boolean' },
      { id: 'b', label: 'B', type: 'boolean' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'boolean' }],
  },
  {
    id: 'logic-not', label: 'Not !', category: 'comparison', color: '#f59e0b',
    description: 'Inverts a boolean',
    inputs: [{ id: 'value', label: 'Value', type: 'boolean' }],
    outputs: [{ id: 'result', label: 'Result', type: 'boolean' }],
  },

  // ═══════════ STRING OPERATIONS ═════════════════════════════════════════════
  {
    id: 'string-concat', label: 'Concatenate', category: 'string', color: '#10b981',
    description: 'Join two strings together',
    inputs: [
      { id: 'a', label: 'A', type: 'string' },
      { id: 'b', label: 'B', type: 'string' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'string' }],
  },
  {
    id: 'string-length', label: 'Length', category: 'string', color: '#10b981',
    description: 'Number of characters in string',
    inputs: [{ id: 'text', label: 'Text', type: 'string' }],
    outputs: [{ id: 'length', label: 'Length', type: 'number' }],
  },
  {
    id: 'string-contains', label: 'Contains', category: 'string', color: '#10b981',
    description: 'True if string contains sub-string',
    inputs: [
      { id: 'text', label: 'Text', type: 'string' },
      { id: 'search', label: 'Search', type: 'string' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'boolean' }],
  },
  {
    id: 'string-replace', label: 'Replace', category: 'string', color: '#10b981',
    description: 'Replace all matches in a string',
    inputs: [
      { id: 'text', label: 'Text', type: 'string' },
      { id: 'search', label: 'Find', type: 'string' },
      { id: 'replacement', label: 'Replace', type: 'string' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'string' }],
  },
  {
    id: 'string-split', label: 'Split', category: 'string', color: '#10b981',
    description: 'Split string by delimiter into a list',
    inputs: [
      { id: 'text', label: 'Text', type: 'string' },
      { id: 'delimiter', label: 'Delim', type: 'string' },
    ],
    outputs: [{ id: 'result', label: 'Parts', type: 'list' }],
  },
  {
    id: 'string-upper', label: 'To Upper', category: 'string', color: '#10b981',
    description: 'Convert to UPPERCASE',
    inputs: [{ id: 'text', label: 'Text', type: 'string' }],
    outputs: [{ id: 'result', label: 'Result', type: 'string' }],
  },
  {
    id: 'string-lower', label: 'To Lower', category: 'string', color: '#10b981',
    description: 'Convert to lowercase',
    inputs: [{ id: 'text', label: 'Text', type: 'string' }],
    outputs: [{ id: 'result', label: 'Result', type: 'string' }],
  },
  {
    id: 'string-trim', label: 'Trim', category: 'string', color: '#10b981',
    description: 'Remove leading/trailing whitespace',
    inputs: [{ id: 'text', label: 'Text', type: 'string' }],
    outputs: [{ id: 'result', label: 'Result', type: 'string' }],
  },
  {
    id: 'string-substring', label: 'Substring', category: 'string', color: '#10b981',
    description: 'Extract a section of a string',
    inputs: [
      { id: 'text', label: 'Text', type: 'string' },
      { id: 'start', label: 'Start', type: 'number' },
      { id: 'end', label: 'End', type: 'number' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'string' }],
  },
  {
    id: 'to-string', label: 'To String', category: 'string', color: '#10b981',
    description: 'Convert any value to its string form',
    inputs: [{ id: 'value', label: 'Value', type: 'any' }],
    outputs: [{ id: 'result', label: 'Result', type: 'string' }],
  },
  {
    id: 'string-format', label: 'Format', category: 'string', color: '#10b981',
    description: 'F-string / format template',
    inputs: [
      { id: 'value1', label: 'Val 1', type: 'any' },
      { id: 'value2', label: 'Val 2', type: 'any' },
    ],
    outputs: [{ id: 'result', label: 'Result', type: 'string' }],
    config: [
      { id: 'template', label: 'Template', type: 'text', defaultValue: '{} {}', placeholder: '{} is {}' },
    ],
  },

  // ═══════════ COLLECTIONS ═══════════════════════════════════════════════════
  {
    id: 'list-create', label: 'Create List', category: 'collections', color: '#a855f7',
    description: 'Create an empty list / array',
    subcategory: 'Lists',
    tags: ['list', 'array', 'collection', 'create'],
    inputs: [],
    outputs: [{ id: 'list', label: 'List', type: 'list' }],
  },
  {
    id: 'list-append', label: 'Append', category: 'collections', color: '#a855f7',
    description: 'Add item to end of list',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'list', label: 'List', type: 'list' },
      { id: 'item', label: 'Item', type: 'any' },
    ],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
  },
  {
    id: 'list-get', label: 'Get Item', category: 'collections', color: '#a855f7',
    description: 'Get item at index',
    inputs: [
      { id: 'list', label: 'List', type: 'list' },
      { id: 'index', label: 'Index', type: 'number' },
    ],
    outputs: [{ id: 'item', label: 'Item', type: 'any' }],
  },
  {
    id: 'list-set', label: 'Set Item', category: 'collections', color: '#a855f7',
    description: 'Set item at index',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'list', label: 'List', type: 'list' },
      { id: 'index', label: 'Index', type: 'number' },
      { id: 'value', label: 'Value', type: 'any' },
    ],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
  },
  {
    id: 'list-remove', label: 'Remove', category: 'collections', color: '#a855f7',
    description: 'Remove item at index',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'list', label: 'List', type: 'list' },
      { id: 'index', label: 'Index', type: 'number' },
    ],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
  },
  {
    id: 'list-length', label: 'List Length', category: 'collections', color: '#a855f7',
    description: 'Number of items in the list',
    inputs: [{ id: 'list', label: 'List', type: 'list' }],
    outputs: [{ id: 'length', label: 'Length', type: 'number' }],
  },
  {
    id: 'list-sort', label: 'Sort', category: 'collections', color: '#a855f7',
    description: 'Sort the list ascending',
    inputs: [{ id: 'list', label: 'List', type: 'list' }],
    outputs: [{ id: 'sorted', label: 'Sorted', type: 'list' }],
  },
  {
    id: 'list-contains', label: 'Contains', category: 'collections', color: '#a855f7',
    description: 'True if item is in the list',
    inputs: [
      { id: 'list', label: 'List', type: 'list' },
      { id: 'item', label: 'Item', type: 'any' },
    ],
    outputs: [{ id: 'result', label: 'Found', type: 'boolean' }],
  },
  {
    id: 'dict-create', label: 'Create Dict', category: 'collections', color: '#a855f7',
    description: 'Create an empty dictionary / map',
    inputs: [],
    outputs: [{ id: 'dict', label: 'Dict', type: 'object' }],
  },
  {
    id: 'dict-set', label: 'Set Key', category: 'collections', color: '#a855f7',
    description: 'Set value for a key in dictionary',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'dict', label: 'Dict', type: 'object' },
      { id: 'key', label: 'Key', type: 'string' },
      { id: 'value', label: 'Value', type: 'any' },
    ],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
  },
  {
    id: 'dict-get', label: 'Get Key', category: 'collections', color: '#a855f7',
    description: 'Get value by key from dictionary',
    inputs: [
      { id: 'dict', label: 'Dict', type: 'object' },
      { id: 'key', label: 'Key', type: 'string' },
    ],
    outputs: [{ id: 'value', label: 'Value', type: 'any' }],
  },

  // ═══════════ FUNCTIONS ═════════════════════════════════════════════════════
  {
    id: 'function-define', label: 'Define Function', category: 'functions', color: '#ec4899',
    description: 'Define a reusable function',
    inputs: [],
    outputs: [
      { id: 'body', label: 'Body', type: 'flow' },
      { id: 'param1', label: 'Param 1', type: 'any' },
      { id: 'param2', label: 'Param 2', type: 'any' },
      { id: 'param3', label: 'Param 3', type: 'any' },
    ],
    config: [
      { id: 'name', label: 'Name', type: 'text', defaultValue: 'my_function', placeholder: 'function name' },
      { id: 'param1', label: 'Param 1', type: 'text', defaultValue: '', placeholder: '(optional)' },
      { id: 'param2', label: 'Param 2', type: 'text', defaultValue: '', placeholder: '(optional)' },
      { id: 'param3', label: 'Param 3', type: 'text', defaultValue: '', placeholder: '(optional)' },
    ],
  },
  {
    id: 'function-call', label: 'Call Function', category: 'functions', color: '#ec4899',
    description: 'Call a defined function',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'arg1', label: 'Arg 1', type: 'any' },
      { id: 'arg2', label: 'Arg 2', type: 'any' },
      { id: 'arg3', label: 'Arg 3', type: 'any' },
    ],
    outputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'result', label: 'Result', type: 'any' },
    ],
    config: [
      { id: 'name', label: 'Name', type: 'text', defaultValue: 'my_function', placeholder: 'function name' },
    ],
  },
  {
    id: 'return', label: 'Return', category: 'functions', color: '#ec4899',
    description: 'Return a value from the current function',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'value', label: 'Value', type: 'any' },
    ],
    outputs: [],
  },

  // ═══════════ INPUT / OUTPUT ════════════════════════════════════════════════
  {
    id: 'print', label: 'Print', category: 'io', color: '#f97316',
    description: '📤 Display text to the console/terminal',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'value', label: 'Value', type: 'any' },
    ],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
  },
  {
    id: 'input', label: 'Input', category: 'io', color: '#f97316',
    description: 'Read text from user via console',
    inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    outputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'value', label: 'Text', type: 'string' },
    ],
    config: [
      { id: 'prompt', label: 'Prompt', type: 'text', defaultValue: 'Enter value: ', placeholder: 'prompt text' },
    ],
  },
  {
    id: 'read-file', label: 'Read File', category: 'io', color: '#f97316',
    description: 'Read entire contents of a file',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'path', label: 'Path', type: 'string' },
    ],
    outputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'content', label: 'Content', type: 'string' },
    ],
  },
  {
    id: 'write-file', label: 'Write File', category: 'io', color: '#f97316',
    description: 'Write text content to a file',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'path', label: 'Path', type: 'string' },
      { id: 'content', label: 'Content', type: 'string' },
    ],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
  },

  // ═══════════ ERROR HANDLING ════════════════════════════════════════════════
  {
    id: 'try-catch', label: 'Try / Catch', category: 'errors', color: '#ef4444',
    description: 'Handle errors gracefully',
    inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    outputs: [
      { id: 'try', label: 'Try', type: 'flow' },
      { id: 'catch', label: 'Catch', type: 'flow' },
      { id: 'finally', label: 'Finally', type: 'flow' },
      { id: 'error', label: 'Error', type: 'string' },
    ],
  },
  {
    id: 'throw', label: 'Raise / Throw', category: 'errors', color: '#ef4444',
    description: 'Throw an exception',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'message', label: 'Message', type: 'string' },
    ],
    outputs: [],
    config: [
      { id: 'type', label: 'Type', type: 'text', defaultValue: 'Exception', placeholder: 'Exception' },
    ],
  },

  // ═══════════ GUI (TKINTER — Python) ════════════════════════════════════════
  {
    id: 'gui-window', label: 'Window', category: 'gui', color: '#d946ef',
    description: '🪟 Create the main app window (all widgets go inside this)',
    subcategory: 'Containers',
    tags: ['gui', 'window', 'ui', 'tkinter', 'app'],
    inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    outputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'window', label: 'Window', type: 'widget' },
    ],
    config: [
      { id: 'title', label: 'Title', type: 'text', defaultValue: 'My App', placeholder: 'Window title' },
      { id: 'width', label: 'Width', type: 'number', defaultValue: '400' },
      { id: 'height', label: 'Height', type: 'number', defaultValue: '300' },
    ],
  },
  {
    id: 'gui-label', label: 'Label', category: 'gui', color: '#d946ef',
    description: '📝 Display text that users can read (not editable)',
    subcategory: 'Display',
    tags: ['gui', 'label', 'text', 'display', 'ui'],
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'parent', label: 'Parent', type: 'widget' },
    ],
    outputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'widget', label: 'Widget', type: 'widget' },
    ],
    config: [
      { id: 'text', label: 'Text', type: 'text', defaultValue: 'Hello', placeholder: 'Label text' },
      { id: 'fontSize', label: 'Font Size', type: 'number', defaultValue: '12' },
    ],
  },
  {
    id: 'gui-button', label: 'Button', category: 'gui', color: '#d946ef',
    description: '🔘 Clickable button (users click to trigger actions)',
    subcategory: 'Input',
    tags: ['gui', 'button', 'click', 'input', 'interactive'],
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'parent', label: 'Parent', type: 'widget' },
    ],
    outputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'widget', label: 'Widget', type: 'widget' },
      { id: 'onClick', label: 'Click', type: 'flow' },
    ],
    config: [
      { id: 'text', label: 'Label', type: 'text', defaultValue: 'Click Me', placeholder: 'Button text' },
    ],
  },
  {
    id: 'gui-entry', label: 'Text Input', category: 'gui', color: '#d946ef',
    description: '⌨️ Text box where users can type data',
    subcategory: 'Input',
    tags: ['gui', 'textinput', 'form', 'input', 'field'],
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'parent', label: 'Parent', type: 'widget' },
    ],
    outputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'widget', label: 'Widget', type: 'widget' },
      { id: 'value', label: 'Text', type: 'string' },
    ],
    config: [
      { id: 'width', label: 'Width', type: 'number', defaultValue: '20' },
    ],
  },
  {
    id: 'gui-mainloop', label: 'Main Loop', category: 'gui', color: '#d946ef',
    description: '⚙️ Start the event loop (makes window stay open & respond to clicks)',
    subcategory: 'Events',
    tags: ['gui', 'mainloop', 'event', 'loop', 'runtime'],
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'window', label: 'Window', type: 'widget' },
    ],
    outputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
    ],
  },

  // ═══════════ NETWORK & JSON ═══════════════════════════════════════════════
  {
    id: 'http-get', label: 'HTTP GET', category: 'network', color: '#14b8a6',
    description: '📥 Fetch data from a website URL',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'url', label: 'URL', type: 'string' },
    ],
    outputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'response', label: 'Body', type: 'string' },
      { id: 'status', label: 'Status', type: 'number' },
    ],
  },
  {
    id: 'http-post', label: 'HTTP POST', category: 'network', color: '#14b8a6',
    description: 'Make an HTTP POST request',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'url', label: 'URL', type: 'string' },
      { id: 'body', label: 'Body', type: 'string' },
    ],
    outputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'response', label: 'Body', type: 'string' },
      { id: 'status', label: 'Status', type: 'number' },
    ],
  },
  {
    id: 'json-parse', label: 'Parse JSON', category: 'network', color: '#14b8a6',
    description: 'Parse a JSON string into an object',
    inputs: [{ id: 'json', label: 'JSON', type: 'string' }],
    outputs: [{ id: 'data', label: 'Data', type: 'object' }],
  },
  {
    id: 'json-stringify', label: 'To JSON', category: 'network', color: '#14b8a6',
    description: 'Convert object to a JSON string',
    inputs: [{ id: 'data', label: 'Data', type: 'any' }],
    outputs: [{ id: 'json', label: 'JSON', type: 'string' }],
  },

  // ═══════════ ADVANCED ═════════════════════════════════════════════════════
  {
    id: 'import-module', label: 'Import', category: 'advanced', color: '#6b7280',
    description: 'Import a module or library',
    inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    config: [
      { id: 'module', label: 'Module', type: 'text', defaultValue: '', placeholder: 'e.g. os, math, numpy' },
      { id: 'alias', label: 'Alias', type: 'text', defaultValue: '', placeholder: '(optional) e.g. np' },
    ],
  },
  {
    id: 'type-cast', label: 'Type Cast', category: 'advanced', color: '#6b7280',
    description: 'Convert value to another type',
    inputs: [{ id: 'value', label: 'Value', type: 'any' }],
    outputs: [{ id: 'result', label: 'Result', type: 'any' }],
    config: [
      { id: 'targetType', label: 'To', type: 'select', defaultValue: 'int', options: [
        { label: 'Integer', value: 'int' },
        { label: 'Float', value: 'float' },
        { label: 'String', value: 'str' },
        { label: 'Boolean', value: 'bool' },
      ]},
    ],
  },
  {
    id: 'sleep', label: 'Sleep', category: 'advanced', color: '#6b7280',
    description: 'Pause execution for N seconds',
    inputs: [
      { id: 'flow', label: 'Flow', type: 'flow' },
      { id: 'seconds', label: 'Seconds', type: 'number' },
    ],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
  },
  {
    id: 'custom-code', label: 'Custom Code', category: 'advanced', color: '#6b7280',
    description: 'Insert raw code directly',
    inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
    config: [
      { id: 'code', label: 'Code', type: 'textarea', defaultValue: '', placeholder: '# your code here…' },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getNodeDefinition(templateId: string): NodeTemplate | undefined {
  return nodeDefinitions.find((n) => n.id === templateId);
}

export function getNodesByCategory(category: NodeCategory): NodeTemplate[] {
  return nodeDefinitions.filter((n) => n.category === category);
}

export const ALL_CATEGORIES: NodeCategory[] = [
  'flow', 'variables', 'data', 'math', 'comparison', 'string',
  'collections', 'functions', 'io', 'errors', 'gui', 'network', 'advanced',
];
