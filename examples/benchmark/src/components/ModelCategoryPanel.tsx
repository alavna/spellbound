import { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import type { ModelConfig, ModelCategory } from '../types';

interface CategoryGroup {
  category: ModelCategory;
  label: string;
  models: ModelConfig[];
}

interface Props {
  models: ModelConfig[];
  onToggleModel: (id: string) => void;
  onRemoveModel: (id: string) => void;
}

const CATEGORY_LABELS: Record<ModelCategory, string> = {
  'cloud-llm': 'Cloud LLMs',
  'rule-based': 'Rule-Based (Offline)',
  'local-service': 'Local Services',
  'ml-offline': 'ML Models (Browser)',
};

const CATEGORY_ORDER: ModelCategory[] = ['rule-based', 'cloud-llm', 'local-service', 'ml-offline'];

function getBadgeClass(category: ModelCategory): string {
  switch (category) {
    case 'rule-based': return 'offline';
    case 'ml-offline': return 'offline';
    case 'local-service': return 'local';
    case 'cloud-llm': return '';
    default: return '';
  }
}

export function ModelCategoryPanel({ models, onToggleModel, onRemoveModel }: Props) {
  const [collapsed, setCollapsed] = useState<Set<ModelCategory>>(new Set());

  // Group models by category
  const groups: CategoryGroup[] = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    models: models.filter((m) => m.category === cat),
  })).filter((g) => g.models.length > 0);

  // Uncategorized models
  const uncategorized = models.filter((m) => !m.category);

  const toggleCollapse = (cat: ModelCategory) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <div className="model-category-panel">
      {groups.map((group) => {
        const isCollapsed = collapsed.has(group.category);
        const enabledCount = group.models.filter((m) => m.enabled).length;

        return (
          <div key={group.category} className="model-category-group">
            <button
              className="model-category-header"
              onClick={() => toggleCollapse(group.category)}
            >
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
              <span className="model-category-label">{group.label}</span>
              <span className="model-category-count">
                {enabledCount}/{group.models.length}
              </span>
            </button>
            {!isCollapsed && (
              <div className="model-list">
                {group.models.map((model) => (
                  <div key={model.id} className="model-item">
                    <label className="model-item-label">
                      <input
                        type="checkbox"
                        checked={model.enabled}
                        onChange={() => onToggleModel(model.id)}
                      />
                      <span className="model-label">{model.label}</span>
                      {getBadgeClass(group.category) && (
                        <span className={`model-badge ${getBadgeClass(group.category)}`}>
                          {group.category === 'local-service' ? 'local' : group.category}
                        </span>
                      )}
                    </label>
                    <button
                      className="model-remove-btn"
                      onClick={() => onRemoveModel(model.id)}
                      title={`Remove ${model.label}`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      {uncategorized.length > 0 && (
        <div className="model-category-group">
          <div className="model-category-header">
            <span className="model-category-label">Other</span>
          </div>
          <div className="model-list">
            {uncategorized.map((model) => (
              <div key={model.id} className="model-item">
                <label className="model-item-label">
                  <input
                    type="checkbox"
                    checked={model.enabled}
                    onChange={() => onToggleModel(model.id)}
                  />
                  <span className="model-label">{model.label}</span>
                </label>
                <button
                  className="model-remove-btn"
                  onClick={() => onRemoveModel(model.id)}
                  title={`Remove ${model.label}`}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
