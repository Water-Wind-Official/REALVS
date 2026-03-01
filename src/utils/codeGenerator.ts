// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Code Generator  (Python & C#)
//
// Two-phase approach:
//   1. resolveExpression()  — recursively resolves a data output to a code expression
//   2. generateFlowCode()   — walks execution-flow edges, emitting statements
// ═══════════════════════════════════════════════════════════════════════════════

import { Node, Edge } from 'reactflow';
import { VSNodeData } from '../types';

type Lang = 'python' | 'csharp';
type N = Node<VSNodeData>;

/* ── helpers ──────────────────────────────────────────────────────────────── */

const nil           = (l: Lang) => (l === 'python' ? 'None' : 'null');
const indent        = (_l: Lang, depth: number) => '    '.repeat(depth);
const semi          = (l: Lang) => (l === 'csharp' ? ';' : '');
const cfg           = (n: N, k: string) => n.data.configValues?.[k] ?? '';
const cfgOr         = (n: N, k: string, fb: string) => n.data.configValues?.[k] || fb;

function inputEdge(edges: Edge[], nodeId: string, portId: string): Edge | undefined {
  return edges.find((e) => e.target === nodeId && e.targetHandle === portId);
}

function flowTarget(edges: Edge[], nodeId: string, portId: string): string | null {
  const e = edges.find((ed) => ed.source === nodeId && ed.sourceHandle === portId);
  return e?.target ?? null;
}

/* ── Expression resolver ──────────────────────────────────────────────────── */

function expr(
  nodeId: string,
  outPort: string,
  nodes: N[],
  edges: Edge[],
  lang: Lang,
  seen = new Set<string>(),
): string {
  const key = `${nodeId}:${outPort}`;
  if (seen.has(key)) return nil(lang);
  seen.add(key);

  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return nil(lang);

  const d = node.data;
  const getIn = (port: string) => {
    const e = inputEdge(edges, nodeId, port);
    if (!e) return nil(lang);
    return expr(e.source, e.sourceHandle || 'value', nodes, edges, lang, new Set(seen));
  };

  switch (d.templateId) {
    // ── Data literals ─────────────────────────────────────────────────────
    case 'string-literal':  return `"${cfgOr(node, 'value', '')}"`;
    case 'number-literal':  return cfgOr(node, 'value', '0');
    case 'boolean-literal': return lang === 'python'
      ? (cfgOr(node, 'value', 'true') === 'true' ? 'True' : 'False')
      : cfgOr(node, 'value', 'true');
    case 'null-literal': return nil(lang);
    case 'get-variable': return cfgOr(node, 'name', 'myVar');

    // ── Math ──────────────────────────────────────────────────────────────
    case 'math-add':      return `(${getIn('a')} + ${getIn('b')})`;
    case 'math-subtract': return `(${getIn('a')} - ${getIn('b')})`;
    case 'math-multiply': return `(${getIn('a')} * ${getIn('b')})`;
    case 'math-divide':   return `(${getIn('a')} / ${getIn('b')})`;
    case 'math-modulo':   return `(${getIn('a')} % ${getIn('b')})`;
    case 'math-power':    return lang === 'python'
      ? `(${getIn('base')} ** ${getIn('exp')})`
      : `Math.Pow(${getIn('base')}, ${getIn('exp')})`;
    case 'math-abs':   return lang === 'python' ? `abs(${getIn('value')})`   : `Math.Abs(${getIn('value')})`;
    case 'math-min':   return lang === 'python' ? `min(${getIn('a')}, ${getIn('b')})` : `Math.Min(${getIn('a')}, ${getIn('b')})`;
    case 'math-max':   return lang === 'python' ? `max(${getIn('a')}, ${getIn('b')})` : `Math.Max(${getIn('a')}, ${getIn('b')})`;
    case 'math-round': return lang === 'python' ? `round(${getIn('value')})`  : `(int)Math.Round(${getIn('value')})`;
    case 'math-sqrt':  return lang === 'python' ? `math.sqrt(${getIn('value')})` : `Math.Sqrt(${getIn('value')})`;
    case 'math-random': {
      const t = cfgOr(node, 'type', 'int');
      return lang === 'python'
        ? (t === 'int' ? `random.randint(${getIn('min')}, ${getIn('max')})` : `random.uniform(${getIn('min')}, ${getIn('max')})`)
        : `new Random().Next((int)(${getIn('min')}), (int)(${getIn('max')}))`;
    }

    // ── Comparison ────────────────────────────────────────────────────────
    case 'compare-equal':     return `(${getIn('a')} == ${getIn('b')})`;
    case 'compare-not-equal': return `(${getIn('a')} != ${getIn('b')})`;
    case 'compare-greater':   return `(${getIn('a')} > ${getIn('b')})`;
    case 'compare-less':      return `(${getIn('a')} < ${getIn('b')})`;
    case 'compare-gte':       return `(${getIn('a')} >= ${getIn('b')})`;
    case 'compare-lte':       return `(${getIn('a')} <= ${getIn('b')})`;
    case 'logic-and': return lang === 'python' ? `(${getIn('a')} and ${getIn('b')})` : `(${getIn('a')} && ${getIn('b')})`;
    case 'logic-or':  return lang === 'python' ? `(${getIn('a')} or ${getIn('b')})`  : `(${getIn('a')} || ${getIn('b')})`;
    case 'logic-not': return lang === 'python' ? `not ${getIn('value')}` : `!${getIn('value')}`;

    // ── String ────────────────────────────────────────────────────────────
    case 'string-concat':    return lang === 'python'
      ? `(str(${getIn('a')}) + str(${getIn('b')}))`
      : `(${getIn('a')}.ToString() + ${getIn('b')}.ToString())`;
    case 'string-length':    return lang === 'python' ? `len(${getIn('text')})` : `${getIn('text')}.Length`;
    case 'string-contains':  return lang === 'python'
      ? `(${getIn('search')} in ${getIn('text')})`
      : `${getIn('text')}.Contains(${getIn('search')})`;
    case 'string-replace':   return lang === 'python'
      ? `${getIn('text')}.replace(${getIn('search')}, ${getIn('replacement')})`
      : `${getIn('text')}.Replace(${getIn('search')}, ${getIn('replacement')})`;
    case 'string-split':     return lang === 'python'
      ? `${getIn('text')}.split(${getIn('delimiter')})`
      : `${getIn('text')}.Split(${getIn('delimiter')})`;
    case 'string-upper': return lang === 'python' ? `${getIn('text')}.upper()` : `${getIn('text')}.ToUpper()`;
    case 'string-lower': return lang === 'python' ? `${getIn('text')}.lower()` : `${getIn('text')}.ToLower()`;
    case 'string-trim':  return lang === 'python' ? `${getIn('text')}.strip()` : `${getIn('text')}.Trim()`;
    case 'string-substring': return lang === 'python'
      ? `${getIn('text')}[${getIn('start')}:${getIn('end')}]`
      : `${getIn('text')}.Substring(${getIn('start')}, ${getIn('end')})`;
    case 'to-string':    return lang === 'python' ? `str(${getIn('value')})` : `${getIn('value')}.ToString()`;
    case 'string-format': {
      const tpl = cfgOr(node, 'template', '{} {}');
      return lang === 'python'
        ? `"${tpl}".format(${getIn('value1')}, ${getIn('value2')})`
        : `string.Format("${tpl}", ${getIn('value1')}, ${getIn('value2')})`;
    }

    // ── Collections (data outputs) ────────────────────────────────────────
    case 'list-create':   return lang === 'python' ? '[]' : 'new List<object>()';
    case 'list-get':      return `${getIn('list')}[${getIn('index')}]`;
    case 'list-length':   return lang === 'python' ? `len(${getIn('list')})` : `${getIn('list')}.Count`;
    case 'list-sort':     return lang === 'python' ? `sorted(${getIn('list')})` : `${getIn('list')}.OrderBy(x => x).ToList()`;
    case 'list-contains': return lang === 'python'
      ? `(${getIn('item')} in ${getIn('list')})`
      : `${getIn('list')}.Contains(${getIn('item')})`;
    case 'dict-create': return lang === 'python' ? '{}' : 'new Dictionary<string, object>()';
    case 'dict-get':    return `${getIn('dict')}[${getIn('key')}]`;

    // ── JSON ──────────────────────────────────────────────────────────────
    case 'json-parse':     return lang === 'python' ? `json.loads(${getIn('json')})` : `JsonConvert.DeserializeObject(${getIn('json')})`;
    case 'json-stringify': return lang === 'python' ? `json.dumps(${getIn('data')})` : `JsonConvert.SerializeObject(${getIn('data')})`;

    // ── Type cast ─────────────────────────────────────────────────────────
    case 'type-cast': {
      const t = cfgOr(node, 'targetType', 'int');
      if (lang === 'python') return `${t}(${getIn('value')})`;
      const map: Record<string, string> = { int: 'Int32', float: 'Double', str: 'String', bool: 'Boolean' };
      return `Convert.To${map[t] ?? 'String'}(${getIn('value')})`;
    }

    // ── Flow nodes that also expose data outputs ──────────────────────────
    case 'for-loop':  return cfgOr(node, 'varName', 'i');
    case 'for-each':  return cfgOr(node, 'varName', 'item');
    case 'input':     return `_input_${nodeId.slice(-4)}`;
    case 'read-file': return `_file_${nodeId.slice(-4)}`;
    case 'http-get':
      if (outPort === 'status') return lang === 'python' ? `_resp_${nodeId.slice(-4)}.status_code` : `(int)_resp_${nodeId.slice(-4)}.StatusCode`;
      return lang === 'python' ? `_resp_${nodeId.slice(-4)}.text` : `_body_${nodeId.slice(-4)}`;
    case 'http-post':
      if (outPort === 'status') return lang === 'python' ? `_resp_${nodeId.slice(-4)}.status_code` : `(int)_resp_${nodeId.slice(-4)}.StatusCode`;
      return lang === 'python' ? `_resp_${nodeId.slice(-4)}.text` : `_body_${nodeId.slice(-4)}`;
    case 'try-catch':
      if (outPort === 'error') return lang === 'python' ? 'str(e)' : 'e.Message';
      return nil(lang);
    case 'gui-window': return 'root';
    case 'gui-entry':  return lang === 'python' ? `_entry_${nodeId.slice(-4)}.get()` : nil(lang);
    case 'gui-label':  return `_lbl_${nodeId.slice(-4)}`;
    case 'gui-button': return `_btn_${nodeId.slice(-4)}`;
    case 'function-define':
      if (outPort === 'param1') return cfgOr(node, 'param1', 'p1');
      if (outPort === 'param2') return cfgOr(node, 'param2', 'p2');
      if (outPort === 'param3') return cfgOr(node, 'param3', 'p3');
      return nil(lang);
    case 'function-call': return `_ret_${nodeId.slice(-4)}`;

    default: return nil(lang);
  }
}

/* ── Flow-code emitter ────────────────────────────────────────────────────── */

function flow(
  nodeId: string,
  nodes: N[],
  edges: Edge[],
  lang: Lang,
  depth: number,
  visited: Set<string>,
): string[] {
  if (visited.has(nodeId)) return [];
  visited.add(nodeId);

  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return [];

  const d    = node.data;
  const p    = indent(lang, depth);
  const lines: string[] = [];

  const getIn = (port: string) => {
    const e = inputEdge(edges, nodeId, port);
    if (!e) return nil(lang);
    return expr(e.source, e.sourceHandle || 'value', nodes, edges, lang);
  };

  const follow = (port: string, extra = 0) => {
    const t = flowTarget(edges, nodeId, port);
    if (!t) return [] as string[];
    return flow(t, nodes, edges, lang, depth + extra, visited);
  };

  switch (d.templateId) {
    /* ── flow ────────────────────────────────────────────────────────────── */
    case 'start': lines.push(...follow('flow')); break;
    case 'end': break;

    case 'if-else': {
      const c = getIn('condition');
      if (lang === 'python') {
        lines.push(`${p}if ${c}:`);
        const tb = follow('true', 1);
        lines.push(...(tb.length ? tb : [`${p}    pass`]));
        const fb = follow('false', 1);
        if (fb.length) { lines.push(`${p}else:`); lines.push(...fb); }
      } else {
        lines.push(`${p}if (${c})`, `${p}{`);
        lines.push(...follow('true', 1));
        lines.push(`${p}}`);
        const fb = follow('false', 1);
        if (fb.length) { lines.push(`${p}else`, `${p}{`); lines.push(...fb); lines.push(`${p}}`); }
      }
      break;
    }

    case 'while-loop': {
      const c = getIn('condition');
      if (lang === 'python') {
        lines.push(`${p}while ${c}:`);
        const b = follow('loop', 1);
        lines.push(...(b.length ? b : [`${p}    pass`]));
      } else {
        lines.push(`${p}while (${c})`, `${p}{`);
        lines.push(...follow('loop', 1));
        lines.push(`${p}}`);
      }
      lines.push(...follow('done'));
      break;
    }

    case 'for-loop': {
      const v = cfgOr(node, 'varName', 'i');
      const s = getIn('start'), e2 = getIn('end'), st = getIn('step');
      if (lang === 'python') {
        const hasStep = st !== nil(lang) && st !== '1';
        lines.push(`${p}for ${v} in range(${s}, ${e2}${hasStep ? `, ${st}` : ''}):`);
        const b = follow('loop', 1);
        lines.push(...(b.length ? b : [`${p}    pass`]));
      } else {
        const step = st === nil(lang) ? '1' : st;
        lines.push(`${p}for (int ${v} = ${s}; ${v} < ${e2}; ${v} += ${step})`, `${p}{`);
        lines.push(...follow('loop', 1));
        lines.push(`${p}}`);
      }
      lines.push(...follow('done'));
      break;
    }

    case 'for-each': {
      const v = cfgOr(node, 'varName', 'item');
      const col = getIn('collection');
      if (lang === 'python') {
        lines.push(`${p}for ${v} in ${col}:`);
        const b = follow('loop', 1);
        lines.push(...(b.length ? b : [`${p}    pass`]));
      } else {
        lines.push(`${p}foreach (var ${v} in ${col})`, `${p}{`);
        lines.push(...follow('loop', 1));
        lines.push(`${p}}`);
      }
      lines.push(...follow('done'));
      break;
    }

    case 'break':    lines.push(`${p}break${semi(lang)}`); break;
    case 'continue': lines.push(`${p}continue${semi(lang)}`); break;

    case 'comment': {
      const txt = cfgOr(node, 'text', '');
      txt.split('\n').forEach((l: string) => lines.push(`${p}${lang === 'python' ? '#' : '//'} ${l}`));
      break;
    }

    /* ── variables ───────────────────────────────────────────────────────── */
    case 'set-variable': {
      const name = cfgOr(node, 'name', 'myVar');
      const val  = getIn('value');
      lines.push(lang === 'python'
        ? `${p}${name} = ${val}`
        : `${p}var ${name} = ${val};`);
      lines.push(...follow('flow'));
      break;
    }

    /* ── io ───────────────────────────────────────────────────────────────── */
    case 'print': {
      const v = getIn('value');
      lines.push(lang === 'python' ? `${p}print(${v})` : `${p}Console.WriteLine(${v});`);
      lines.push(...follow('flow'));
      break;
    }

    case 'input': {
      const pr = cfgOr(node, 'prompt', 'Enter value: ');
      const vn = `_input_${nodeId.slice(-4)}`;
      if (lang === 'python') {
        lines.push(`${p}${vn} = input("${pr}")`);
      } else {
        lines.push(`${p}Console.Write("${pr}");`, `${p}var ${vn} = Console.ReadLine();`);
      }
      lines.push(...follow('flow'));
      break;
    }

    case 'read-file': {
      const pa = getIn('path');
      const vn = `_file_${nodeId.slice(-4)}`;
      if (lang === 'python') {
        lines.push(`${p}with open(${pa}, 'r') as _f:`, `${p}    ${vn} = _f.read()`);
      } else {
        lines.push(`${p}var ${vn} = File.ReadAllText(${pa});`);
      }
      lines.push(...follow('flow'));
      break;
    }

    case 'write-file': {
      const pa = getIn('path'), ct = getIn('content');
      if (lang === 'python') {
        lines.push(`${p}with open(${pa}, 'w') as _f:`, `${p}    _f.write(${ct})`);
      } else {
        lines.push(`${p}File.WriteAllText(${pa}, ${ct});`);
      }
      lines.push(...follow('flow'));
      break;
    }

    /* ── functions ────────────────────────────────────────────────────────── */
    case 'function-call': {
      const fn = cfgOr(node, 'name', 'my_function');
      const args: string[] = [];
      for (const a of ['arg1', 'arg2', 'arg3']) {
        const v = getIn(a);
        if (v !== nil(lang)) args.push(v);
      }
      const vn = `_ret_${nodeId.slice(-4)}`;
      if (lang === 'python') {
        lines.push(`${p}${vn} = ${fn}(${args.join(', ')})`);
      } else {
        lines.push(`${p}var ${vn} = ${fn}(${args.join(', ')});`);
      }
      lines.push(...follow('flow'));
      break;
    }

    case 'return': {
      const v = getIn('value');
      lines.push(lang === 'python' ? `${p}return ${v}` : `${p}return ${v};`);
      break;
    }

    /* ── errors ───────────────────────────────────────────────────────────── */
    case 'try-catch': {
      if (lang === 'python') {
        lines.push(`${p}try:`);
        const tb = follow('try', 1);
        lines.push(...(tb.length ? tb : [`${p}    pass`]));
        lines.push(`${p}except Exception as e:`);
        const cb = follow('catch', 1);
        lines.push(...(cb.length ? cb : [`${p}    pass`]));
        const fb = follow('finally', 1);
        if (fb.length) { lines.push(`${p}finally:`); lines.push(...fb); }
      } else {
        lines.push(`${p}try`, `${p}{`);
        lines.push(...follow('try', 1));
        lines.push(`${p}}`, `${p}catch (Exception e)`, `${p}{`);
        lines.push(...follow('catch', 1));
        lines.push(`${p}}`);
        const fb = follow('finally', 1);
        if (fb.length) { lines.push(`${p}finally`, `${p}{`); lines.push(...fb); lines.push(`${p}}`); }
      }
      break;
    }

    case 'throw': {
      const msg = getIn('message');
      const tp  = cfgOr(node, 'type', 'Exception');
      lines.push(lang === 'python' ? `${p}raise ${tp}(${msg})` : `${p}throw new ${tp}(${msg});`);
      break;
    }

    /* ── collections (flow nodes) ─────────────────────────────────────────── */
    case 'list-append': {
      const lst = getIn('list'), it = getIn('item');
      lines.push(lang === 'python' ? `${p}${lst}.append(${it})` : `${p}${lst}.Add(${it});`);
      lines.push(...follow('flow'));
      break;
    }
    case 'list-set': {
      const lst = getIn('list'), idx = getIn('index'), val = getIn('value');
      lines.push(`${p}${lst}[${idx}] = ${val}${semi(lang)}`);
      lines.push(...follow('flow'));
      break;
    }
    case 'list-remove': {
      const lst = getIn('list'), idx = getIn('index');
      lines.push(lang === 'python' ? `${p}del ${lst}[${idx}]` : `${p}${lst}.RemoveAt(${idx});`);
      lines.push(...follow('flow'));
      break;
    }
    case 'dict-set': {
      const dict = getIn('dict'), k = getIn('key'), v = getIn('value');
      lines.push(`${p}${dict}[${k}] = ${v}${semi(lang)}`);
      lines.push(...follow('flow'));
      break;
    }

    /* ── network ──────────────────────────────────────────────────────────── */
    case 'http-get': {
      const url = getIn('url');
      const vn = `_resp_${nodeId.slice(-4)}`;
      if (lang === 'python') {
        lines.push(`${p}${vn} = requests.get(${url})`);
      } else {
        lines.push(`${p}var ${vn} = await new HttpClient().GetAsync(${url});`);
        lines.push(`${p}var _body_${nodeId.slice(-4)} = await ${vn}.Content.ReadAsStringAsync();`);
      }
      lines.push(...follow('flow'));
      break;
    }
    case 'http-post': {
      const url = getIn('url'), body = getIn('body');
      const vn = `_resp_${nodeId.slice(-4)}`;
      if (lang === 'python') {
        lines.push(`${p}${vn} = requests.post(${url}, data=${body})`);
      } else {
        lines.push(`${p}var _content_${nodeId.slice(-4)} = new StringContent(${body});`);
        lines.push(`${p}var ${vn} = await new HttpClient().PostAsync(${url}, _content_${nodeId.slice(-4)});`);
        lines.push(`${p}var _body_${nodeId.slice(-4)} = await ${vn}.Content.ReadAsStringAsync();`);
      }
      lines.push(...follow('flow'));
      break;
    }

    /* ── gui ──────────────────────────────────────────────────────────────── */
    case 'gui-window': {
      const t = cfgOr(node, 'title', 'My App');
      const w = cfgOr(node, 'width', '400'), h = cfgOr(node, 'height', '300');
      if (lang === 'python') {
        lines.push(`${p}root = tk.Tk()`, `${p}root.title("${t}")`, `${p}root.geometry("${w}x${h}")`);
      } else {
        lines.push(`${p}// GUI not supported in C# console — use WinForms/WPF`);
      }
      lines.push(...follow('flow'));
      break;
    }
    case 'gui-label': {
      const txt = cfgOr(node, 'text', 'Hello');
      const sz  = cfgOr(node, 'fontSize', '12');
      const par = getIn('parent');
      const vn  = `_lbl_${nodeId.slice(-4)}`;
      if (lang === 'python') {
        lines.push(`${p}${vn} = tk.Label(${par !== 'None' ? par : 'root'}, text="${txt}", font=("Arial", ${sz}))`);
        lines.push(`${p}${vn}.pack(pady=5)`);
      }
      lines.push(...follow('flow'));
      break;
    }
    case 'gui-button': {
      const txt = cfgOr(node, 'text', 'Click Me');
      const par = getIn('parent');
      const vn  = `_btn_${nodeId.slice(-4)}`;
      if (lang === 'python') {
        const clickTarget = flowTarget(edges, nodeId, 'onClick');
        if (clickTarget) {
          const handlerName = `_on_click_${nodeId.slice(-4)}`;
          lines.push(`${p}def ${handlerName}():`);
          const hLines = flow(clickTarget, nodes, edges, lang, depth + 1, new Set());
          lines.push(...(hLines.length ? hLines : [`${p}    pass`]));
          lines.push(`${p}${vn} = tk.Button(${par !== 'None' ? par : 'root'}, text="${txt}", command=${handlerName})`);
        } else {
          lines.push(`${p}${vn} = tk.Button(${par !== 'None' ? par : 'root'}, text="${txt}")`);
        }
        lines.push(`${p}${vn}.pack(pady=5)`);
      }
      lines.push(...follow('flow'));
      break;
    }
    case 'gui-entry': {
      const par = getIn('parent');
      const w   = cfgOr(node, 'width', '20');
      const vn  = `_entry_${nodeId.slice(-4)}`;
      if (lang === 'python') {
        lines.push(`${p}${vn} = tk.Entry(${par !== 'None' ? par : 'root'}, width=${w})`);
        lines.push(`${p}${vn}.pack(pady=5)`);
      }
      lines.push(...follow('flow'));
      break;
    }
    case 'gui-mainloop': {
      const win = getIn('window');
      if (lang === 'python') lines.push(`${p}${win !== 'None' ? win : 'root'}.mainloop()`);
      break;
    }

    /* ── advanced ─────────────────────────────────────────────────────────── */
    case 'import-module': {
      const mod = cfgOr(node, 'module', '');
      const al  = cfg(node, 'alias');
      if (lang === 'python') {
        lines.push(al ? `${p}import ${mod} as ${al}` : `${p}import ${mod}`);
      } else {
        lines.push(`${p}using ${mod};`);
      }
      lines.push(...follow('flow'));
      break;
    }
    case 'sleep': {
      const sec = getIn('seconds');
      lines.push(lang === 'python' ? `${p}time.sleep(${sec})` : `${p}Thread.Sleep((int)(${sec} * 1000));`);
      lines.push(...follow('flow'));
      break;
    }
    case 'custom-code': {
      cfgOr(node, 'code', '').split('\n').forEach((l: string) => lines.push(`${p}${l}`));
      lines.push(...follow('flow'));
      break;
    }

    default:
      lines.push(`${p}${lang === 'python' ? '#' : '//'} [${d.label}]`);
      break;
  }

  return lines;
}

/* ── Import analysis ──────────────────────────────────────────────────────── */

function analyzeImports(nodes: N[]): Set<string> {
  const f = new Set<string>();
  for (const n of nodes) {
    const t = n.data.templateId;
    if (t.startsWith('gui-'))          f.add('tkinter');
    if (t.startsWith('http-'))         f.add('requests');
    if (t === 'json-parse' || t === 'json-stringify') f.add('json');
    if (t === 'sleep')                 f.add('time');
    if (t === 'math-random')           f.add('random');
    if (t === 'math-sqrt')             f.add('math');
  }
  return f;
}

function pyImports(f: Set<string>): string {
  let s = '';
  if (f.has('tkinter')) s += 'import tkinter as tk\nfrom tkinter import ttk, messagebox\n';
  if (f.has('json'))     s += 'import json\n';
  if (f.has('requests')) s += 'import requests\n';
  if (f.has('time'))     s += 'import time\n';
  if (f.has('random'))   s += 'import random\n';
  if (f.has('math'))     s += 'import math\n';
  return s;
}

function csImports(f: Set<string>): string {
  let s = 'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n';
  if (f.has('json'))     s += 'using Newtonsoft.Json;\n';
  if (f.has('requests')) s += 'using System.Net.Http;\n';
  if (f.has('time'))     s += 'using System.Threading;\n';
  if (f.has('tkinter'))  s += '// GUI: Use WinForms / WPF in a real project\n';
  return s;
}

/* ── Public entry point ──────────────────────────────────────────────────── */

export function generateCode(
  nodes: N[] | Node[],
  edges: Edge[],
  language: Lang,
): string {
  const safeNodes = (Array.isArray(nodes) ? nodes : []) as N[];
  const safeEdges = Array.isArray(edges) ? edges : [];

  if (safeNodes.length === 0) {
    return language === 'python'
      ? '# Drag nodes from the library to start building!\n'
      : '// Drag nodes from the library to start building!\n';
  }

  const features  = analyzeImports(safeNodes);
  const funcNodes = safeNodes.filter((n) => n.data?.templateId === 'function-define');
  const starts    = safeNodes.filter((n) => n.data?.templateId === 'start');

  let code = '';

  if (language === 'python') {
    code += '# ─── Generated Python Code ─── REALVS ───\n\n';
    const imp = pyImports(features);
    if (imp) code += imp + '\n';

    // Function definitions
    for (const fn of funcNodes) {
      const name = cfgOr(fn, 'name', 'my_function');
      const params: string[] = [];
      for (const k of ['param1', 'param2', 'param3']) {
        const v = cfg(fn, k);
        if (v) params.push(v);
      }
      code += `\ndef ${name}(${params.join(', ')}):\n`;
      const body = flow(fn.id, safeNodes, safeEdges, language, 1, new Set());
      code += (body.length ? body.join('\n') : '    pass') + '\n';
    }

    // Main
    if (starts.length > 0) {
      code += '\ndef main():\n';
      const body = flow(starts[0].id, safeNodes, safeEdges, language, 1, new Set());
      code += (body.length ? body.join('\n') : '    pass') + '\n';
      code += '\n\nif __name__ == "__main__":\n    main()\n';
    }
  } else {
    code += '// ─── Generated C# Code ─── REALVS ───\n\n';
    code += csImports(features);
    code += '\npublic class Program\n{\n';

    for (const fn of funcNodes) {
      const name = cfgOr(fn, 'name', 'MyFunction');
      const params: string[] = [];
      for (const k of ['param1', 'param2', 'param3']) {
        const v = cfg(fn, k);
        if (v) params.push(`object ${v}`);
      }
      code += `    public static object ${name}(${params.join(', ')})\n    {\n`;
      const body = flow(fn.id, safeNodes, safeEdges, language, 2, new Set());
      code += (body.length ? body.join('\n') : '        // empty') + '\n';
      code += '    }\n\n';
    }

    if (starts.length > 0) {
      code += '    public static void Main(string[] args)\n    {\n';
      const body = flow(starts[0].id, safeNodes, safeEdges, language, 2, new Set());
      code += (body.length ? body.join('\n') : '        // empty') + '\n';
      code += '    }\n';
    }

    code += '}\n';
  }

  return code;
}
