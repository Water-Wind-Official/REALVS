// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Node Library  (smart, organized sidebar with subcategories)
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import { Node } from 'reactflow';
import { Search, ChevronDown, ChevronRight, Star, Clock } from 'lucide-react';
import { nodeDefinitions, ALL_CATEGORIES } from '../../definitions/nodeDefinitions';
import { CATEGORY_LABELS, CATEGORY_COLORS, CATEGORY_ICONS, NodeCategory, VSNodeData, NodeTemplate } from '../../types';
import { useVisualScriptingStore } from '../../store/visualScriptingStore';

export function NodeLibraryPanel() {
  const { addNode, searchQuery, setSearchQuery, recentlyUsedNodes, favoriteNodes, addRecentlyUsed, toggleFavorite } =
    useVisualScriptingStore();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});

  const toggle = (cat: string) => setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  const toggleSub = (key: string) => setExpandedSubcategories((prev) => ({ ...prev, [key]: !prev[key] }));

  /* Fuzzy search matching */
  const fuzzyMatch = (query: string, text: string): boolean => {
    const q = query.toLowerCase();
    const t = text.toLowerCase();
    if (t.includes(q)) return true;
    let qIdx = 0;
    for (let i = 0; i < t.length && qIdx < q.length; i++) {
      if (t[i] === q[qIdx]) qIdx++;
    }
    return qIdx === q.length;
  };

  /* Filter nodes by search */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return nodeDefinitions;
    return nodeDefinitions.filter(
      (n) =>
        fuzzyMatch(q, n.label) ||
        fuzzyMatch(q, n.description) ||
        fuzzyMatch(q, n.category) ||
        (n.subcategory && fuzzyMatch(q, n.subcategory)) ||
        (n.tags && n.tags.some((tag) => fuzzyMatch(q, tag))),
    );
  }, [searchQuery]);

  // Get recently used nodes
  const recentNodeTemplates = useMemo(() => {
    return recentlyUsedNodes
      .map((id) => nodeDefinitions.find((n) => n.id === id))
      .filter((n) => n !== undefined) as NodeTemplate[];
  }, [recentlyUsedNodes]);

  // Get favorite nodes
  const favoriteNodeTemplates = useMemo(() => {
    return favoriteNodes
      .map((id) => nodeDefinitions.find((n) => n.id === id))
      .filter((n) => n !== undefined) as NodeTemplate[];
  }, [favoriteNodes]);

  /* Drag start — put template JSON into transfer */
  const onDragStart = (e: React.DragEvent, tpl: NodeTemplate) => {
    e.dataTransfer.setData('application/realvs-node', JSON.stringify(tpl));
    e.dataTransfer.effectAllowed = 'copy';
  };

  /* Click to add at random position */
  const onClickAdd = (tpl: NodeTemplate) => {
    addRecentlyUsed(tpl.id);
    const newId = `${tpl.id}-${Date.now()}`;
    const configValues: Record<string, string> = {};
    tpl.config?.forEach((c) => {
      if (c.defaultValue !== undefined) configValues[c.id] = c.defaultValue;
    });

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

  /* Render a single node item */
  const renderNodeItem = (tpl: NodeTemplate) => (
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
      <button
        className={`vs-library__item-favorite ${favoriteNodes.includes(tpl.id) ? 'vs-library__item-favorite--active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(tpl.id);
        }}
        title={favoriteNodes.includes(tpl.id) ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Star size={14} />
      </button>
    </div>
  );

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

      <div className="vs-library__list">
        {/* FAVORITES Section */}
        {!searchQuery && favoriteNodeTemplates.length > 0 && (
          <div className="vs-library__section">
            <button
              className="vs-library__section-header"
              onClick={() => toggle('favorites')}
            >
              <Star size={14} className="vs-library__section-icon" />
              <span className="vs-library__section-title">Favorites</span>
              <span className="vs-library__section-count">{favoriteNodeTemplates.length}</span>
              {!collapsed['favorites'] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {!collapsed['favorites'] && (
              <div className="vs-library__section-items">
                {favoriteNodeTemplates.map((tpl) => renderNodeItem(tpl))}
              </div>
            )}
          </div>
        )}

        {/* RECENTLY USED Section */}
        {!searchQuery && recentNodeTemplates.length > 0 && (
          <div className="vs-library__section">
            <button
              className="vs-library__section-header"
              onClick={() => toggle('recent')}
            >
              <Clock size={14} className="vs-library__section-icon" />
              <span className="vs-library__section-title">Recently Used</span>
              <span className="vs-library__section-count">{recentNodeTemplates.length}</span>
              {!collapsed['recent'] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {!collapsed['recent'] && (
              <div className="vs-library__section-items">
                {recentNodeTemplates.slice(0, 5).map((tpl) => renderNodeItem(tpl))}
              </div>
            )}
          </div>
        )}

        {/* CATEGORIES with SUBCATEGORIES */}
        {ALL_CATEGORIES.map((cat) => {
          const catItems = filtered.filter((n) => n.category === cat);
          if (catItems.length === 0) return null;

          const isOpen = !collapsed[cat];

          // Group by subcategory
          const subgroups = new Map<string, NodeTemplate[]>();
          catItems.forEach((item) => {
            const sub = item.subcategory || 'Other';
            if (!subgroups.has(sub)) subgroups.set(sub, []);
            subgroups.get(sub)!.push(item);
          });

          const subArray = Array.from(subgroups.entries());
          const hasMultipleSubcats = subArray.length > 1;

          return (
            <div key={cat} className="vs-library__category">
              <button className="vs-library__cat-header" onClick={() => toggle(cat)}>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span
                  className="vs-library__cat-dot"
                  style={{ background: CATEGORY_COLORS[cat as NodeCategory] }}
                />
                <span className="vs-library__cat-label">{CATEGORY_LABELS[cat as NodeCategory]}</span>
                <span className="vs-library__cat-count">{catItems.length}</span>
              </button>

              {isOpen && (
                <div className="vs-library__cat-content">
                  {hasMultipleSubcats ? (
                    // Show subcategories
                    subArray.map(([subcat, items]) => {
                      const subKey = `${cat}-${subcat}`;
                      const subOpen = !expandedSubcategories[subKey];

                      return (
                        <div key={subKey} className="vs-library__subcat">
                          <button
                            className="vs-library__subcat-header"
                            onClick={() => toggleSub(subKey)}
                          >
                            {subOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                            <span className="vs-library__subcat-name">{subcat}</span>
                            <span className="vs-library__subcat-count">{items.length}</span>
                          </button>
                          {subOpen && (
                            <div className="vs-library__subcat-items">
                              {items.map((tpl) => renderNodeItem(tpl))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    // Single subcategory - just show items
                    <div className="vs-library__cat-items">
                      {catItems.map((tpl) => renderNodeItem(tpl))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
