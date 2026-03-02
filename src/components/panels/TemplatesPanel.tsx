// ═══════════════════════════════════════════════════════════════════════════════
// REALVS — Templates Panel
// Pre-built application templates with one-click loading
// ═══════════════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import { Zap, ChevronRight, AlertCircle } from 'lucide-react';
import { allTemplates } from '../../definitions/templateDefinitions';
import { useVisualScriptingStore } from '../../store/visualScriptingStore';

export function TemplatesPanel() {
  const { loadTemplate, nodes } = useVisualScriptingStore();
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const handleLoadTemplate = (templateId: string) => {
    const template = allTemplates.find((t) => t.id === templateId);
    if (!template) return;

    // If canvas is not empty, show confirmation
    if (nodes.length > 0) {
      setShowConfirmation(templateId);
    } else {
      loadTemplate(template.nodes, template.edges);
      setShowConfirmation(null);
    }
  };

  const confirmLoadTemplate = (templateId: string) => {
    const template = allTemplates.find((t) => t.id === templateId);
    if (template) {
      loadTemplate(template.nodes, template.edges);
    }
    setShowConfirmation(null);
  };

  return (
    <div className="vs-templates">
      <div className="vs-templates__header">
        <div className="vs-templates__title-row">
          <Zap size={18} className="vs-templates__icon" />
          <h2 className="vs-templates__title">Templates</h2>
        </div>
        <p className="vs-templates__subtitle">Start with pre-built examples</p>
      </div>

      <div className="vs-templates__list">
        {allTemplates.map((template) => (
          <div
            key={template.id}
            className="vs-templates__template-card"
            onMouseEnter={() => setExpandedTemplate(template.id)}
            onMouseLeave={() => setExpandedTemplate(null)}
          >
            <div className="vs-templates__template-header">
              <div className="vs-templates__template-info">
                <h3 className="vs-templates__template-name">{template.label}</h3>
                <p className="vs-templates__template-desc">{template.description}</p>
              </div>
              <ChevronRight
                size={18}
                className={`vs-templates__template-chevron ${
                  expandedTemplate === template.id ? 'vs-templates__template-chevron--expanded' : ''
                }`}
              />
            </div>

            {expandedTemplate === template.id && (
              <div className="vs-templates__template-details">
                <p className="vs-templates__template-preview">
                  <strong>Preview:</strong> {template.preview}
                </p>
                <p className="vs-templates__template-stats">
                  <strong>Nodes:</strong> {template.nodes.length} • <strong>Connections:</strong> {template.edges.length}
                </p>
                <button
                  className="vs-templates__load-btn"
                  onClick={() => handleLoadTemplate(template.id)}
                  title="Load this template on your canvas"
                >
                  Load Template
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="vs-templates__modal-overlay" onClick={() => setShowConfirmation(null)}>
          <div className="vs-templates__modal" onClick={(e) => e.stopPropagation()}>
            <div className="vs-templates__modal-header">
              <AlertCircle size={20} className="vs-templates__modal-icon" />
              <h3 className="vs-templates__modal-title">Load Template?</h3>
            </div>
            <p className="vs-templates__modal-text">Your current canvas will be replaced. You can undo this action.</p>
            <div className="vs-templates__modal-actions">
              <button className="vs-templates__modal-btn vs-templates__modal-btn--cancel" onClick={() => setShowConfirmation(null)}>
                Cancel
              </button>
              <button
                className="vs-templates__modal-btn vs-templates__modal-btn--confirm"
                onClick={() => confirmLoadTemplate(showConfirmation)}
              >
                Load Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
