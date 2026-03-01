// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Custom Node  (the visual building block)
// ═══════════════════════════════════════════════════════════════════════════════

import React, { memo, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { VSNodeData, PortDefinition, ConfigField, PORT_COLORS, CATEGORY_ICONS } from '../../types';
import { useVisualScriptingStore } from '../../store/visualScriptingStore';

/* ── Constants for layout calculation ─────────────────────────────────────── */
const HEADER_H  = 30;
const ROW_H     = 22;
const BODY_PAD  = 6;

function CustomNodeInner({ id, data, selected }: NodeProps<VSNodeData>) {
  const { removeNode, updateNodeConfig, setSelectedNodeId } = useVisualScriptingStore();

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(id);
  }, [id, setSelectedNodeId]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeNode(id);
  }, [id, removeNode]);

  const color    = data.color || '#6b7280';
  const inputs   = data.inputs ?? [];
  const outputs  = data.outputs ?? [];
  const configs  = data.config ?? [];
  const maxPorts = Math.max(inputs.length, outputs.length);

  /* Compute handle Y positions */
  const portY = (idx: number) => HEADER_H + BODY_PAD + idx * ROW_H + ROW_H / 2;

  return (
    <div
      className={`vs-node ${selected ? 'vs-node--selected' : ''}`}
      onClick={handleClick}
    >
      {/* ── INPUT HANDLES ──────────────────────────────────────────────── */}
      {inputs.map((p: PortDefinition, i: number) => (
        <Handle
          key={`i-${p.id}`}
          type="target"
          position={Position.Left}
          id={p.id}
          className="vs-handle"
          style={{ top: portY(i), background: PORT_COLORS[p.type] }}
        />
      ))}

      {/* ── OUTPUT HANDLES ─────────────────────────────────────────────── */}
      {outputs.map((p: PortDefinition, i: number) => (
        <Handle
          key={`o-${p.id}`}
          type="source"
          position={Position.Right}
          id={p.id}
          className="vs-handle"
          style={{ top: portY(i), background: PORT_COLORS[p.type] }}
        />
      ))}

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div className="vs-node__header" style={{ background: color }}>
        <span className="vs-node__icon">{CATEGORY_ICONS[data.category] ?? '◈'}</span>
        <span className="vs-node__title">{data.label}</span>
        <button className="vs-node__close" onClick={handleDelete} title="Delete">×</button>
      </div>

      {/* ── PORT ROWS (two-column: inputs left, outputs right) ─────────── */}
      <div className="vs-node__body">
        {Array.from({ length: maxPorts }).map((_, i) => (
          <div key={i} className="vs-port-row" style={{ height: ROW_H }}>
            {/* left = input */}
            <div className="vs-port-label vs-port-label--in">
              {inputs[i] && (
                <>
                  <span className="vs-port-dot" style={{ background: PORT_COLORS[inputs[i].type] }} />
                  <span>{inputs[i].label}</span>
                </>
              )}
            </div>
            {/* right = output */}
            <div className="vs-port-label vs-port-label--out">
              {outputs[i] && (
                <>
                  <span>{outputs[i].label}</span>
                  <span className="vs-port-dot" style={{ background: PORT_COLORS[outputs[i].type] }} />
                </>
              )}
            </div>
          </div>
        ))}

        {/* ── CONFIG FIELDS ─────────────────────────────────────────────── */}
        {configs.map((f: ConfigField) => (
          <div key={f.id} className="vs-config">
            <label className="vs-config__label">{f.label}</label>
            {f.type === 'select' ? (
              <select
                className="vs-config__input"
                value={data.configValues?.[f.id] ?? f.defaultValue ?? ''}
                onChange={(e) => { e.stopPropagation(); updateNodeConfig(id, f.id, e.target.value); }}
                onClick={(e) => e.stopPropagation()}
              >
                {f.options?.map((o: { value: string; label: string }) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea
                className="vs-config__input vs-config__textarea"
                value={data.configValues?.[f.id] ?? f.defaultValue ?? ''}
                placeholder={f.placeholder}
                rows={2}
                onChange={(e) => { e.stopPropagation(); updateNodeConfig(id, f.id, e.target.value); }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : f.type === 'boolean' ? (
              <label className="vs-config__check">
                <input
                  type="checkbox"
                  checked={(data.configValues?.[f.id] ?? f.defaultValue) === 'true'}
                  onChange={(e) => { e.stopPropagation(); updateNodeConfig(id, f.id, e.target.checked ? 'true' : 'false'); }}
                  onClick={(e) => e.stopPropagation()}
                />
              </label>
            ) : (
              <input
                className="vs-config__input"
                type={f.type === 'number' ? 'number' : 'text'}
                value={data.configValues?.[f.id] ?? f.defaultValue ?? ''}
                placeholder={f.placeholder}
                onChange={(e) => { e.stopPropagation(); updateNodeConfig(id, f.id, e.target.value); }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const CustomNode = memo(CustomNodeInner);
