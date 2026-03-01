import { Node, Edge } from 'reactflow'

export function generateCode(nodes: Node[], edges: Edge[], language: 'python' | 'csharp'): string {
  if (language === 'python') {
    return generatePythonCode(nodes, edges)
  } else {
    return generateCSharpCode(nodes, edges)
  }
}

function generatePythonCode(nodes: Node[], edges: Edge[]): string {
  const startNodes = nodes.filter(node => node.data.label === 'Start')
  if (startNodes.length === 0) return '# No start node found'

  // Track which features are used
  const usedFeatures = new Set<string>()
  
  // Analyze nodes to determine required imports
  nodes.forEach(node => {
    const category = node.data.category
    const label = node.data.label
    
    if (category === 'gui' || label.includes('Tkinter')) {
      usedFeatures.add('tkinter')
    }
    if (label.includes('JSON')) {
      usedFeatures.add('json')
    }
    if (label.includes('HTTP')) {
      usedFeatures.add('requests')
    }
    if (label === 'Sleep') {
      usedFeatures.add('time')
    }
    if (label.includes('Random')) {
      usedFeatures.add('random')
    }
    if (label.includes('DateTime')) {
      usedFeatures.add('datetime')
    }
    if (label.includes('File')) {
      usedFeatures.add('fileio')
    }
  })

  // Generate imports only for used features
  let code = '# Generated Python Code\n\n'
  if (usedFeatures.has('tkinter')) {
    code += 'import tkinter as tk\n'
    code += 'from tkinter import ttk, messagebox, filedialog\n'
  }
  if (usedFeatures.has('json')) {
    code += 'import json\n'
  }
  if (usedFeatures.has('requests')) {
    code += 'import requests\n'
  }
  if (usedFeatures.has('time')) {
    code += 'import time\n'
  }
  if (usedFeatures.has('random')) {
    code += 'import random\n'
  }
  if (usedFeatures.has('datetime')) {
    code += 'from datetime import datetime\n'
  }
  code += '\n'

  const variables = new Set<string>()
  const tkinterWidgets = new Map<string, string>()

  const generateNodeCode = (nodeId: string, visited: Set<string> = new Set()): string => {
    if (visited.has(nodeId)) return ''
    visited.add(nodeId)

    const node = nodes.find(n => n.id === nodeId)
    if (!node) return ''

    const nodeData = node.data
    let nodeCode = ''

    switch (nodeData.label) {
      case 'Start':
        nodeCode = 'def main():\n'
        break

      case 'String Value':
        nodeCode = nodeData.value ? `"${nodeData.value}"` : '""'
        break

      case 'Number Value':
        nodeCode = nodeData.value || '0'
        break

      case 'Boolean Value':
        nodeCode = nodeData.value || 'False'
        break

      case 'Print':
        const printInput = edges.find(e => e.target === nodeId && e.targetHandle === 'value')
        if (printInput) {
          nodeCode = `    print(${printInput.source})\n`
        }
        break

      case 'Variable':
        const varInput = edges.find(e => e.target === nodeId && e.targetHandle === 'value')
        if (varInput) {
          const varName = `var_${nodeId.slice(-4)}`
          variables.add(varName)
          nodeCode = `    ${varName} = ${varInput.source}\n`
        }
        break

      case 'Input':
        const inputVar = `input_${nodeId.slice(-4)}`
        variables.add(inputVar)
        nodeCode = `    ${inputVar} = input("Enter value: ")\n`
        break

      case 'Add':
        const addA = edges.find(e => e.target === nodeId && e.targetHandle === 'a')
        const addB = edges.find(e => e.target === nodeId && e.targetHandle === 'b')
        if (addA && addB) {
          nodeCode = `    (${addA.source} + ${addB.source})`
        }
        break

      case 'Subtract':
        const subA = edges.find(e => e.target === nodeId && e.targetHandle === 'a')
        const subB = edges.find(e => e.target === nodeId && e.targetHandle === 'b')
        if (subA && subB) {
          nodeCode = `    (${subA.source} - ${subB.source})`
        }
        break

      case 'Multiply':
        const mulA = edges.find(e => e.target === nodeId && e.targetHandle === 'a')
        const mulB = edges.find(e => e.target === nodeId && e.targetHandle === 'b')
        if (mulA && mulB) {
          nodeCode = `    (${mulA.source} * ${mulB.source})`
        }
        break

      case 'Divide':
        const divA = edges.find(e => e.target === nodeId && e.targetHandle === 'a')
        const divB = edges.find(e => e.target === nodeId && e.targetHandle === 'b')
        if (divA && divB) {
          nodeCode = `    (${divA.source} / ${divB.source})`
        }
        break

      case 'If Statement':
        const ifCondition = edges.find(e => e.target === nodeId && e.targetHandle === 'condition')
        if (ifCondition) {
          nodeCode = `    if ${ifCondition.source}:\n        pass\n`
          const trueBranch = edges.find(e => e.source === nodeId && e.sourceHandle === 'true')
          const falseBranch = edges.find(e => e.source === nodeId && e.sourceHandle === 'false')
          
          if (trueBranch) {
            nodeCode += generateNodeCode(trueBranch.target, visited)
          }
          
          if (falseBranch) {
            nodeCode += `    else:\n        pass\n`
            nodeCode += generateNodeCode(falseBranch.target, visited)
          }
        }
        break

      case 'While Loop':
        const whileCondition = edges.find(e => e.target === nodeId && e.targetHandle === 'condition')
        if (whileCondition) {
          nodeCode = `    while ${whileCondition.source}:\n        pass\n`
          const loopBody = edges.find(e => e.source === nodeId && e.sourceHandle === 'loop')
          if (loopBody) {
            nodeCode += generateNodeCode(loopBody.target, visited)
          }
        }
        break

      case 'Power':
        const powBase = edges.find(e => e.target === nodeId && e.targetHandle === 'base')
        const powExp = edges.find(e => e.target === nodeId && e.targetHandle === 'exponent')
        if (powBase && powExp) {
          nodeCode = `    (${powBase.source} ** ${powExp.source})`
        }
        break

      case 'Modulo':
        const modA = edges.find(e => e.target === nodeId && e.targetHandle === 'a')
        const modB = edges.find(e => e.target === nodeId && e.targetHandle === 'b')
        if (modA && modB) {
          nodeCode = `    (${modA.source} % ${modB.source})`
        }
        break

      case 'Concatenate':
        const concatA = edges.find(e => e.target === nodeId && e.targetHandle === 'a')
        const concatB = edges.find(e => e.target === nodeId && e.targetHandle === 'b')
        if (concatA && concatB) {
          nodeCode = `    str(${concatA.source}) + str(${concatB.source})`
        }
        break

      case 'String Length':
        const strInput = edges.find(e => e.target === nodeId && e.targetHandle === 'text')
        if (strInput) {
          nodeCode = `    len(${strInput.source})`
        }
        break

      case 'Create List':
        const listItems = edges.find(e => e.target === nodeId && e.targetHandle === 'items')
        if (listItems) {
          nodeCode = `    [${listItems.source}]`
        }
        break

      case 'Append to List':
        const appendList = edges.find(e => e.target === nodeId && e.targetHandle === 'list')
        const appendItem = edges.find(e => e.target === nodeId && e.targetHandle === 'item')
        if (appendList && appendItem) {
          nodeCode = `    ${appendList.source}.append(${appendItem.source})`
        }
        break

      case 'Get List Item':
        const getList = edges.find(e => e.target === nodeId && e.targetHandle === 'list')
        const getIndex = edges.find(e => e.target === nodeId && e.targetHandle === 'index')
        if (getList && getIndex) {
          nodeCode = `    ${getList.source}[${getIndex.source}]`
        }
        break

      case 'Return':
        const returnValue = edges.find(e => e.target === nodeId && e.targetHandle === 'value')
        if (returnValue) {
          nodeCode = `    return ${returnValue.source}\n`
        }
        break

      case 'Try-Catch':
        const tryBlock = edges.find(e => e.target === nodeId && e.targetHandle === 'try')
        const catchBlock = edges.find(e => e.target === nodeId && e.targetHandle === 'catch')
        if (tryBlock && catchBlock) {
          nodeCode = `    try:\n        pass\n    except Exception as e:\n        pass\n`
          nodeCode += generateNodeCode(tryBlock.target, visited)
          nodeCode += generateNodeCode(catchBlock.target, visited)
        }
        break

      case 'Read File':
        const filePath = edges.find(e => e.target === nodeId && e.targetHandle === 'path')
        if (filePath) {
          nodeCode = `    with open(${filePath.source}, 'r') as f:\n        content = f.read()\n`
        }
        break

      case 'Write File':
        const writePath = edges.find(e => e.target === nodeId && e.targetHandle === 'path')
        const writeContent = edges.find(e => e.target === nodeId && e.targetHandle === 'content')
        if (writePath && writeContent) {
          nodeCode = `    with open(${writePath.source}, 'w') as f:\n        f.write(${writeContent.source})\n`
        }
        break

      case 'Tkinter Window':
        const winTitle = edges.find(e => e.target === nodeId && e.targetHandle === 'title')
        const winSize = edges.find(e => e.target === nodeId && e.targetHandle === 'size')
        const winVar = `window_${nodeId.slice(-4)}`
        tkinterWidgets.set(winVar, winVar)
        if (winTitle && winSize) {
          nodeCode = `    ${winVar} = tk.Tk()\n    ${winVar}.title(${winTitle.source})\n    ${winVar}.geometry(${winSize.source})\n`
        } else if (winTitle) {
          nodeCode = `    ${winVar} = tk.Tk()\n    ${winVar}.title(${winTitle.source})\n`
        } else {
          nodeCode = `    ${winVar} = tk.Tk()\n`
        }
        break

      case 'Tkinter Label':
        const labelWindow = edges.find(e => e.target === nodeId && e.targetHandle === 'window')
        const labelText = edges.find(e => e.target === nodeId && e.targetHandle === 'text')
        const labelPos = edges.find(e => e.target === nodeId && e.targetHandle === 'position')
        const labelVar = `label_${nodeId.slice(-4)}`
        tkinterWidgets.set(labelVar, labelVar)
        if (labelWindow && labelText) {
          nodeCode = `    ${labelVar} = tk.Label(${labelWindow.source}, text=${labelText.source})\n`
          if (labelPos) {
            nodeCode += `    ${labelVar}.place(${labelPos.source})\n`
          } else {
            nodeCode += `    ${labelVar}.pack()\n`
          }
        }
        break

      case 'Tkinter Button':
        const btnWindow = edges.find(e => e.target === nodeId && e.targetHandle === 'window')
        const btnText = edges.find(e => e.target === nodeId && e.targetHandle === 'text')
        const btnCommand = edges.find(e => e.target === nodeId && e.targetHandle === 'command')
        const btnPos = edges.find(e => e.target === nodeId && e.targetHandle === 'position')
        const btnVar = `button_${nodeId.slice(-4)}`
        tkinterWidgets.set(btnVar, btnVar)
        if (btnWindow && btnText && btnCommand) {
          nodeCode = `    ${btnVar} = tk.Button(${btnWindow.source}, text=${btnText.source}, command=${btnCommand.source})\n`
          if (btnPos) {
            nodeCode += `    ${btnVar}.place(${btnPos.source})\n`
          } else {
            nodeCode += `    ${btnVar}.pack()\n`
          }
        }
        break

      case 'Tkinter Entry':
        const entryWindow = edges.find(e => e.target === nodeId && e.targetHandle === 'window')
        const entryPos = edges.find(e => e.target === nodeId && e.targetHandle === 'position')
        const entryVar = `entry_${nodeId.slice(-4)}`
        tkinterWidgets.set(entryVar, entryVar)
        if (entryWindow) {
          nodeCode = `    ${entryVar} = tk.Entry(${entryWindow.source})\n`
          if (entryPos) {
            nodeCode += `    ${entryVar}.place(${entryPos.source})\n`
          } else {
            nodeCode += `    ${entryVar}.pack()\n`
          }
        }
        break

      case 'Tkinter Canvas':
        const canvasWindow = edges.find(e => e.target === nodeId && e.targetHandle === 'window')
        const canvasSize = edges.find(e => e.target === nodeId && e.targetHandle === 'size')
        const canvasPos = edges.find(e => e.target === nodeId && e.targetHandle === 'position')
        const canvasVar = `canvas_${nodeId.slice(-4)}`
        tkinterWidgets.set(canvasVar, canvasVar)
        if (canvasWindow) {
          if (canvasSize) {
            nodeCode = `    ${canvasVar} = tk.Canvas(${canvasWindow.source}, ${canvasSize.source})\n`
          } else {
            nodeCode = `    ${canvasVar} = tk.Canvas(${canvasWindow.source})\n`
          }
          if (canvasPos) {
            nodeCode += `    ${canvasVar}.place(${canvasPos.source})\n`
          } else {
            nodeCode += `    ${canvasVar}.pack()\n`
          }
        }
        break

      case 'Draw Line':
        const lineCanvas = edges.find(e => e.target === nodeId && e.targetHandle === 'canvas')
        const lineStart = edges.find(e => e.target === nodeId && e.targetHandle === 'start')
        const lineEnd = edges.find(e => e.target === nodeId && e.targetHandle === 'end')
        const lineColor = edges.find(e => e.target === nodeId && e.targetHandle === 'color')
        if (lineCanvas && lineStart && lineEnd) {
          const color = lineColor ? lineColor.source : '"black"'
          nodeCode = `    ${lineCanvas.source}.create_line(${lineStart.source}, ${lineEnd.source}, fill=${color})\n`
        }
        break

      case 'Draw Rectangle':
        const rectCanvas = edges.find(e => e.target === nodeId && e.targetHandle === 'canvas')
        const rectPos = edges.find(e => e.target === nodeId && e.targetHandle === 'position')
        const rectSize = edges.find(e => e.target === nodeId && e.targetHandle === 'size')
        const rectColor = edges.find(e => e.target === nodeId && e.targetHandle === 'color')
        if (rectCanvas && rectPos && rectSize) {
          const color = rectColor ? rectColor.source : '"black"'
          nodeCode = `    ${rectCanvas.source}.create_rectangle(${rectPos.source}, ${rectSize.source}, fill=${color})\n`
        }
        break

      case 'Draw Circle':
        const circleCanvas = edges.find(e => e.target === nodeId && e.targetHandle === 'canvas')
        const circleCenter = edges.find(e => e.target === nodeId && e.targetHandle === 'center')
        const circleRadius = edges.find(e => e.target === nodeId && e.targetHandle === 'radius')
        const circleColor = edges.find(e => e.target === nodeId && e.targetHandle === 'color')
        if (circleCanvas && circleCenter && circleRadius) {
          const color = circleColor ? circleColor.source : '"black"'
          nodeCode = `    ${circleCanvas.source}.create_oval(${circleCenter.source}, ${circleRadius.source}, fill=${color})\n`
        }
        break

      case 'Tkinter Main Loop':
        const mainWindow = edges.find(e => e.target === nodeId && e.targetHandle === 'window')
        if (mainWindow) {
          nodeCode = `    ${mainWindow.source}.mainloop()\n`
        }
        break

      case 'Sleep':
        const sleepSeconds = edges.find(e => e.target === nodeId && e.targetHandle === 'seconds')
        if (sleepSeconds) {
          nodeCode = `    time.sleep(${sleepSeconds.source})\n`
        }
        break

      case 'Random Integer':
        const randIntMin = edges.find(e => e.target === nodeId && e.targetHandle === 'min')
        const randIntMax = edges.find(e => e.target === nodeId && e.targetHandle === 'max')
        if (randIntMin && randIntMax) {
          nodeCode = `    random.randint(${randIntMin.source}, ${randIntMax.source})`
        }
        break

      case 'Random Float':
        const randFloatMin = edges.find(e => e.target === nodeId && e.targetHandle === 'min')
        const randFloatMax = edges.find(e => e.target === nodeId && e.targetHandle === 'max')
        if (randFloatMin && randFloatMax) {
          nodeCode = `    random.uniform(${randFloatMin.source}, ${randFloatMax.source})`
        }
        break

      case 'Current DateTime':
        nodeCode = `    datetime.now()`
        break

      case 'Parse JSON':
        const jsonStr = edges.find(e => e.target === nodeId && e.targetHandle === 'json_string')
        if (jsonStr) {
          nodeCode = `    json.loads(${jsonStr.source})`
        }
        break

      case 'Stringify JSON':
        const jsonData = edges.find(e => e.target === nodeId && e.targetHandle === 'data')
        if (jsonData) {
          nodeCode = `    json.dumps(${jsonData.source})`
        }
        break

      case 'HTTP GET':
        const getUrl = edges.find(e => e.target === nodeId && e.targetHandle === 'url')
        if (getUrl) {
          nodeCode = `    requests.get(${getUrl.source}).text`
        }
        break

      case 'HTTP POST':
        const postUrl = edges.find(e => e.target === nodeId && e.targetHandle === 'url')
        const postData = edges.find(e => e.target === nodeId && e.targetHandle === 'data')
        if (postUrl && postData) {
          nodeCode = `    requests.post(${postUrl.source}, json=${postData.source}).text`
        }
        break
    }

    const nextEdges = edges.filter(e => e.source === nodeId)
    for (const edge of nextEdges) {
      if (edge.sourceHandle !== 'true' && edge.sourceHandle !== 'false' && edge.sourceHandle !== 'loop') {
        nodeCode += generateNodeCode(edge.target, visited)
      }
    }

    return nodeCode
  }

  code += generateNodeCode(startNodes[0].id)
  code += '\nif __name__ == "__main__":\n    main()'

  return code
}

function generateCSharpCode(nodes: Node[], edges: Edge[]): string {
  const startNodes = nodes.filter(node => node.data.label === 'Start')
  if (startNodes.length === 0) return '// No start node found'

  let code = '// Generated C# Code\n\nusing System;\n\npublic class Program\n{\n'
  const variables = new Set<string>()

  const generateNodeCode = (nodeId: string, visited: Set<string> = new Set()): string => {
    if (visited.has(nodeId)) return ''
    visited.add(nodeId)

    const node = nodes.find(n => n.id === nodeId)
    if (!node) return ''

    const nodeData = node.data
    let nodeCode = ''

    switch (nodeData.label) {
      case 'Start':
        nodeCode = '    public static void Main()\n    {\n'
        break

      case 'Print':
        const printInput = edges.find(e => e.target === nodeId && e.targetHandle === 'value')
        if (printInput) {
          nodeCode = `        Console.WriteLine(${printInput.source});\n`
        }
        break

      case 'Variable':
        const varInput = edges.find(e => e.target === nodeId && e.targetHandle === 'value')
        if (varInput) {
          const varName = `var_${nodeId.slice(-4)}`
          variables.add(varName)
          nodeCode = `        var ${varName} = ${varInput.source};\n`
        }
        break

      case 'Input':
        const inputVar = `input_${nodeId.slice(-4)}`
        variables.add(inputVar)
        nodeCode = `        var ${inputVar} = Console.ReadLine();\n`
        break

      case 'Add':
        const addA = edges.find(e => e.target === nodeId && e.targetHandle === 'a')
        const addB = edges.find(e => e.target === nodeId && e.targetHandle === 'b')
        if (addA && addB) {
          nodeCode = `        (${addA.source} + ${addB.source})`
        }
        break

      case 'Subtract':
        const subA = edges.find(e => e.target === nodeId && e.targetHandle === 'a')
        const subB = edges.find(e => e.target === nodeId && e.targetHandle === 'b')
        if (subA && subB) {
          nodeCode = `        (${subA.source} - ${subB.source})`
        }
        break

      case 'Multiply':
        const mulA = edges.find(e => e.target === nodeId && e.targetHandle === 'a')
        const mulB = edges.find(e => e.target === nodeId && e.targetHandle === 'b')
        if (mulA && mulB) {
          nodeCode = `        (${mulA.source} * ${mulB.source})`
        }
        break

      case 'Divide':
        const divA = edges.find(e => e.target === nodeId && e.targetHandle === 'a')
        const divB = edges.find(e => e.target === nodeId && e.targetHandle === 'b')
        if (divA && divB) {
          nodeCode = `        (${divA.source} / ${divB.source})`
        }
        break

      case 'If Statement':
        const ifCondition = edges.find(e => e.target === nodeId && e.targetHandle === 'condition')
        if (ifCondition) {
          nodeCode = `        if (${ifCondition.source})\n        {\n        }\n`
          const trueBranch = edges.find(e => e.source === nodeId && e.sourceHandle === 'true')
          const falseBranch = edges.find(e => e.source === nodeId && e.sourceHandle === 'false')
          
          if (trueBranch) {
            nodeCode += generateNodeCode(trueBranch.target, visited)
          }
          
          if (falseBranch) {
            nodeCode += `        else\n        {\n        }\n`
            nodeCode += generateNodeCode(falseBranch.target, visited)
          }
        }
        break

      case 'For Loop':
        const loopStart = edges.find(e => e.target === nodeId && e.targetHandle === 'start')
        const loopEnd = edges.find(e => e.target === nodeId && e.targetHandle === 'end')
        if (loopStart && loopEnd) {
          const loopVar = `i_${nodeId.slice(-4)}`
          nodeCode = `        for (int ${loopVar} = ${loopStart.source}; ${loopVar} < ${loopEnd.source}; ${loopVar}++)\n        {\n        }\n`
          const loopBody = edges.find(e => e.source === nodeId && e.sourceHandle === 'loop')
          if (loopBody) {
            nodeCode += generateNodeCode(loopBody.target, visited)
          }
        }
        break
    }

    const nextEdges = edges.filter(e => e.source === nodeId)
    for (const edge of nextEdges) {
      if (edge.sourceHandle !== 'true' && edge.sourceHandle !== 'false' && edge.sourceHandle !== 'loop') {
        nodeCode += generateNodeCode(edge.target, visited)
      }
    }

    return nodeCode
  }

  code += generateNodeCode(startNodes[0].id)
  code += '    }\n}'

  return code
}
