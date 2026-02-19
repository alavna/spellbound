import { X } from 'lucide-react';
import type { BenchmarkResult } from '../types';

interface Props {
  result: BenchmarkResult | null;
  onClose: () => void;
}

export function RawResponseViewer({ result, onClose }: Props) {
  if (!result) return null;

  let formatted = result.rawResponse || '';
  try {
    const parsed = JSON.parse(formatted);
    formatted = JSON.stringify(parsed, null, 2);
  } catch {
    // Not JSON, show as-is
  }

  return (
    <div className="raw-viewer-overlay" onClick={onClose}>
      <div className="raw-viewer" onClick={(e) => e.stopPropagation()}>
        <div className="raw-viewer-header">
          <span>
            Raw Response — {result.modelId} / {result.scenarioId}
          </span>
          <button className="icon-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="raw-viewer-meta">
          <span>Issues detected: {result.detectedIssues.length}</span>
          <span>Latency: {Math.round(result.latencyMs)}ms</span>
          <span>F0.5: {(result.f05 * 100).toFixed(1)}%</span>
        </div>

        {result.correctedText && (
          <div className="raw-viewer-section">
            <h4>Corrected Text</h4>
            <pre className="raw-content">{result.correctedText}</pre>
          </div>
        )}

        <div className="raw-viewer-section">
          <h4>Raw API Response</h4>
          <pre className="raw-content">{formatted}</pre>
        </div>

        <div className="raw-viewer-section">
          <h4>Detected Issues ({result.detectedIssues.length})</h4>
          <div className="issues-list">
            {result.detectedIssues.map((issue, idx) => (
              <div key={idx} className="issue-row">
                <span className={`issue-type type-${issue.type}`}>{issue.type}</span>
                <span className="issue-text">
                  "{issue.originalText}" → "{issue.replacement}"
                </span>
                <span className="issue-msg">{issue.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
