import type { ModelDownloadStatus } from '../utils/model-download-manager';

interface Props {
  downloads: Map<string, ModelDownloadStatus>;
}

export function DownloadProgress({ downloads }: Props) {
  const activeDownloads = Array.from(downloads.values()).filter(
    (d) => d.status === 'downloading'
  );

  if (activeDownloads.length === 0) return null;

  return (
    <div className="download-progress-panel">
      <div className="download-progress-header">Downloading Models</div>
      {activeDownloads.map((dl) => (
        <div key={dl.modelId} className="download-item">
          <span className="download-model-name">{dl.modelId}</span>
          <div className="download-bar-container">
            <div
              className="download-bar"
              style={{ width: `${dl.progress}%` }}
            />
          </div>
          <span className="download-pct">{dl.progress}%</span>
        </div>
      ))}
    </div>
  );
}
