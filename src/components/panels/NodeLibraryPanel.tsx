// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Node Library  (searchable, categorised sidebar)
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import { Node } from 'reactflow';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { nodeDefinitions, ALL_CATEGORIES } from '../../definitions/nodeDefinitions';
import { CATEGORY_LABELS, CATEGORY_COLORS, CATEGORY_ICONS, NodeCategory, VSNodeData, NodeTemplate } from '../../types';
import { useVisualScriptingStore } from '../../store/visualScriptingStore';

export function NodeLibraryPanel() {
  const { addNode, searchQuery, setSearchQuery } = useVisualScriptingStore();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (cat: string) =>
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));

  /* Filter nodes by search */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return nodeDefinitions;
    return nodeDefinitions.filter(
      (n) =>
        n.label.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  /* Drag start — put template JSON into transfer */
  const onDragStart = (e: React.DragEvent, tpl: NodeTemplate) => {
    e.dataTransfer.setData('application/realvs-node', JSON.stringify(tpl));
    e.dataTransfer.effectAllowed = 'copy';
  };

  /* Click to add at random position */
  const onClickAdd = (tpl: NodeTemplate) => {
    const newId = `${tpl.id}-${Date.now()}`;
    const configValues: Record<string, string> = {};
    tpl.config?.forEach((c) => { if (c.defaultValue !== undefined) configValues[c.id] = c.defaultValue; });

    const node: Node<VSNodeData> = {
      id: newId,
      type: 'vsNode',
      position: { x: 250 + Math.random() * 200, y: 100 + Math.random() * 300 },
      data: {
        templateId: tpl.id,
        label: tpl.label,
        category: tpl.category,
        description: tpl.description,
        inputs: tpl.inputs,
        outputs: tpl.outputs,
        config: tpl.config,
        configValues,
        color: tpl.color,
      },
    };
    addNode(node);
  };

  return (
    <aside className="vs-library">
      <div className="vs-library__header">
        <h2 className="vs-library__title">Nodes</h2>
        <span className="vs-library__count">{filtered.length}</span>
      </div>

      {/* Search */}
      <div className="vs-library__search">
        <Search size={14} className="vs-library__search-icon" />
        <input
          className="vs-library__search-input"
          placeholder="Search nodes…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="vs-library__list">
        {ALL_CATEGORIES.map((cat) => {
          const items = filtered.filter((n) => n.category === cat);
          if (items.length === 0) return null;
          const isOpen = !collapsed[cat];

          return (
            <div key={cat} className="vs-library__category">
              <button className="vs-library__cat-header" onClick={() => toggle(cat)}>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span
                  className="vs-library__cat-dot"
                  style={{ background: CATEGORY_COLORS[cat as NodeCategory] }}
                />
                <span className="vs-library__cat-label">{CATEGORY_LABELS[cat as NodeCategory]}</span>
                <span className="vs-library__cat-count">{items.length}</span>
              </button>

              {isOpen && (
                <div className="vs-library__cat-items">
                  {items.map((tpl) => (
                    <div
                      key={tpl.id}
                      className="vs-library__item"
                      draggable
                      onDragStart={(e) => onDragStart(e, tpl)}
                      onClick={() => onClickAdd(tpl)}
                      title={tpl.description}
                    >
                      <span className="vs-library__item-icon" style={{ color: tpl.color }}>
                        {CATEGORY_ICONS[tpl.category]}
                      </span>
                      <div className="vs-library__item-info">
                        <span className="vs-library__item-name">{tpl.label}</span>
                        <span className="vs-library__item-desc">{tpl.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
