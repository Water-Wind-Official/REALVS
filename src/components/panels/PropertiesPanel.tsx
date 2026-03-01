// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Properties Panel  (edit selected node)
// ═══════════════════════════════════════════════════════════════════════════════

// React is in scope via JSX transform
import { Trash2, Copy, Settings } from 'lucide-react';
import { useVisualScriptingStore } from '../../store/visualScriptingStore';
import { CATEGORY_LABELS, PORT_COLORS } from '../../types';

export function PropertiesPanel() {
  const {
    nodes, selectedNodeId,
    updateNodeConfig, removeNode, duplicateNode,
  } = useVisualScriptingStore();

  const node = nodes.find((n) => n.id === selectedNodeId);

  if (!node) {
    return (
      <div className="vs-props vs-props--empty">
        <Settings size={32} className="vs-props__empty-icon" />
        <p>Select a node to edit its properties</p>
      </div>
    );
  }

  const d = node.data;

  return (
    <div className="vs-props">
      {/* header */}
      <div className="vs-props__header" style={{ borderLeftColor: d.color }}>
        <div>
          <h3 className="vs-props__name">{d.label}</h3>
          <span className="vs-props__cat">{CATEGORY_LABELS[d.category]}</span>
        </div>
        <div className="vs-props__actions">
          <button className="vs-props__action" onClick={() => duplicateNode(node.id)} title="Duplicate">
            <Copy size={14} />
          </button>
          <button className="vs-props__action vs-props__action--danger" onClick={() => removeNode(node.id)} title="Delete">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* description */}
      <p className="vs-props__desc">{d.description}</p>

      {/* inputs */}
      {d.inputs.length > 0 && (
        <div className="vs-props__section">
          <h4 className="vs-props__section-title">Inputs</h4>
          {d.inputs.map((p) => (
            <div key={p.id} className="vs-props__port">
              <span className="vs-props__port-dot" style={{ background: PORT_COLORS[p.type] }} />
              <span className="vs-props__port-name">{p.label}</span>
              <span className="vs-props__port-type">{p.type}</span>
            </div>
          ))}
        </div>
      )}

      {/* outputs */}
      {d.outputs.length > 0 && (
        <div className="vs-props__section">
          <h4 className="vs-props__section-title">Outputs</h4>
          {d.outputs.map((p) => (
            <div key={p.id} className="vs-props__port">
              <span className="vs-props__port-dot" style={{ background: PORT_COLORS[p.type] }} />
              <span className="vs-props__port-name">{p.label}</span>
              <span className="vs-props__port-type">{p.type}</span>
            </div>
          ))}
        </div>
      )}

      {/* config fields */}
      {d.config && d.config.length > 0 && (
        <div className="vs-props__section">
          <h4 className="vs-props__section-title">Configuration</h4>
          {d.config.map((f) => (
            <div key={f.id} className="vs-props__field">
              <label className="vs-props__field-label">{f.label}</label>
              {f.type === 'select' ? (
                <select
                  className="vs-props__field-input"
                  value={d.configValues?.[f.id] ?? f.defaultValue ?? ''}
                  onChange={(e) => updateNodeConfig(node.id, f.id, e.target.value)}
                >
                  {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea
                  className="vs-props__field-input vs-props__field-textarea"
                  value={d.configValues?.[f.id] ?? f.defaultValue ?? ''}
                  placeholder={f.placeholder}
                  rows={3}
                  onChange={(e) => updateNodeConfig(node.id, f.id, e.target.value)}
                />
              ) : f.type === 'boolean' ? (
                <label className="vs-props__field-check">
                  <input
                    type="checkbox"
                    checked={(d.configValues?.[f.id] ?? f.defaultValue) === 'true'}
                    onChange={(e) => updateNodeConfig(node.id, f.id, e.target.checked ? 'true' : 'false')}
                  />
                </label>
              ) : (
                <input
                  className="vs-props__field-input"
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={d.configValues?.[f.id] ?? f.defaultValue ?? ''}
                  placeholder={f.placeholder}
                  onChange={(e) => updateNodeConfig(node.id, f.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* node ID (debug) */}
      <div className="vs-props__id">
        <span>ID</span>
        <code>{node.id}</code>
      </div>
    </div>
  );
}
