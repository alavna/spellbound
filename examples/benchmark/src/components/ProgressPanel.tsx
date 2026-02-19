import { Loader2, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import type { RunProgress } from '../types';

interface Props {
  progress: RunProgress;
  onCancel: () => void;
}

export function ProgressPanel({ progress, onCancel }: Props) {
  if (progress.phase === 'idle') return null;

  const pct =
    progress.totalPairs > 0
      ? Math.round((progress.completedPairs / progress.totalPairs) * 100)
      : 0;

  return (
    <div className="progress-panel">
      <div className="progress-header">
        {progress.phase === 'running' && (
          <>
            <Loader2 size={16} className="spin" />
            <span>Running benchmark...</span>
            <button className="btn btn-sm btn-danger" onClick={onCancel}>
              Cancel
            </button>
          </>
        )}
        {progress.phase === 'judging' && (
          <>
            <Loader2 size={16} className="spin" />
            <span>Running LLM judge...</span>
          </>
        )}
        {progress.phase === 'done' && (
          <>
            <CheckCircle2 size={16} className="text-success" />
            <span>Complete</span>
          </>
        )}
        {progress.phase === 'error' && (
          <>
            <AlertCircle size={16} className="text-error" />
            <span>Error</span>
          </>
        )}
      </div>

      {(progress.phase === 'running' || progress.phase === 'judging') && (
        <>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${pct}%` }} />
          </div>
          <div className="progress-details">
            <span>
              {progress.completedPairs} / {progress.totalPairs} pairs ({pct}%)
            </span>
            {progress.currentModel && (
              <span className="progress-current">
                {progress.currentModel} — {progress.currentScenario}
              </span>
            )}
          </div>
        </>
      )}

      {progress.phase === 'error' && progress.error && (
        <div className="progress-error">
          <XCircle size={14} />
          <span>{progress.error}</span>
        </div>
      )}
    </div>
  );
}
