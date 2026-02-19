import { useState } from 'react';
import type { ServiceStatus as ServiceStatusType } from '../hooks/useServiceStatus';

interface Props {
  status: ServiceStatusType;
  label: string;
  onUrlChange: (url: string) => void;
}

export function ServiceStatus({ status, label, onUrlChange }: Props) {
  const [editing, setEditing] = useState(false);
  const [urlInput, setUrlInput] = useState(status.url);

  const handleSave = () => {
    onUrlChange(urlInput);
    setEditing(false);
  };

  return (
    <div className="service-status">
      <div className="service-status-header">
        <span
          className={`status-dot ${status.checking ? 'checking' : status.online ? 'online' : 'offline'}`}
        />
        <span className="service-label">{label}</span>
        <span className="service-state">
          {status.checking ? 'checking...' : status.online ? 'online' : 'offline'}
        </span>
      </div>
      {editing ? (
        <div className="service-url-edit">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="config-input"
            placeholder="http://localhost:..."
          />
          <div className="service-url-actions">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>Save</button>
            <button className="btn btn-sm" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-sm btn-ghost service-url-btn"
          onClick={() => setEditing(true)}
        >
          {status.url}
        </button>
      )}
      {status.models && status.models.length > 0 && (
        <div className="service-models-count">
          {status.models.length} models available
        </div>
      )}
    </div>
  );
}
