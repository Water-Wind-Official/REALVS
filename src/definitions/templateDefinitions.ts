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
  label: 'Button Counter',
  description: 'Button that tracks and displays the number of times it was clicked',
  preview: 'Click the button to increment and display the counter',
  nodes: [
    // Start node
    {
      id: 'node-start',
      type: 'vsNode',
      position: { x: 50, y: 200 },
      data: {
        templateId: 'start',
        label: 'Start',
        category: 'flow',
        description: 'Program entry point',
        inputs: [],
        outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        configValues: {},
        color: '#8b5cf6',
      } as VSNodeData,
    },
    // Initialize counter to 0
    {
      id: 'node-zero',
      type: 'vsNode',
      position: { x: 200, y: 150 },
      data: {
        templateId: 'number-literal',
        label: 'Number',
        category: 'data',
        description: 'Initial counter value',
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
    // Set counter variable
    {
      id: 'node-set-counter-init',
      type: 'vsNode',
      position: { x: 350, y: 150 },
      data: {
        templateId: 'set-variable',
        label: 'Set Variable',
        category: 'variables',
        description: 'Initialize counter',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'value', label: 'Value', type: 'any' },
        ],
        outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        config: [
          { id: 'name', label: 'Name', type: 'text', defaultValue: 'clicks' },
        ],
        configValues: {
          name: 'clicks',
        },
        color: '#06b6d4',
      } as VSNodeData,
    },
    // Window
    {
      id: 'node-window',
      type: 'vsNode',
      position: { x: 500, y: 100 },
      data: {
        templateId: 'gui-window',
        label: 'Window',
        category: 'gui',
        description: 'Create a window',
        inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'window', label: 'Window', type: 'widget' },
        ],
        config: [
          { id: 'title', label: 'Title', type: 'text', defaultValue: 'Click Counter' },
          { id: 'width', label: 'Width', type: 'number', defaultValue: '300' },
          { id: 'height', label: 'Height', type: 'number', defaultValue: '200' },
        ],
        configValues: {
          title: 'Click Counter',
          width: '300',
          height: '200',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Display label
    {
      id: 'node-label',
      type: 'vsNode',
      position: { x: 700, y: 100 },
      data: {
        templateId: 'gui-label',
        label: 'Label',
        category: 'gui',
        description: 'Display count',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'parent', label: 'Parent', type: 'widget' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'widget', label: 'Widget', type: 'widget' },
        ],
        config: [
          { id: 'text', label: 'Text', type: 'text', defaultValue: 'Clicks: 0' },
          { id: 'fontSize', label: 'Font Size', type: 'number', defaultValue: '18' },
        ],
        configValues: {
          text: 'Clicks: 0',
          fontSize: '18',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Button
    {
      id: 'node-button',
      type: 'vsNode',
      position: { x: 700, y: 200 },
      data: {
        templateId: 'gui-button',
        label: 'Button',
        category: 'gui',
        description: 'Click button',
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
          { id: 'text', label: 'Label', type: 'text', defaultValue: 'Click Me!' },
        ],
        configValues: {
          text: 'Click Me!',
        },
        color: '#d946ef',
      } as VSNodeData,
    },
    // Get current counter
    {
      id: 'node-get-counter',
      type: 'vsNode',
      position: { x: 900, y: 180 },
      data: {
        templateId: 'get-variable',
        label: 'Get Variable',
        category: 'variables',
        description: 'Get current click count',
        inputs: [],
        outputs: [{ id: 'value', label: 'Value', type: 'any' }],
        config: [
          { id: 'name', label: 'Name', type: 'text', defaultValue: 'clicks' },
        ],
        configValues: {
          name: 'clicks',
        },
        color: '#06b6d4',
      } as VSNodeData,
    },
    // Number 1
    {
      id: 'node-one',
      type: 'vsNode',
      position: { x: 900, y: 280 },
      data: {
        templateId: 'number-literal',
        label: 'Number',
        category: 'data',
        description: 'Increment value',
        inputs: [],
        outputs: [{ id: 'value', label: 'Value', type: 'number' }],
        config: [
          { id: 'value', label: 'Number', type: 'number', defaultValue: '1' },
        ],
        configValues: {
          value: '1',
        },
        color: '#22c55e',
      } as VSNodeData,
    },
    // Add 1
    {
      id: 'node-add',
      type: 'vsNode',
      position: { x: 1050, y: 220 },
      data: {
        templateId: 'math-add',
        label: 'Add',
        category: 'math',
        description: 'Increment counter',
        inputs: [
          { id: 'a', label: 'A', type: 'number' },
          { id: 'b', label: 'B', type: 'number' },
        ],
        outputs: [{ id: 'result', label: 'Result', type: 'number' }],
        configValues: {},
        color: '#3b82f6',
      } as VSNodeData,
    },
    // Format string
    {
      id: 'node-format',
      type: 'vsNode',
      position: { x: 1200, y: 220 },
      data: {
        templateId: 'string-format',
        label: 'String Format',
        category: 'string',
        description: 'Format display text',
        inputs: [
          { id: 'value', label: 'Value', type: 'any' },
        ],
        outputs: [{ id: 'result', label: 'Result', type: 'string' }],
        config: [
          { id: 'format', label: 'Format String', type: 'text', defaultValue: 'Clicks: {0}' },
        ],
        configValues: {
          format: 'Clicks: {0}',
        },
        color: '#10b981',
      } as VSNodeData,
    },
    // Update label
    {
      id: 'node-update-label',
      type: 'vsNode',
      position: { x: 1350, y: 220 },
      data: {
        templateId: 'set-property',
        label: 'Set Property',
        category: 'gui',
        description: 'Update label',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'object', label: 'Object', type: 'widget' },
          { id: 'value', label: 'Value', type: 'any' },
        ],
        outputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
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
    // Save new counter
    {
      id: 'node-save-counter',
      type: 'vsNode',
      position: { x: 1350, y: 320 },
      data: {
        templateId: 'set-variable',
        label: 'Set Variable',
        category: 'variables',
        description: 'Save new counter value',
        inputs: [
          { id: 'flow', label: 'Flow', type: 'flow' },
          { id: 'value', label: 'Value', type: 'any' },
        ],
        outputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        config: [
          { id: 'name', label: 'Name', type: 'text', defaultValue: 'clicks' },
        ],
        configValues: {
          name: 'clicks',
        },
        color: '#06b6d4',
      } as VSNodeData,
    },
    // Main loop
    {
      id: 'node-main-loop',
      type: 'vsNode',
      position: { x: 1500, y: 150 },
      data: {
        templateId: 'gui-mainloop',
        label: 'Main Loop',
        category: 'gui',
        description: 'Run event loop',
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
      position: { x: 1650, y: 150 },
      data: {
        templateId: 'end',
        label: 'End',
        category: 'flow',
        description: 'End program',
        inputs: [{ id: 'flow', label: 'Flow', type: 'flow' }],
        outputs: [],
        configValues: {},
        color: '#8b5cf6',
      } as VSNodeData,
    },
  ],
  edges: [
    // Initialize counter flow
    { id: 'e1', source: 'node-start', target: 'node-set-counter-init', sourceHandle: 'flow', targetHandle: 'flow' },
    { id: 'e2', source: 'node-zero', target: 'node-set-counter-init', sourceHandle: 'value', targetHandle: 'value' },
    // Create window and UI flow
    { id: 'e3', source: 'node-set-counter-init', target: 'node-window', sourceHandle: 'flow', targetHandle: 'flow' },
    { id: 'e4', source: 'node-window', target: 'node-label', sourceHandle: 'flow', targetHandle: 'flow' },
    { id: 'e5', source: 'node-window', target: 'node-label', sourceHandle: 'window', targetHandle: 'parent' },
    { id: 'e6', source: 'node-label', target: 'node-button', sourceHandle: 'flow', targetHandle: 'flow' },
    { id: 'e7', source: 'node-window', target: 'node-button', sourceHandle: 'window', targetHandle: 'parent' },
    // Button click handler flow
    { id: 'e8', source: 'node-button', target: 'node-update-label', sourceHandle: 'onClick', targetHandle: 'flow' },
    // Data: get counter and increment
    { id: 'e9', source: 'node-get-counter', target: 'node-add', sourceHandle: 'value', targetHandle: 'a' },
    { id: 'e10', source: 'node-one', target: 'node-add', sourceHandle: 'value', targetHandle: 'b' },
    // Format and update display
    { id: 'e11', source: 'node-add', target: 'node-format', sourceHandle: 'result', targetHandle: 'value' },
    { id: 'e12', source: 'node-format', target: 'node-update-label', sourceHandle: 'result', targetHandle: 'value' },
    { id: 'e13', source: 'node-label', target: 'node-update-label', sourceHandle: 'widget', targetHandle: 'object' },
    // Save new value after update
    { id: 'e14', source: 'node-update-label', target: 'node-save-counter', sourceHandle: 'flow', targetHandle: 'flow' },
    { id: 'e15', source: 'node-add', target: 'node-save-counter', sourceHandle: 'result', targetHandle: 'value' },
    // Main loop
    { id: 'e16', source: 'node-save-counter', target: 'node-main-loop', sourceHandle: 'flow', targetHandle: 'flow' },
    { id: 'e17', source: 'node-window', target: 'node-main-loop', sourceHandle: 'window', targetHandle: 'window' },
    { id: 'e18', source: 'node-main-loop', target: 'node-end', sourceHandle: 'flow', targetHandle: 'flow' },
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
