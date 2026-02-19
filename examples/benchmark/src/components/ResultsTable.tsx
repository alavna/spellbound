import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';
import type { BenchmarkResult } from '../types';

interface Props {
  results: BenchmarkResult[];
  onViewRaw: (result: BenchmarkResult) => void;
}

function formatPct(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function formatMs(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function getScoreClass(f05: number): string {
  if (f05 >= 0.8) return 'score-excellent';
  if (f05 >= 0.6) return 'score-good';
  if (f05 >= 0.4) return 'score-fair';
  return 'score-poor';
}

export function ResultsTable({ results, onViewRaw }: Props) {
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'f05' | 'precision' | 'recall' | 'latency'>('f05');

  // Group by model
  const grouped = useMemo(() => {
    const map = new Map<string, BenchmarkResult[]>();
    for (const result of results) {
      const list = map.get(result.modelId) || [];
      list.push(result);
      map.set(result.modelId, list);
    }
    return map;
  }, [results]);

  if (results.length === 0) return null;

  return (
    <div className="results-table-panel">
      <div className="panel-header">
        <FileText size={16} />
        <span>Per-Scenario Results</span>
        <div className="sort-controls">
          <span className="sort-label">Sort by:</span>
          {(['f05', 'precision', 'recall', 'latency'] as const).map((key) => (
            <button
              key={key}
              className={`sort-btn ${sortBy === key ? 'active' : ''}`}
              onClick={() => setSortBy(key)}
            >
              {key === 'f05' ? 'F0.5' : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="results-accordion">
        {Array.from(grouped.entries()).map(([modelId, modelResults]) => {
          const isExpanded = expandedModel === modelId;
          const sorted = [...modelResults].sort((a, b) => {
            switch (sortBy) {
              case 'f05':
                return b.f05 - a.f05;
              case 'precision':
                return b.precision - a.precision;
              case 'recall':
                return b.recall - a.recall;
              case 'latency':
                return a.latencyMs - b.latencyMs;
            }
          });

          const avgF05 =
            modelResults.reduce((s, r) => s + r.f05, 0) / modelResults.length;

          return (
            <div key={modelId} className="result-group">
              <button
                className="result-group-header"
                onClick={() => setExpandedModel(isExpanded ? null : modelId)}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="result-model-name">{modelId}</span>
                <span className={`result-model-score ${getScoreClass(avgF05)}`}>
                  F0.5: {formatPct(avgF05)}
                </span>
                <span className="result-count">{modelResults.length} scenarios</span>
              </button>

              {isExpanded && (
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Scenario</th>
                      <th>Detected</th>
                      <th>Expected</th>
                      <th>TP</th>
                      <th>FP</th>
                      <th>FN</th>
                      <th>Precision</th>
                      <th>Recall</th>
                      <th>F0.5</th>
                      <th>Latency</th>
                      <th>GLEU</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((result) => (
                      <tr key={result.scenarioId}>
                        <td className="scenario-cell">{result.scenarioId}</td>
                        <td>{result.detectedIssues.length}</td>
                        <td>{result.expectedIssues.length}</td>
                        <td className="tp">{result.truePositives}</td>
                        <td className="fp">{result.falsePositives}</td>
                        <td className="fn">{result.falseNegatives}</td>
                        <td>{formatPct(result.precision)}</td>
                        <td>{formatPct(result.recall)}</td>
                        <td className={getScoreClass(result.f05)}>
                          {formatPct(result.f05)}
                        </td>
                        <td>{formatMs(result.latencyMs)}</td>
                        <td>{result.gleu != null ? result.gleu.toFixed(3) : '—'}</td>
                        <td>
                          {result.rawResponse && (
                            <button
                              className="btn btn-sm btn-ghost"
                              onClick={() => onViewRaw(result)}
                              title="View raw response"
                            >
                              Raw
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
