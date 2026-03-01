# REALVS Interactive GUI Tutorial

## 🎯 Goal: Build Your First Interactive GUI
**Time: 10 minutes**
**Difficulty: Beginner**

This tutorial will guide you through building a real GUI application using REALVS.

---

## 📋 Prerequisites

- REALVS editor is open
- You understand that nodes connect via:
  - **Flow** (execution order - dotted lines)
  - **Data** (values - solid lines)

---

## 🏗️ Tutorial: Build a "Contact Info" Form

### Final Result Preview
```
┌─────────────────────────┐
│    Contact Form         │
│                         │
│ Name: [____________]    │
│ Email: [____________]   │
│ [  Get Contact Info  ]  │
└─────────────────────────┘
```

---

## Step 1: Create the Window 🪟

### What we're doing:
Creating the container for all our widgets.

### Steps:
1. **Drag the "Start" node**
   - From left panel, find "Start" node
   - Drag it to the center
   - Position at coordinates ~(100, 100)

2. **Drag the "Window" node**
   - From left panel → GUI category (magenta)
   - Find "Window"
   - Drag it to the right of Start
   - Position at ~(350, 80)

3. **Connect Start to Window**
   - Click the tiny circle on Start's right side (Flow output)
   - Drag to the circle on Window's left side (Flow input)
   - A blue dotted line should appear

4. **Configure the Window**
   - Click the Window node (it will highlight)
   - Look at the right panel (Properties)
   - Change the values:
     - **Title**: `Contact Form`
     - **Width**: `400`
     - **Height**: `350`

✅ **Checkpoint**: Your window is created!

### Visual Check:
```
[Start] ──flow──→ [Window]
                  title: "Contact Form"
                  width: 400
                  height: 350
```

---

## Step 2: Add the Form Labels & Inputs 📝

### What we're doing:
Adding text fields for Name and Email.

### Steps - First Label (Name):

1. **Drag first Label node**
   - From left panel → GUI category
   - Find "Label"
   - Drag below Window
   - Position at ~(550, 50)

2. **Connect Window to Label**
   - Click Window's Flow output (right side)
   - Drag to Label's Flow input (left side)

3. **Connect Window as Parent**
   - Click Window's "Window" output (on the right, labeled "Window")
   - Drag to Label's "Parent" input (on the left, labeled "Parent")
   - This tells the label which window it belongs to

4. **Configure Label**
   - Click the Label node
   - In Properties panel, set:
     - **Text**: `Name:`
     - **Font Size**: `12`

### Steps - First Text Input:

1. **Drag Text Input node**
   - From left panel → GUI category
   - Find "Text Input"
   - Position below the Label
   - Position at ~(550, 130)

2. **Connect Label to Text Input** (Flow)
   - Label's Flow output → TextInput's Flow input

3. **Connect Window as Parent** (Data)
   - Window's "Window" output → TextInput's "Parent" input

4. **Configure**
   - Click Text Input
   - Set **Width**: `30`

### Steps - Second Label (Email):

1. **Drag another Label node**
   - Position at ~(550, 200)

2. **Connect Text Input to this Label** (Flow)
   - TextInput's Flow output → Label's Flow input

3. **Connect Window as Parent** (Data)
   - Window's "Window" output → Label's "Parent" input

4. **Configure**
   - **Text**: `Email:`
   - **Font Size**: `12`

### Steps - Second Text Input:

1. **Drag another Text Input node**
   - Position at ~(550, 280)

2. **Connect Label to this Text Input** (Flow)
   - Label's Flow output → TextInput's Flow input

3. **Connect Window as Parent** (Data)
   - Window's "Window" output → TextInput's "Parent" input

4. **Configure**
   - **Width**: `30`

✅ **Checkpoint**: Form is almost done!

### Visual Check at This Point:
```
[Start] ──→ [Window]
            ├─ Label (Name:) [parent: Window]
            ├─ TextInput [parent: Window]
            ├─ Label (Email:) [parent: Window]
            └─ TextInput [parent: Window]
```

---

## Step 3: Add the Submit Button 🔘

### What we're doing:
Adding an interactive button.

### Steps:

1. **Drag Button node**
   - From left panel → GUI category
   - Find "Button"
   - Position below the Email input
   - Position at ~(550, 350)

2. **Connect Text Input to Button** (Flow)
   - Last TextInput's Flow output → Button's Flow input

3. **Connect Window as Parent** (Data)
   - Window's "Window" output → Button's "Parent" input

4. **Configure**
   - Click Button
   - Set **Label** (not text, it's "Label"): `Get Contact Info`

✅ **Checkpoint**: All widgets added!

### Visual Check:
```
[Start] ──→ [Window]
            ├─ Label (Name:)
            ├─ TextInput
            ├─ Label (Email:)
            ├─ TextInput
            └─ Button (Get Contact Info)
```

---

## Step 4: Start the Event Loop ⚙️

### What we're doing:
This makes the window actually appear and stay interactive.

### Steps:

1. **Drag Main Loop node**
   - From left panel → GUI category (magenta)
   - Find "Main Loop"
   - Position to the right of Button
   - Position at ~(750, 250)

2. **Connect Button to Main Loop** (Flow)
   - Button's Flow output → Main Loop's Flow input

3. **Connect Window to Main Loop** (Data)
   - Window's "Window" output → Main Loop's "Window" input
   - This tells Main Loop which window to run

4. **No configuration needed for Main Loop**
   - It doesn't need any properties

✅ **Checkpoint**: Event loop added!

---

## Step 5: Add the End 🏁

### What we're doing:
Mark the end of execution.

### Steps:

1. **Drag End node**
   - From left panel → Flow category (purple)
   - Find "End"
   - Position to the right of Main Loop
   - Position at ~(950, 250)

2. **Connect Main Loop to End**
   - Main Loop's Flow output → End's Flow input
   - (Note: Main Loop might not have a flow output since mainloop() blocks)

✅ **Checkpoint**: Complete workflow!

### Final Visual Structure:
```
[Start] 
  ↓
[Window] (title: "Contact Form", width: 400, height: 350)
  ├─ → [Label: Name:] 
  ├─    ↓
  ├─ → [TextInput] (width: 30)
  ├─    ↓
  ├─ → [Label: Email:]
  ├─    ↓
  ├─ → [TextInput] (width: 30)
  ├─    ↓
  ├─ → [Button: Get Contact Info]
  │    (parent keeps pointing to Window)
  │    ↓
  ├─ → [Main Loop] (window: Window)
       ↓
       [End]
```

---

## ✅ Verification Checklist

Before testing, verify:

- [ ] **Start node** exists
- [ ] **Window node** exists with title, width, height configured
- [ ] **All widgets** (Labels, TextInputs, Button) have Window as parent
- [ ] **Flow order**: Start → Window → Label → TextInput → Label → TextInput → Button → Main Loop → End
- [ ] **Main Loop** has Window connected
- [ ] **Main Loop** is before End
- [ ] **No broken connections** (red/error lines)

---

## 🔍 Preview the Generated Code

### Steps:

1. **Look at right panel**
2. **Click "Code" tab** (if it shows "Properties")
3. **Select language**: Python or C#
4. **Read the code**

### You should see something like:
```python
import tkinter as tk

root = tk.Tk()
root.title("Contact Form")
root.geometry("400x350")

label = tk.Label(root, text="Name:", font=("Arial", 12))
label.pack()

entry = tk.Entry(root, width=30)
entry.pack()

label = tk.Label(root, text="Email:", font=("Arial", 12))
label.pack()

entry = tk.Entry(root, width=30)
entry.pack()

button = tk.Button(root, text="Get Contact Info")
button.pack()

root.mainloop()
```

**If code looks good** → Your visual graph is correct! ✅

---

## 🚀 Testing Your GUI

### Option 1: Run from Browser (Future)
```
(Coming soon: direct Python execution in REALVS)
```

### Option 2: Copy & Run Locally

1. **Copy the generated Python code**
2. **Create new file**: `contact_form.py`
3. **Paste the code**
4. **Run**: `python contact_form.py`
5. **See your GUI!** 🎉

---

## 🎓 What You Just Built

**Congratulations!** You've created:
- ✅ A professional-looking GUI form
- ✅ Input fields for user data
- ✅ A working interactive window
- ✅ Generated Python code automatically

**You understand:**
- ✅ How to use REALVS nodes
- ✅ How flow connections work
- ✅ How data connections work  
- ✅ How to configure widgets
- ✅ How visual design becomes code

---

## 🔧 Modifications You Can Try

### Try This #1: Change Colors
(Advanced feature when available)

### Try This #2: Add Another Field
```
Before Button, add:
- Label (text: "Phone:")
- TextInput (width: 30)
```

Steps:
1. Drag Label node
2. Connect previous TextInput → new Label
3. Connect Window → new Label (parent)
4. Configure text: "Phone:"
5. Drag TextInput, connect to Button
6. Connect Window → TextInput (parent)

### Try This #3: Different Window Size
1. Click Window node
2. Change Width to 600, Height to 400
3. See how it affects the layout

---

## 🆘 Troubleshooting

### ❌ "The code doesn't look right"
**Check**: Are all widgets parented to Window? (solid data lines)

### ❌ "Widgets are in wrong order"
**Check**: Did you follow the flow order? (dotted lines)

### ❌ "Window won't open when I run the code"
**Check**: Does Main Loop exist? Is it connected to Window?

### ❌ "I don't see any widgets"
**Check**: Are Parent inputs connected? Is Main Loop present?

---

## 📚 Next Steps

1. **Modify this form** - Change labels, add fields
2. **Build a new form** - Try a login page
3. **Try advanced features** - Use data nodes, calculations
4. **Add logic** - Use If/Loops to validate input
5. **Explore code generation** - Understand Python better

---

## 🎯 Key Principles

Remember these and you'll master REALVS:

1. **Everything is a node** - Windows, widgets, data, logic
2. **Flow = execution order** - What runs when
3. **Data = information** - Passing values between nodes
4. **Parents = containers** - Widgets know which window they're in
5. **Code follows structure** - Visual layout → Python code

---

## 🎉 You're Ready!

You now understand how to use REALVS to build GUIs intuitively.

**Next challenge**: Build something cool! Ideas:
- Calculator
- To-do list
- Weather app interface
- Game launcher
- Settings panel

Happy building! 🚀

