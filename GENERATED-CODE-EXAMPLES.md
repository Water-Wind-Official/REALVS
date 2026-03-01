# REALVS Generated Code Examples

## Understanding the Translation

When you build a visual graph in REALVS, it generates actual Python or C# code. Here are real examples of what each pattern produces.

---

## Example 1: Simple Window with Label

### Your Visual Graph:
```
Start → Window (title: "Hello") → Label (text: "Welcome!") → Main Loop → End
                 ↓                     ↓
                └─ parent connection ─┘
```

### Generated Python Code:
```python
import tkinter as tk

root = tk.Tk()
root.title("Hello")
root.geometry("400x300")

label = tk.Label(root, text="Welcome!")
label.pack()

root.mainloop()
```

### What Each Part Does:
```
import tkinter as tk          ← Tkinter library (always added)

root = tk.Tk()                ← Window node creates tk.Tk()
root.title("Hello")           ← Window config: title
root.geometry("400x300")      ← Window config: width & height

label = tk.Label(root, ...)   ← Label node created
root, ← parent connection! Label knows it's in the root window
text="Welcome!"  ← Label config

label.pack()                  ← Automatically positions widget

root.mainloop()               ← Main Loop node - makes window interactive!
```

---

## Example 2: Button Form

### Your Visual Graph:
```
Start 
  ↓
Window (title: "Sign Up")
  ├→ Label (text: "Name:")
  ├→ Text Input (width: 30)
  ├→ Label (text: "Email:")
  ├→ Text Input (width: 30)
  ├→ Button (text: "Submit")
  └→ Main Loop
      ↓
    End
```

### Generated Python Code:
```python
import tkinter as tk

root = tk.Tk()
root.title("Sign Up")
root.geometry("400x300")

label = tk.Label(root, text="Name:")
label.pack()

entry = tk.Entry(root, width=30)
entry.pack()

label = tk.Label(root, text="Email:")
label.pack()

entry = tk.Entry(root, width=30)
entry.pack()

button = tk.Button(root, text="Submit")
button.pack()

root.mainloop()
```

### Why This Works:
- Each node flows in sequence
- Each widget is created in order
- `.pack()` positions them top-to-bottom
- `root.mainloop()` keeps window open and interactive

---

## Example 3: Using Data Nodes (Advanced)

### Your Visual Graph:
```
String Literal (value: "Click Me") 
  ↓ (data connection)
Button (text: input)

Text Literal (value: "My Window")
  ↓ (data connection)
Window (title: input)
```

### Generated Python Code:
```python
import tkinter as tk

# String literal value
__var1 = "Click Me"

# String literal value
__var2 = "My Window"

root = tk.Tk()
root.title(__var2)  # Using the data from String Literal
root.geometry("400x300")

button = tk.Button(root, text=__var1)  # Using data from other node
button.pack()

root.mainloop()
```

### Key Insight:
- Data connections become variable assignments
- The generator optimizes repeated values
- This lets you reuse values and change them in one place

---

## How to Read Generated Code

### Pattern Recognition:

```python
# Always at top
import tkinter as tk

# Step 1: Create Window
root = tk.Tk()
root.title("Title Here")
root.geometry("WIDTHxHEIGHT")

# Step 2: Create Widgets (in order of your nodes)
widget = tk.Label(root, text="...")  # parent is 'root'
widget.pack()

widget2 = tk.Button(root, text="...")  # parent is 'root'
widget2.pack()

# Step 3: Start Event Loop (REQUIRED!)
root.mainloop()
```

### Debugging Tips:

**If generated code looks wrong**, check these things:

1. **Missing window creation line** → Did you include Window node?
2. **Missing mainloop()** → Did you include Main Loop node?
3. **Widgets not parented to root** → Did you connect parent inputs?
4. **Widgets in wrong order** → Did you follow the flow order?
5. **Typos in widget props** → Check your configuration values

---

## Example 4: Complex Widget Hierarchy

### Your Visual Graph (Multi-Column):
```
Start → Window ┬→ Frame 1 ┬→ Label (col 1)
        (title │            ├→ Label (col 1)
         "App") ├→ Frame 2   └→ Button (col 1)
               │
               └→ Label (footer)
                   ↓
                Main Loop → End
```

### What Gets Generated (Simplified):
```python
import tkinter as tk

root = tk.Tk()
root.title("App")

# Frame 1 (like a container)
frame1 = tk.Frame(root)
frame1.pack()

label1 = tk.Label(frame1, text="...")  # parent: frame1
label1.pack()

# Frame 2 
frame2 = tk.Frame(root)
frame2.pack()

# Footer
label_footer = tk.Label(root, text="...")  # parent: root
label_footer.pack()

root.mainloop()
```

### Key Concept:
- Parent-child relationships become nesting
- Frames are containers (like divs in HTML)
- Proper parenting = proper layout

---

## C# Equivalent

### Same GUI in C#:

```csharp
using System;
using System.Windows.Forms;

public class MyApp : Form
{
    public MyApp()
    {
        this.Text = "Hello";
        this.Width = 400;
        this.Height = 300;

        Label label = new Label()
        {
            Text = "Welcome!",
            Dock = DockStyle.Top
        };
        this.Controls.Add(label);
    }

    static void Main()
    {
        Application.Run(new MyApp());
    }
}
```

**Notice**: 
- Structure is similar
- Different syntax (C# vs Python)
- Same logic, different language
- REALVS handles the translation

---

## Common Generated Code Patterns

### Pattern 1: Sequential Widget Creation
```python
widget1 = tk.Label(root, ...)
widget1.pack()

widget2 = tk.Button(root, ...)
widget2.pack()

widget3 = tk.Entry(root, ...)
widget3.pack()
```
**When**: Widgets should stack vertically

### Pattern 2: Variable Reuse
```python
title = "My Application"
root = tk.Tk()
root.title(title)
```
**When**: Same value used multiple places

### Pattern 3: Conditional Widget Creation (Future)
```python
if condition:
    widget = tk.Button(root, ...)
    widget.pack()
```
**When**: Using If nodes to conditionally create widgets

### Pattern 4: Looped Widget Creation (Future)
```python
for i in range(5):
    button = tk.Button(root, text=f"Button {i}")
    button.pack()
```
**When**: Using For Loop nodes to create multiple widgets

---

## Testing Your Generated Code

### Manual Testing:

1. **Switch to Code tab** (right panel)
2. **Select language** (Python or C#)
3. **Read the code** - Does it make sense?
4. **Check imports** - All needed libraries imported?
5. **Check syntax** - Any obvious errors?

### Copy & Run:

1. **Copy the generated code**
2. **Paste into Python/C# file**
3. **Run it**: `python myapp.py`
4. **See live GUI!**

### Troubleshoot from Code:

If the GUI doesn't work as expected:
1. Look at generated code
2. Identify the issue in code
3. Trace back to nodes that generated it
4. Adjust node configuration
5. Regenerate and test

---

## Key Takeaways

1. **Visual Graph → Code**: REALVS translates your nodes to actual code
2. **Flow = Execution Order**: Top-to-bottom in graph = top-to-bottom in code
3. **Data = Function Parameters**: Connected outputs become inputs
4. **Parent Connections = Nesting**: Structure in visual graph matches structure in code
5. **You can inspect generated code** to understand what's happening
6. **Test by examining generated code** before running the full GUI

---

## Next Steps

1. **Build a simple graph** (Start → Window → Label → Main Loop → End)
2. **Check Code tab** to see generated Python
3. **Copy the code**, run it in Python
4. **See it work!**
5. **Modify the visual graph** and watch code change
6. **Understand the pattern** - how nodes map to code

This understanding makes building complex applications intuitive! 🚀

