import { Node, Edge } from 'reactflow'

interface CodeGenerationContext {
  nodes: Node[]
  edges: Edge[]
  language: 'python' | 'csharp'
}

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

  let code = '# Generated Python Code\n\n'
  const variables = new Set<string>()
  const functions = new Map<string, string>()

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

      case 'For Loop':
        const loopStart = edges.find(e => e.target === nodeId && e.targetHandle === 'start')
        const loopEnd = edges.find(e => e.target === nodeId && e.targetHandle === 'end')
        if (loopStart && loopEnd) {
          const loopVar = `i_${nodeId.slice(-4)}`
          nodeCode = `    for ${loopVar} in range(${loopStart.source}, ${loopEnd.source}):\n        pass\n`
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
