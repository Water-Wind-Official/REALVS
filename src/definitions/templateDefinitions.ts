// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Template Definitions
// Pre-built application templates with auto-assembled node graphs
// ═══════════════════════════════════════════════════════════════════════════════

import { Node, Edge } from 'reactflow';
import { VSNodeData } from '../types';

export interface GuiTemplate {
  id: string;
  label: string;
  description: string;
  preview: string;
  nodes: Node<VSNodeData>[];
  edges: Edge[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 1: GUI Counter App
// Button that increments a counter, displays number, and changes background color
// ═══════════════════════════════════════════════════════════════════════════════

export const counterAppTemplate: GuiTemplate = {
  id: 'template-counter-app',
  label: 'Counter App',
  description: 'Interactive button counter with color-changing background',
  preview: 'Click to increment the counter and cycle through colors',
  nodes: [
    // Start node
    {
      id: 'node-start',
      type: 'vsNode',
      position: { x: 50, y: 80 },
      data: {
        templateId: 'start',
        label: 'Start',
        category: 'flow',
        description: 'Program entry point — execution begins here',
        inputs: [],
        outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        configValues: {},
        color: '#8b5cf6',
      } as VSNodeData,
    },
    // Create Window
    {
      id: 'node-window',
      type: 'vsNode',
      position: { x: 280, y: 50 },
      data: {
        templateId: 'gui-window',
        label: 'Window',
        category: 'gui',
        description: 'Create a new window for the application',
        inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'window', label: 'Window', type: 'widget' },
        ],
        config: [
          { id: 'title', label: 'Title', type: 'text', defaultValue: 'Counter App' },
          { id: 'width', label: 'Width', type: 'number', defaultValue: '400' },
          { id: 'height', label: 'Height', type: 'number', defaultValue: '300' },
          { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
        ],
        configValues: {
          title: 'Counter App',
          width: '400',
          height: '300',
          bgColor: '#ffffff',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Label: Counter Display
    {
      id: 'node-label-display',
      type: 'vsNode',
      position: { x: 540, y: 30 },
      data: {
        templateId: 'gui-label',
        label: 'Label',
        category: 'gui',
        description: 'Display text label',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'parent', label: 'Parent', type: 'widget' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'widget', label: 'Widget', type: 'widget' },
        ],
        config: [
          { id: 'text', label: 'Text', type: 'text', defaultValue: 'Counter: 0' },
          { id: 'fontSize', label: 'Font Size', type: 'number', defaultValue: '24' },
        ],
        configValues: {
          text: 'Counter: 0',
          fontSize: '24',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Label: Instructions
    {
      id: 'node-label-instructions',
      type: 'vsNode',
      position: { x: 540, y: 130 },
      data: {
        templateId: 'gui-label',
        label: 'Label',
        category: 'gui',
        description: 'Display text label',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'parent', label: 'Parent', type: 'widget' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'widget', label: 'Widget', type: 'widget' },
        ],
        config: [
          { id: 'text', label: 'Text', type: 'text', defaultValue: 'Click the button below' },
          { id: 'fontSize', label: 'Font Size', type: 'number', defaultValue: '12' },
        ],
        configValues: {
          text: 'Click the button below',
          fontSize: '12',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Button: Increment
    {
      id: 'node-button-increment',
      type: 'vsNode',
      position: { x: 540, y: 220 },
      data: {
        templateId: 'gui-button',
        label: 'Button',
        category: 'gui',
        description: 'Interactive button widget',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'parent', label: 'Parent', type: 'widget' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'onClick', label: 'On Click', type: 'flow' },
          { id: 'widget', label: 'Widget', type: 'widget' },
        ],
        config: [
          { id: 'text', label: 'Label', type: 'text', defaultValue: 'Increment Counter' },
        ],
        configValues: {
          text: 'Increment Counter',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Variable: Counter (Initialize to 0)
    {
      id: 'node-var-counter',
      type: 'vsNode',
      position: { x: 800, y: 80 },
      data: {
        templateId: 'number-literal',
        label: 'Number',
        category: 'data',
        description: 'Create a number value',
        inputs: [],
        outputs: [{ id: 'value', label: 'Value', type: 'number' }],
        config: [
          { id: 'value', label: 'Number', type: 'number', defaultValue: '0' },
        ],
        configValues: {
          value: '0',
        },
        color: '#22c55e',
      } as VSNodeData,
    },
    // Math: Add (for incrementing)
    {
      id: 'node-math-add',
      type: 'vsNode',
      position: { x: 800, y: 180 },
      data: {
        templateId: 'math-add',
        label: 'Add',
        category: 'math',
        description: 'Add two numbers together',
        inputs: [
          { id: 'a', label: 'A', type: 'number' },
          { id: 'b', label: 'B', type: 'number' },
        ],
        outputs: [{ id: 'result', label: 'Result', type: 'number' }],
        configValues: {},
        color: '#3b82f6',
      } as VSNodeData,
    },
    // String: Format (for display)
    {
      id: 'node-string-format',
      type: 'vsNode',
      position: { x: 1000, y: 130 },
      data: {
        templateId: 'string-format',
        label: 'String Format',
        category: 'string',
        description: 'Format text with variable substitution',
        inputs: [
          { id: 'template', label: 'Template', type: 'string' },
          { id: 'value', label: 'Value', type: 'any' },
        ],
        outputs: [{ id: 'result', label: 'Result', type: 'string' }],
        config: [
          { id: 'format', label: 'Format String', type: 'text', defaultValue: 'Counter: {0}' },
        ],
        configValues: {
          format: 'Counter: {0}',
        },
        color: '#10b981',
      } as VSNodeData,
    },
    // Create a list of colors for cycling
    {
      id: 'node-colors-list',
      type: 'vsNode',
      position: { x: 800, y: 320 },
      data: {
        templateId: 'list-create',
        label: 'Create List',
        category: 'collections',
        description: 'Create a list of items',
        inputs: [],
        outputs: [{ id: 'list', label: 'List', type: 'list' }],
        config: [
          { id: 'items', label: 'Items (comma-separated)', type: 'textarea', defaultValue: '#FFE5E5,#E5F5FF,#E5FFE5,#FFFFE5,#FFE5FF' },
        ],
        configValues: {
          items: '#FFE5E5,#E5F5FF,#E5FFE5,#FFFFE5,#FFE5FF',
        },
        color: '#a855f7',
      } as VSNodeData,
    },
    // Modulo operation (to cycle through colors)
    {
      id: 'node-math-modulo',
      type: 'vsNode',
      position: { x: 1000, y: 280 },
      data: {
        templateId: 'math-modulo',
        label: 'Modulo',
        category: 'math',
        description: 'Get remainder after division (for cycling)',
        inputs: [
          { id: 'a', label: 'A', type: 'number' },
          { id: 'b', label: 'B', type: 'number' },
        ],
        outputs: [{ id: 'result', label: 'Result', type: 'number' }],
        configValues: {},
        color: '#3b82f6',
      } as VSNodeData,
    },
    // Get Item from list (color selection)
    {
      id: 'node-get-item',
      type: 'vsNode',
      position: { x: 1200, y: 280 },
      data: {
        templateId: 'list-get',
        label: 'Get Item',
        category: 'collections',
        description: 'Get item at index from list',
        inputs: [
          { id: 'list', label: 'List', type: 'list' },
          { id: 'index', label: 'Index', type: 'number' },
        ],
        outputs: [{ id: 'item', label: 'Item', type: 'any' }],
        configValues: {},
        color: '#a855f7',
      } as VSNodeData,
    },
    // Update Window background color
    {
      id: 'node-set-bg-color',
      type: 'vsNode',
      position: { x: 1400, y: 220 },
      data: {
        templateId: 'set-property',
        label: 'Set Property',
        category: 'gui',
        description: 'Set widget property',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'object', label: 'Object', type: 'widget' },
          { id: 'value', label: 'Value', type: 'any' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'object', label: 'Object', type: 'widget' },
        ],
        config: [
          { id: 'property', label: 'Property', type: 'text', defaultValue: 'bgColor' },
        ],
        configValues: {
          property: 'bgColor',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Update Label text (with new counter value)
    {
      id: 'node-update-label',
      type: 'vsNode',
      position: { x: 1400, y: 340 },
      data: {
        templateId: 'set-property',
        label: 'Set Property',
        category: 'gui',
        description: 'Set widget property',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'object', label: 'Object', type: 'widget' },
          { id: 'value', label: 'Value', type: 'any' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'object', label: 'Object', type: 'widget' },
        ],
        config: [
          { id: 'property', label: 'Property', type: 'text', defaultValue: 'text' },
        ],
        configValues: {
          property: 'text',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Main Loop
    {
      id: 'node-main-loop',
      type: 'vsNode',
      position: { x: 1600, y: 100 },
      data: {
        templateId: 'gui-mainloop',
        label: 'Main Loop',
        category: 'gui',
        description: 'Start the event loop (keep window open)',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'window', label: 'Window', type: 'widget' },
        ],
        outputs: [],
        configValues: {},
        color: '#d946ef',
      } as VSNodeData,
    },
    // End
    {
      id: 'node-end',
      type: 'vsNode',
      position: { x: 1800, y: 100 },
      data: {
        templateId: 'end',
        label: 'End',
        category: 'flow',
        description: 'Program exit point',
        inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        outputs: [],
        configValues: {},
        color: '#8b5cf6',
      } as VSNodeData,
    },
  ],
  edges: [
    // Flow: Start → Window
    { id: 'edge-start-window', source: 'node-start', target: 'node-window', sourceHandle: 'flow', targetHandle: 'flow' },
    // Window parent → Label Display
    { id: 'edge-window-label-display', source: 'node-window', target: 'node-label-display', sourceHandle: 'window', targetHandle: 'parent' },
    // Flow: Window → Label Display
    { id: 'edge-flow-window-label-display', source: 'node-window', target: 'node-label-display', sourceHandle: 'flow', targetHandle: 'flow' },
    // Window parent → Label Instructions
    { id: 'edge-window-label-instructions', source: 'node-window', target: 'node-label-instructions', sourceHandle: 'window', targetHandle: 'parent' },
    // Flow: Label Display → Label Instructions
    { id: 'edge-label-display-label-instructions', source: 'node-label-display', target: 'node-label-instructions', sourceHandle: 'flow', targetHandle: 'flow' },
    // Window parent → Button
    { id: 'edge-window-button', source: 'node-window', target: 'node-button-increment', sourceHandle: 'window', targetHandle: 'parent' },
    // Flow: Label Instructions → Button
    { id: 'edge-label-instructions-button', source: 'node-label-instructions', target: 'node-button-increment', sourceHandle: 'flow', targetHandle: 'flow' },
    // Button click → Print statement
    { id: 'edge-button-add', source: 'node-button-increment', target: 'node-update-label', sourceHandle: 'onClick', targetHandle: 'flow' },
    // Initial value (0) → Add
    { id: 'edge-zero-add', source: 'node-var-counter', target: 'node-math-add', sourceHandle: 'value', targetHandle: 'a' },
    // 1 → Add (increment by 1)
    { id: 'edge-one-add', source: 'node-var-counter', target: 'node-math-add', sourceHandle: 'value', targetHandle: 'b' },
    // Add result → String Format
    { id: 'edge-add-format', source: 'node-math-add', target: 'node-string-format', sourceHandle: 'result', targetHandle: 'value' },
    // Formatted string → Update Label
    { id: 'edge-format-update-label', source: 'node-string-format', target: 'node-update-label', sourceHandle: 'result', targetHandle: 'value' },
    // Label widget → Update Label
    { id: 'edge-label-widget-update', source: 'node-label-display', target: 'node-update-label', sourceHandle: 'widget', targetHandle: 'object' },
    // Counter → Modulo
    { id: 'edge-counter-modulo', source: 'node-math-add', target: 'node-math-modulo', sourceHandle: 'result', targetHandle: 'a' },
    // Modulo → Get Item
    { id: 'edge-modulo-getitem', source: 'node-math-modulo', target: 'node-get-item', sourceHandle: 'result', targetHandle: 'index' },
    // Colors list → Get Item
    { id: 'edge-colors-getitem', source: 'node-colors-list', target: 'node-get-item', sourceHandle: 'list', targetHandle: 'list' },
    // Get Item → Set BG Color
    { id: 'edge-color-setbg', source: 'node-get-item', target: 'node-set-bg-color', sourceHandle: 'item', targetHandle: 'value' },
    // Window → Set BG Color
    { id: 'edge-window-setbg', source: 'node-window', target: 'node-set-bg-color', sourceHandle: 'window', targetHandle: 'object' },
    // Update Label → Set BG Color (flow)
    { id: 'edge-update-setbg', source: 'node-update-label', target: 'node-set-bg-color', sourceHandle: 'flow', targetHandle: 'flow' },
    // Set BG Color → Main Loop
    { id: 'edge-setbg-mainloop', source: 'node-set-bg-color', target: 'node-main-loop', sourceHandle: 'flow', targetHandle: 'flow' },
    // Window → Main Loop
    { id: 'edge-window-mainloop', source: 'node-window', target: 'node-main-loop', sourceHandle: 'window', targetHandle: 'window' },
    // Main Loop → End
    { id: 'edge-mainloop-end', source: 'node-main-loop', target: 'node-end', sourceHandle: 'flow', targetHandle: 'flow' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 2: Website Pinger
// Pings a website and displays the response status
// ═══════════════════════════════════════════════════════════════════════════════

export const websitePingerTemplate: GuiTemplate = {
  id: 'template-website-pinger',
  label: 'Website Pinger',
  description: 'Ping a website and display response status',
  preview: 'Enter URL and click to ping, displays status results',
  nodes: [
    // Start node
    {
      id: 'node-start',
      type: 'vsNode',
      position: { x: 50, y: 80 },
      data: {
        templateId: 'start',
        label: 'Start',
        category: 'flow',
        description: 'Program entry point — execution begins here',
        inputs: [],
        outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        configValues: {},
        color: '#8b5cf6',
      } as VSNodeData,
    },
    // Create Window
    {
      id: 'node-window',
      type: 'vsNode',
      position: { x: 280, y: 50 },
      data: {
        templateId: 'gui-window',
        label: 'Window',
        category: 'gui',
        description: 'Create a new window for the application',
        inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'window', label: 'Window', type: 'widget' },
        ],
        config: [
          { id: 'title', label: 'Title', type: 'text', defaultValue: 'Website Pinger' },
          { id: 'width', label: 'Width', type: 'number', defaultValue: '500' },
          { id: 'height', label: 'Height', type: 'number', defaultValue: '400' },
          { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
        ],
        configValues: {
          title: 'Website Pinger',
          width: '500',
          height: '400',
          bgColor: '#ffffff',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Title Label
    {
      id: 'node-label-title',
      type: 'vsNode',
      position: { x: 540, y: 10 },
      data: {
        templateId: 'gui-label',
        label: 'Label',
        category: 'gui',
        description: 'Display text label',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'parent', label: 'Parent', type: 'widget' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'widget', label: 'Widget', type: 'widget' },
        ],
        config: [
          { id: 'text', label: 'Text', type: 'text', defaultValue: 'Website URL:' },
          { id: 'fontSize', label: 'Font Size', type: 'number', defaultValue: '14' },
        ],
        configValues: {
          text: 'Website URL:',
          fontSize: '14',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Input field for URL
    {
      id: 'node-input-url',
      type: 'vsNode',
      position: { x: 540, y: 80 },
      data: {
        templateId: 'gui-entry',
        label: 'Text Input',
        category: 'gui',
        description: 'Text input field',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'parent', label: 'Parent', type: 'widget' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'value', label: 'Value', type: 'string' },
          { id: 'widget', label: 'Widget', type: 'widget' },
        ],
        config: [
          { id: 'width', label: 'Width', type: 'number', defaultValue: '40' },
          { id: 'defaultValue', label: 'Default', type: 'text', defaultValue: 'example.com' },
        ],
        configValues: {
          width: '40',
          defaultValue: 'example.com',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Ping Button
    {
      id: 'node-button-ping',
      type: 'vsNode',
      position: { x: 540, y: 160 },
      data: {
        templateId: 'gui-button',
        label: 'Button',
        category: 'gui',
        description: 'Interactive button widget',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'parent', label: 'Parent', type: 'widget' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'onClick', label: 'On Click', type: 'flow' },
          { id: 'widget', label: 'Widget', type: 'widget' },
        ],
        config: [
          { id: 'text', label: 'Label', type: 'text', defaultValue: 'Ping Website' },
        ],
        configValues: {
          text: 'Ping Website',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Results Label (initially empty)
    {
      id: 'node-label-results',
      type: 'vsNode',
      position: { x: 540, y: 240 },
      data: {
        templateId: 'gui-label',
        label: 'Label',
        category: 'gui',
        description: 'Display text label',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'parent', label: 'Parent', type: 'widget' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'widget', label: 'Widget', type: 'widget' },
        ],
        config: [
          { id: 'text', label: 'Text', type: 'text', defaultValue: 'Status: Waiting...' },
          { id: 'fontSize', label: 'Font Size', type: 'number', defaultValue: '12' },
        ],
        configValues: {
          text: 'Status: Waiting...',
          fontSize: '12',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // HTTP Request (make the ping request)
    {
      id: 'node-http-request',
      type: 'vsNode',
      position: { x: 800, y: 120 },
      data: {
        templateId: 'http-get',
        label: 'HTTP Request',
        category: 'network',
        description: 'Make HTTP request to URL',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'url', label: 'URL', type: 'string' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'status', label: 'Status Code', type: 'number' },
          { id: 'response', label: 'Response', type: 'string' },
        ],
        config: [
          { id: 'method', label: 'Method', type: 'select', defaultValue: 'GET', options: [{ label: 'GET', value: 'GET' }, { label: 'HEAD', value: 'HEAD' }] },
        ],
        configValues: {
          method: 'GET',
        },
        color: '#14b8a6',
      } as VSNodeData,
    },
    // String Format (format the result)
    {
      id: 'node-string-format',
      type: 'vsNode',
      position: { x: 1000, y: 180 },
      data: {
        templateId: 'string-format',
        label: 'String Format',
        category: 'string',
        description: 'Format text with variable substitution',
        inputs: [
          { id: 'template', label: 'Template', type: 'string' },
          { id: 'value', label: 'Value', type: 'any' },
        ],
        outputs: [{ id: 'result', label: 'Result', type: 'string' }],
        config: [
          { id: 'format', label: 'Format String', type: 'text', defaultValue: 'Status: {0} - Connection successful!' },
        ],
        configValues: {
          format: 'Status: {0} - Connection successful!',
        },
        color: '#10b981',
      } as VSNodeData,
    },
    // Error Handler (catch failed requests)
    {
      id: 'node-error-handler',
      type: 'vsNode',
      position: { x: 1000, y: 300 },
      data: {
        templateId: 'try-catch',
        label: 'Try-Catch',
        category: 'errors',
        description: 'Handle errors gracefully',
        inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        outputs: [
          { id: 'success', label: 'Success', type: 'flow' },
          { id: 'error', label: 'Error', type: 'flow' },
        ],
        configValues: {},
        color: '#ef4444',
      } as VSNodeData,
    },
    // Error Message
    {
      id: 'node-error-message',
      type: 'vsNode',
      position: { x: 1200, y: 300 },
      data: {
        templateId: 'string-literal',
        label: 'String',
        category: 'data',
        description: 'Create a string value',
        inputs: [],
        outputs: [{ id: 'value', label: 'Value', type: 'string' }],
        config: [
          { id: 'value', label: 'String', type: 'textarea', defaultValue: 'Status: Connection Failed ❌' },
        ],
        configValues: {
          value: 'Status: Connection Failed ❌',
        },
        color: '#22c55e',
      } as VSNodeData,
    },
    // Set Results (update the label with result)
    {
      id: 'node-set-results',
      type: 'vsNode',
      position: { x: 1200, y: 180 },
      data: {
        templateId: 'set-property',
        label: 'Set Property',
        category: 'gui',
        description: 'Set widget property',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'object', label: 'Object', type: 'widget' },
          { id: 'value', label: 'Value', type: 'any' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'object', label: 'Object', type: 'widget' },
        ],
        config: [
          { id: 'property', label: 'Property', type: 'text', defaultValue: 'text' },
        ],
        configValues: {
          property: 'text',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Main Loop
    {
      id: 'node-main-loop',
      type: 'vsNode',
      position: { x: 1400, y: 100 },
      data: {
        templateId: 'gui-mainloop',
        label: 'Main Loop',
        category: 'gui',
        description: 'Start the event loop (keep window open)',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'window', label: 'Window', type: 'widget' },
        ],
        outputs: [],
        configValues: {},
        color: '#d946ef',
      } as VSNodeData,
    },
    // End
    {
      id: 'node-end',
      type: 'vsNode',
      position: { x: 1600, y: 100 },
      data: {
        templateId: 'end',
        label: 'End',
        category: 'flow',
        description: 'Program exit point',
        inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        outputs: [],
        configValues: {},
        color: '#8b5cf6',
      } as VSNodeData,
    },
  ],
  edges: [
    // Start → Window
    { id: 'edge-start-window', source: 'node-start', target: 'node-window', sourceHandle: 'flow', targetHandle: 'flow' },
    // Window → Title Label
    { id: 'edge-window-title', source: 'node-window', target: 'node-label-title', sourceHandle: 'flow', targetHandle: 'flow' },
    { id: 'edge-window-title-parent', source: 'node-window', target: 'node-label-title', sourceHandle: 'window', targetHandle: 'parent' },
    // Title → Input URL
    { id: 'edge-title-input', source: 'node-label-title', target: 'node-input-url', sourceHandle: 'flow', targetHandle: 'flow' },
    { id: 'edge-window-input-parent', source: 'node-window', target: 'node-input-url', sourceHandle: 'window', targetHandle: 'parent' },
    // Input → Ping Button
    { id: 'edge-input-button', source: 'node-input-url', target: 'node-button-ping', sourceHandle: 'flow', targetHandle: 'flow' },
    { id: 'edge-window-button-parent', source: 'node-window', target: 'node-button-ping', sourceHandle: 'window', targetHandle: 'parent' },
    // Input → Results Label
    { id: 'edge-input-results', source: 'node-input-url', target: 'node-label-results', sourceHandle: 'flow', targetHandle: 'flow' },
    { id: 'edge-window-results-parent', source: 'node-window', target: 'node-label-results', sourceHandle: 'window', targetHandle: 'parent' },
    // Button click → HTTP Request
    { id: 'edge-button-http', source: 'node-button-ping', target: 'node-http-request', sourceHandle: 'onClick', targetHandle: 'flow' },
    // Input value → HTTP Request URL
    { id: 'edge-input-url-http', source: 'node-input-url', target: 'node-http-request', sourceHandle: 'value', targetHandle: 'url' },
    // Error handling on HTTP request
    { id: 'edge-http-error', source: 'node-http-request', target: 'node-error-handler', sourceHandle: 'flow', targetHandle: 'flow' },
    // HTTP Status → Format String
    { id: 'edge-status-format', source: 'node-http-request', target: 'node-string-format', sourceHandle: 'status', targetHandle: 'value' },
    // Formatted text → Set Results (success path)
    { id: 'edge-format-set', source: 'node-string-format', target: 'node-set-results', sourceHandle: 'result', targetHandle: 'value' },
    // Error message → Set Results (error path)
    { id: 'edge-error-message-set', source: 'node-error-message', target: 'node-set-results', sourceHandle: 'value', targetHandle: 'value' },
    // Results widget → Set Results
    { id: 'edge-results-set', source: 'node-label-results', target: 'node-set-results', sourceHandle: 'widget', targetHandle: 'object' },
    // Set Results → Main Loop
    { id: 'edge-set-mainloop', source: 'node-set-results', target: 'node-main-loop', sourceHandle: 'flow', targetHandle: 'flow' },
    // Window → Main Loop
    { id: 'edge-window-mainloop', source: 'node-window', target: 'node-main-loop', sourceHandle: 'window', targetHandle: 'window' },
    // Main Loop → End
    { id: 'edge-mainloop-end', source: 'node-main-loop', target: 'node-end', sourceHandle: 'flow', targetHandle: 'flow' },
  ],
};

// Export all templates as array
export const allTemplates: GuiTemplate[] = [counterAppTemplate, websitePingerTemplate];
