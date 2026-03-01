# REALVS Quick Reference: GUI Building Patterns

## 🎯 The Intuitive Mindset

Think of REALVS like **LEGO building blocks**:
- Each **node** is a block
- **Flow connections** = the order you stack them  
- **Data connections** = passing information between blocks
- **Properties** = customizing each block

---

## 📦 Quick Pattern Library

### **Pattern #1: Simple Window with Text**
```
Best for: Displaying information, messages, about screens

Start 
  ↓
Window (title: "Info")
  ↓
Label (text: "Your Message Here")
  ↓
Main Loop
  ↓
End

KEY: Window output → Label parent input
```

**Use When**: You just want to show static content and buttons

---

### **Pattern #2: Input Form**
```
Best for: Getting user data - name, age, preferences

Start 
  ↓
Window (title: "User Form")
  ├→ Label (text: "Name:")
  │   ↓
  │ Text Input (width: 30)
  │
  ├→ Label (text: "Email:")  
  │   ↓
  │ Text Input (width: 30)
  │
  └→ Label (text: "Submit:")
      ↓
    Button (text: "Send")
      ↓
    Main Loop
      ↓
    End

KEY: Multiple widgets can all connect to same Window
```

**Use When**: You need to collect information from users

---

### **Pattern #3: Multi-Window Flow** (Advanced)
```
Start 
  ↓
Window #1 (title: "Welcome")
  ├→ Label
  ├→ Button (text: "Next")
  └→ Main Loop
      ↓ (when button clicked)
    Window #2 (title: "Details")
      ├→ Text Input
      ├→ Button (text: "Save")
      └→ Main Loop
          ↓
        End

FUTURE: Event-driven button clicks will enable this
Currently: You'd run multiple scripts
```

**Use When**: Need wizard-style multi-step interfaces

---

## 🔄 The REALVS Execution Model

### How Your Visual Program Becomes Python:

```
Visual Graph:
┌─────┐    ┌────────┐    ┌──────┐    ┌─────────┐
│Start│───→│Window  │───→│Label │───→│MainLoop │
└─────┘    └────────┘    └──────┘    └─────────┘
              ↓              ↓
           [config]      [config]


Generated Python (Python):
```python
import tkinter as tk

# Create window (from Window node config)
root = tk.Tk()
root.title("My GUI App")
root.geometry("400x300")

# Create label (from Label node config, parent = root)
label = tk.Label(root, text="Welcome to REALVS!", font=("Arial", 14))
label.pack()

# Start event loop (from Main Loop node)
root.mainloop()
```

### Key Points:
1. **Flow order determines execution order** (top-to-bottom in your graph)
2. **Data connections pass values** between nodes
3. **Parent connections organize widgets** in the window
4. **Main Loop is essential** - without it, window won't show/stay open

---

## 🛠️ Practical Workflow

### Step 1: Plan on Paper
```
Sketch out what you want:
- What window?
  - Size? Title?
- What widgets?  
  - Labels? Buttons? Input fields?
- What happens when user interacts?
  - Click button → what happens?
  - Enter text → what happens?
```

### Step 2: Build Graph Left-to-Right
```
Start → Create GUI → Configure → Main Loop → End
```

### Step 3: Configure Each Node
```
Click node → Edit properties panel → Enter values
```

### Step 4: Preview Generated Code
```
Switch right panel to "Code" tab → See Python/C# → Verify it looks right
```

### Step 5: Run It
```
From properties, note the Window parent connections
Mental check: Each widget has Window as parent? ✓
Main Loop present? ✓
Flow connected in order? ✓
READY TO RUN!
```

---

## 🎨 Configuration Cheat Sheet

### **Window Node**
| Property | Example | Purpose |
|----------|---------|---------|
| Title | "My App" | Window title bar |
| Width | 400 | Pixel width |
| Height | 300 | Pixel height |

### **Label Node**
| Property | Example | Purpose |
|----------|---------|---------|
| Text | "Hello World" | What the label shows |
| Font Size | 12 | Size in points |

### **Button Node**
| Property | Example | Purpose |
|----------|---------|---------|
| Text | "Click Me" | Button label |

### **Text Input Node**
| Property | Example | Purpose |
|----------|---------|---------|
| Width | 20 | Width in characters |

### **Main Loop Node**
| Property | Example | Purpose |
|----------|---------|---------|
| (none) | N/A | Just mark as required |

---

## 🚨 Troubleshooting Checklist

Before asking "why doesn't it work?", verify:

- [ ] **Flow Connected**: Start → ... → Main Loop → End (no gaps)
- [ ] **Parents Assigned**: Every GUI widget has Window as parent (check data connections)
- [ ] **Main Loop Present**: Last step before End
- [ ] **No Cycles**: Graph doesn't loop back on itself
- [ ] **Properties Set**: Each node has required config values filled
- [ ] **Code Review**: Switch to Code tab - does Python look right?

---

## 💡 Advanced Techniques

### Using Data Nodes in GUI
```
Example: Set button text dynamically

String Literal node (value: "Click Me!")
  ↓ (data)
Button node (label input)
  ← Connect string output to button's label
```

### Connecting Multiple Widgets
```
All widgets flow sequentially BUT:
- Each gets Window as parent (data connection)
- Flow determines CREATION order (UI order on screen)

Window
  ├→ output → Label (parent: Window)
  ├→ output → Button (parent: Window)  
  └→ output → Text Input (parent: Window)

CORRECT: Window's window output goes to 3 different parent inputs
```

### Common Connection Mistakes

```
❌ WRONG:
Label (parent: not connected!)
→ Label just appears but location is undefined

✓ RIGHT:
Window → Label (parent)
→ Label knows it's inside the window
```

---

## 📚 Learn by Doing

### Exercise 1: Hello World Window (5 minutes)
1. Add Start node
2. Add Window node (title: "Hello")  
3. Add Label node (text: "Hello World!")
4. Add Main Loop
5. Add End
6. Create connections: Start → Window → Label → Main Loop → End
7. Window output → Label parent input
8. Click "Code" tab to see Python
9. ✅ You've made your first GUI!

### Exercise 2: Login Form (10 minutes)
1. Same as Exercise 1, but:
2. After Label "Hello", add:
   - Label ("Username:")
   - Text Input (width: 20)
   - Label ("Password:")
   - Text Input (width: 20)
   - Button ("Login")
3. All text inputs/labels get Window as parent
4. Flow connects them in order
5. ✅ You've made an input form!

### Exercise 3: Multi-Button Interface (10 minutes)
1. Create Window
2. Add multiple buttons with different names
3. Arrange them in a column (flow order = top-to-bottom)
4. Try using the same button text in different buttons
5. ✅ You know how to make interactive UIs!

---

## 🔮 What's Coming

**Planned Features:**
- Button click event handling (wire button clicks to other nodes)
- Execute Python directly in editor
- Drag widgets to position them
- Live preview as you build
- More widget types (checkbox, radiobutton, listbox, menu)
- Layout managers (grid, pack, place)
- Theming and styling

---

## 🆘 Getting Help

1. **Check the generated code** - Right panel, Code tab
2. **Follow the flow** - Can you trace Start to End?
3. **Verify connections** - Click each node, see connections in properties
4. **Simplify** - Remove nodes until it works, then add back
5. **Reference** - Look at simple-gui-template.json for working example

**Remember**: REALVS translates your visual design into Python/C#. If the generated code looks wrong, the visual design needs adjustment.

