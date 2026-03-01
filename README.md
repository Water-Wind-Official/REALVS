# REALVS - Visual Scripting Interface

A production-quality, state-of-the-art visual scripting interface that makes programming in Python and C# intuitive and accessible through a node-based visual editor.

## Features

### 🎨 **Intuitive Visual Interface**
- Modern, clean UI built with React and TailwindCSS
- Node-based visual editor with drag-and-drop functionality
- Real-time code generation and preview
- Color-coded node categories for easy identification

### 🔧 **Comprehensive Node Library**
- **Control Flow**: Start, If Statements, For Loops, Functions
- **Data Operations**: Variables, Math operations (Add, Subtract, Multiply, Divide)
- **Input/Output**: User input, Console output
- **Comparison**: Logical operations and comparisons

### 🐍 **Python Support**
- Generate clean, idiomatic Python code
- Support for functions, loops, conditionals
- Variable management and user input handling

### 🔷 **C# Support**
- Generate production-ready C# code
- Proper class structure and Main method
- Type-safe operations and modern C# syntax

### ⚡ **Real-time Features**
- Live code preview with Monaco Editor
- Syntax highlighting for both Python and C#
- Automatic code generation as you build
- Language switching with immediate preview updates

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

## How to Use

### Building Your First Script

1. **Start with a Start Node**: Every script begins with a Start node
2. **Add Nodes**: Drag nodes from the library or click to add them
3. **Connect Nodes**: Drag from output handles to input handles to create connections
4. **Configure Logic**: Build your program flow with conditional branches and loops
5. **Preview Code**: See generated code in real-time on the right panel
6. **Switch Languages**: Toggle between Python and C# to see equivalent code

### Node Categories

- 🟢 **Input Nodes** (Green): Data entry points
- 🔵 **Output Nodes** (Orange): Data display and results
- 🟣 **Control Nodes** (Purple): Program flow control
- 🔴 **Data Nodes** (Cyan): Data manipulation and storage

### Example Workflows

#### Simple Calculator
1. Add Input node → Add Math node → Add Print node
2. Connect the flow: Input → Math Operation → Output

#### Conditional Logic
1. Add Input → Add Compare → Add If Statement
2. Connect different branches for true/false conditions
3. Add different operations for each branch

#### Loop Processing
1. Add For Loop with start/end values
2. Add operations inside the loop
3. Connect loop body to process iterations

## Architecture

### Core Components

- **VisualScriptingEditor**: Main editor with React Flow integration
- **NodeLibrary**: Sidebar with draggable node templates
- **CodePreview**: Real-time code display with Monaco Editor
- **CodeGenerator**: Converts visual graphs to executable code
- **VisualScriptingStore**: State management with Zustand

### Technology Stack

- **Frontend**: React 18 with TypeScript
- **Visual Editor**: React Flow for node-based editing
- **Code Editor**: Monaco Editor for syntax highlighting
- **Styling**: TailwindCSS for modern, responsive design
- **State Management**: Zustand for simple, powerful state handling
- **Build Tool**: Vite for fast development and building

## Project Structure

```
src/
├── components/
│   ├── VisualScriptingEditor.tsx    # Main editor component
│   ├── NodeLibrary.tsx              # Node palette
│   └── CodePreview.tsx              # Code display
├── store/
│   └── visualScriptingStore.ts      # State management
├── utils/
│   └── codeGenerator.ts             # Code generation logic
├── App.tsx                          # Root component
├── main.tsx                         # Entry point
└── index.css                        # Global styles
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Generation

The code generator translates the visual node graph into executable code:

1. **Graph Traversal**: Follows connections from Start node
2. **Node Processing**: Converts each node to language-specific code
3. **Flow Control**: Handles branches, loops, and conditional logic
4. **Code Assembly**: Combines generated code into complete programs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Additional language support (JavaScript, Java, etc.)
- [ ] Code execution and debugging
- [ ] Custom node creation
- [ ] Project save/load functionality
- [ ] Collaboration features
- [ ] Advanced math and data science nodes
- [ ] API integration nodes
- [ ] Export to various formats

---

**REALVS** - Making programming visual, intuitive, and accessible to everyone. 

