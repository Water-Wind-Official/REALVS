# REALVS GUI Manipulation Guide

## 🎯 Core Concept: Visual Flow

REALVS works on a simple principle: **everything is connected through flow and data**.

- **Flow Connections (Dotted Lines)**: Control **execution order** - what runs first, then next
- **Data Connections (Solid Lines)**: Pass **values** between nodes - like variables or parameters

Think of it like a recipe where:
1. **Flow** = Steps you follow in order
2. **Data** = Ingredients you pass between steps

---

## 🖥️ Building a Simple GUI App (Step-by-Step)

### Goal: Create a window with a label and button

#### **Step 1: Add the Start Node**
- Drag **"Start"** from the left panel
- This is your entry point - where execution begins

#### **Step 2: Create a Window**
- Drag **"Window"** node from the GUI section (magenta color)
- Connect the **Flow** output from Start to the **Flow** input of Window
  - Click and drag from the Start's orange dot → Window's input dot
- Click the Window node to **select it**
- In the right panel (Properties tab), configure:
  - **Title**: "My GUI App" 
  - **Width**: 400
  - **Height**: 300

**What this does**: Creates a window titled "My GUI App" that's 400×300 pixels.

#### **Step 3: Add a Label**
- Drag **"Label"** node
- Connect:
  - Window's **Flow** output → Label's **Flow** input
  - Window's **Window** output → Label's **Parent** input
- Configure in Properties:
  - **Text**: "Welcome!"
  - **Font Size**: 14

**What this does**: Adds a text label to your window.

#### **Step 4: Add a Button**
- Drag **"Button"** node
- Connect:
  - Label's **Flow** output → Button's **Flow** input
  - Window's **Window** output → Button's **Parent** input
- Configure:
  - **Label**: "Click Me"

**What this does**: Adds a clickable button below the label.

#### **Step 5: Start the Event Loop**
- Drag **"Main Loop"** node
- Connect:
  - Button's **Flow** output → Main Loop's **Flow** input
  - Window's **Window** output → Main Loop's **Window** input
- This is **required** to make the GUI interactive!

#### **Step 6: Add End**
- Drag **"End"** node
- Connect Main Loop's output to End (if Main Loop has one)

**Your Layout Should Look Like:**
```
Start → Window → Label → Button → Main Loop → End
         ↓        ↓        ↓
      [Config] [Config] [Config]
```

---

## 🔗 Understanding Connections

### The Three Types of Connections:

#### **1. Flow Connections (Control Order)**
- **Appearance**: Dotted blue lines with arrows
- **Purpose**: Determine what executes when
- **How to use**: Connect nodes sequentially
- **Example**: Start → Window → Label → Button → Main Loop

#### **2. Data Connections (Pass Values)**
- **Appearance**: Solid lines between output/input ports
- **Purpose**: Pass values from one node to another
- **How to use**: Connect a data output to a data input
- **Example**: 
  - Window's **Window** output → Label's **Parent** input
  - This passes the window object to the label

#### **3. Special Connections**
- **Widget/Parent connections**: Used for GUI hierarchy
  - Window is the parent container
  - Labels, Buttons, etc. are children in that window

---

## 🛠️ Common Patterns

### Pattern 1: Build a Multi-Widget Window
```
Start 
  ↓
Window (config: title, size)
  ├→ Label 1 (parent: Window)
  ├→ Label 2 (parent: Window)
  ├→ Button (parent: Window)
  └→ Text Input (parent: Window)
  
Then all flow to → Main Loop (window output connected)
                    ↓
                   End
```

### Pattern 2: Button with Click Handler (Future Feature)
```
Button node has an onClick output that triggers when clicked
Currently: You'd need to handle this in post-processing
Future: Will support event-driven flows from Button clicks
```

### Pattern 3: Getting Text Input Values
```
Text Input node has:
  - INPUT: Flow, Parent (window)
  - OUTPUT: Flow, Widget, Text (the user's input)

Use the "Text" output in Print nodes or comparisons
```

---

## 🎨 Configuration Values

### How to Set Values in Nodes

Every node can be **configured** in the Properties panel (right side):

1. **Click a node** to select it
2. **Right panel appears** showing all configurable values
3. **Edit each field**:
   - Text fields: Type directly
   - Numbers: Enter numeric values
   - Dropdowns: Click to select

### Example Configurations:

**Window Node:**
- Title: "My Application"
- Width: 500
- Height: 400

**Label Node:**
- Text: "Hello, World!"
- Font Size: 16

**Button Node:**
- Text: "Submit"

**Text Input Node:**
- Width: 30

---

## 🚀 Common Mistakes & Solutions

### ❌ Problem: Widgets don't appear in the window
**Solution**: Make sure you connected the Window's **Window** output to each widget's **Parent** input. Without this connection, widgets don't know which window they belong to.

### ❌ Problem: Code is generated but GUI doesn't show
**Solution**: Did you include the **Main Loop** node? Without it, the window is created but never shown. Main Loop (Tkinter's mainloop) keeps the window running and responsive.

### ❌ Problem: Flow errors in generated code
**Solution**: Make sure all Flow inputs and outputs are connected in order. Every node with a Flow output should connect to something (or the End node).

### ❌ Problem: Widgets appear in wrong container
**Solution**: Check the Parent connections. Each GUI widget needs to be parented to the Window (or another container). These connections are critical!

---

## 💡 Pro Tips

1. **Use Input Nodes for Reusable Values**
   - Add a "String Literal" or "Number Literal" node
   - Configure it with a value
   - Connect it multiple places
   - Change value in ONE place, updates everywhere

2. **Organize Left-to-Right**
   - Start on the left
   - Flow progresses right
   - Makes reading the logic easier

3. **Preview Code Constantly**
   - Switch to "Code" tab on right panel
   - See generated Python/C# immediately
   - Understand how REALVS translates your visual design

4. **Use Meaningful Names**
   - Click nodes to select them
   - Set config values to meaningful values
   - Makes the generated code readable

5. **Build Incrementally**
   - Add Start + Window, verify code
   - Add one Label, verify code
   - Add Button, verify code
   - Helps identify problems early

---

## 📋 GUI Node Reference

### **Window** (Magenta, category: GUI)
- **Creates**: A Tkinter window
- **Config**: 
  - Title (string)
  - Width (number)
  - Height (number)
- **Outputs**: Window (widget) - pass this to all child widgets
- **Usage**: First GUI node after Start

### **Label** (Magenta, category: GUI)
- **Creates**: Read-only text
- **Config**:
  - Text (string)
  - Font Size (number)
- **Inputs**: Flow, Parent (window)
- **Outputs**: Flow, Widget
- **Usage**: Display static text

### **Button** (Magenta, category: GUI)
- **Creates**: Clickable button
- **Config**:
  - Label (text on button)
- **Inputs**: Flow, Parent (window)
- **Outputs**: Flow, Widget, Click (click event)
- **Usage**: User interaction

### **Text Input** (Magenta, category: GUI)
- **Creates**: Text entry field
- **Config**:
  - Width (characters)
- **Inputs**: Flow, Parent (window)
- **Outputs**: Flow, Widget, Text (current value)
- **Usage**: Get user text input

### **Main Loop** (Magenta, category: GUI)
- **Purpose**: Start the event loop (REQUIRED!)
- **Inputs**: Flow, Window
- **Outputs**: None
- **Usage**: Must be the last GUI node before End
- **Note**: Without this, the window won't display

---

## 🎓 Learning Path

1. **Beginner**: Window + Label + Main Loop
2. **Intermediate**: Add Button, Multiple Labels
3. **Advanced**: Text Input + Logic to Process Input
4. **Expert**: Multiple windows, dynamic widget creation, event handling

---

## 🔮 Future Enhancements

- **Direct GUI Execution**: Run Python GUI directly from the editor
- **Event System**: Wire button clicks to other nodes
- **Layout Managers**: Grid, pack, place layout options
- **Styling**: Colors, fonts, themes
- **More Widgets**: Checkboxes, radio buttons, listboxes, menus
- **Data Binding**: Automatic two-way data binding

