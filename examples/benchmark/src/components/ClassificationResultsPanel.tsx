import { useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import type { ClassificationBenchmarkResult, ClassificationDimension } from '../types';
import {
  calculateDimensionAccuracy,
  calculateOverallAccuracy,
} from '../runner/classification-evaluator';

interface Props {
  results: ClassificationBenchmarkResult[];
}

function formatPct(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

const DIMENSION_COLORS: Record<ClassificationDimension, string> = {
  style: '#667eea',
  clarity: '#48bb78',
  tone: '#ed8936',
  cliche: '#e53e3e',
  bias: '#9f7aea',
};

export function ClassificationResultsPanel({ results }: Props) {
  if (results.length === 0) return null;

  const overallAccuracy = useMemo(() => calculateOverallAccuracy(results), [results]);
  const dimensionAccuracy = useMemo(() => calculateDimensionAccuracy(results), [results]);

  // Group results by model
  const modelGroups = useMemo(() => {
    const map = new Map<string, ClassificationBenchmarkResult[]>();
    for (const r of results) {
      const list = map.get(r.modelId) || [];
      list.push(r);
      map.set(r.modelId, list);
    }
    return map;
  }, [results]);

  return (
    <div className="classification-results-panel">
      <div className="panel-header">
        <BarChart3 size={16} />
        <span>Classification Results</span>
        <span className="classification-overall">
          Overall Accuracy: {formatPct(overallAccuracy)}
        </span>
      </div>

      {/* Per-dimension accuracy bars */}
      <div className="dimension-accuracy-grid">
        {(Object.entries(dimensionAccuracy) as [ClassificationDimension, { correct: number; total: number; accuracy: number }][]).map(
          ([dim, stats]) => (
            <div key={dim} className="dimension-accuracy-item">
              <div className="dimension-label">{dim}</div>
              <div className="dimension-bar-container">
                <div
                  className="dimension-bar"
                  style={{
                    width: `${stats.accuracy * 100}%`,
                    backgroundColor: DIMENSION_COLORS[dim],
                  }}
                />
              </div>
              <div className="dimension-stats">
                {formatPct(stats.accuracy)} ({stats.correct}/{stats.total})
              </div>
            </div>
          )
        )}
      </div>

      {/* Per-model breakdown */}
      <div className="classification-model-results">
        {Array.from(modelGroups.entries()).map(([modelId, modelResults]) => {
          const correct = modelResults.filter((r) => r.correct).length;
          const total = modelResults.length;
          const accuracy = total > 0 ? correct / total : 0;

          return (
            <div key={modelId} className="classification-model-group">
              <div className="classification-model-header">
                <span className="classification-model-name">{modelId}</span>
                <span className={`classification-model-accuracy ${accuracy >= 0.7 ? 'good' : accuracy >= 0.4 ? 'fair' : 'poor'}`}>
                  {formatPct(accuracy)}
                </span>
              </div>
              <table className="classification-table">
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Dimension</th>
                    <th>Expected</th>
                    <th>Predicted</th>
                    <th>Confidence</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {modelResults.map((r, i) => (
                    <tr key={i} className={r.correct ? 'cls-correct' : 'cls-incorrect'}>
                      <td>{r.scenarioId}</td>
                      <td>
                        <span
                          className="dimension-badge"
                          style={{ backgroundColor: DIMENSION_COLORS[r.dimension] }}
                        >
                          {r.dimension}
                        </span>
                      </td>
                      <td>{r.expectedLabel}</td>
                      <td>{r.predictedLabel}</td>
                      <td>{formatPct(r.confidence)}</td>
                      <td>{r.correct ? '\u2713' : '\u2717'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
