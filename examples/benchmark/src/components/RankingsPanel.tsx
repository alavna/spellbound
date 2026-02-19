import { Trophy, Clock, Target, Eye } from 'lucide-react';
import type { ModelRanking } from '../types';

interface Props {
  rankings: ModelRanking[];
}

function getGradient(rank: number, total: number): string {
  if (total <= 1) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  const hue = 120 - (rank / (total - 1)) * 120; // Green → Red
  return `linear-gradient(135deg, hsl(${hue}, 70%, 55%) 0%, hsl(${hue + 20}, 60%, 45%) 100%)`;
}

function formatMs(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatPct(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function RankingsPanel({ rankings }: Props) {
  if (rankings.length === 0) return null;

  return (
    <div className="rankings-panel">
      <div className="panel-header">
        <Trophy size={16} />
        <span>Model Rankings</span>
      </div>

      <div className="rankings-grid">
        {rankings.map((ranking, idx) => (
          <div
            key={ranking.modelId}
            className="ranking-card"
            style={{ background: getGradient(idx, rankings.length) }}
          >
            <div className="ranking-rank">#{idx + 1}</div>
            <div className="ranking-model">{ranking.modelLabel}</div>

            <div className="ranking-metrics">
              <div className="ranking-metric">
                <Target size={14} />
                <span className="metric-label">F0.5</span>
                <span className="metric-value">{formatPct(ranking.avgF05)}</span>
              </div>

              <div className="ranking-metric">
                <Eye size={14} />
                <span className="metric-label">Precision</span>
                <span className="metric-value">{formatPct(ranking.avgPrecision)}</span>
              </div>

              <div className="ranking-metric">
                <Eye size={14} />
                <span className="metric-label">Recall</span>
                <span className="metric-value">{formatPct(ranking.avgRecall)}</span>
              </div>

              <div className="ranking-metric">
                <Clock size={14} />
                <span className="metric-label">Latency</span>
                <span className="metric-value">{formatMs(ranking.avgLatencyMs)}</span>
              </div>
            </div>

            <div className="ranking-counts">
              <span className="tp">TP: {ranking.totalTruePositives}</span>
              <span className="fp">FP: {ranking.totalFalsePositives}</span>
              <span className="fn">FN: {ranking.totalFalseNegatives}</span>
              <span className="scenarios">{ranking.totalScenarios} scenarios</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
