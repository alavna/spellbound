import { useState, useRef, useCallback } from 'react';
import { Settings, Plus, Upload, X, Key } from 'lucide-react';
import type { ModelConfig, DatasetInfo } from '../types';
import { getDatasetInfos, loadM2Dataset, loadJFLEGDataset } from '../datasets';
import { ModelCategoryPanel } from './ModelCategoryPanel';
import { ServiceStatus } from './ServiceStatus';
import type { ServiceStatus as ServiceStatusType } from '../hooks/useServiceStatus';

interface Props {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  models: ModelConfig[];
  onToggleModel: (id: string) => void;
  onAddModel: (model: ModelConfig) => void;
  onRemoveModel: (id: string) => void;
  selectedDatasets: string[];
  onSelectedDatasetsChange: (ids: string[]) => void;
  serviceStatuses?: Map<string, ServiceStatusType>;
  onServiceUrlChange?: (serviceId: string, url: string) => void;
}

export function ConfigPanel({
  apiKey,
  onApiKeyChange,
  models,
  onToggleModel,
  onAddModel,
  onRemoveModel,
  selectedDatasets,
  onSelectedDatasetsChange,
  serviceStatuses,
  onServiceUrlChange,
}: Props) {
  const [newModelId, setNewModelId] = useState('');
  const [datasets, setDatasets] = useState<DatasetInfo[]>(getDatasetInfos);
  const [uploadStatus, setUploadStatus] = useState('');
  const m2FileRef = useRef<HTMLInputElement>(null);
  const jflegSrcRef = useRef<HTMLInputElement>(null);
  const jflegRefRef = useRef<HTMLInputElement>(null);

  const handleAddModel = useCallback(() => {
    const id = newModelId.trim();
    if (!id) return;
    // Prevent duplicates
    if (models.some((m) => m.id === id)) {
      setNewModelId('');
      return;
    }
    onAddModel({
      id,
      label: id,
      type: 'openrouter',
      model: id,
      enabled: true,
      category: 'cloud-llm',
    });
    setNewModelId('');
  }, [newModelId, models, onAddModel]);

  const handleM2Upload = useCallback(
    async (source: 'conll2014' | 'bea2019') => {
      const file = m2FileRef.current?.files?.[0];
      if (!file) return;

      setUploadStatus(`Loading ${source.toUpperCase()}...`);
      try {
        const scenarios = await loadM2Dataset(file, source);
        setUploadStatus(`Loaded ${scenarios.length} scenarios from ${source.toUpperCase()}`);
        setDatasets(getDatasetInfos());
        onSelectedDatasetsChange([...selectedDatasets, source]);
      } catch (err) {
        setUploadStatus(`Error: ${err}`);
      }
    },
    [selectedDatasets, onSelectedDatasetsChange]
  );

  const handleJFLEGUpload = useCallback(async () => {
    const srcFile = jflegSrcRef.current?.files?.[0];
    const refFiles = jflegRefRef.current?.files;
    if (!srcFile || !refFiles || refFiles.length === 0) {
      setUploadStatus('Please select both .src and .ref files');
      return;
    }

    setUploadStatus('Loading JFLEG...');
    try {
      const scenarios = await loadJFLEGDataset(srcFile, Array.from(refFiles));
      setUploadStatus(`Loaded ${scenarios.length} JFLEG scenarios`);
      setDatasets(getDatasetInfos());
      onSelectedDatasetsChange([...selectedDatasets, 'jfleg']);
    } catch (err) {
      setUploadStatus(`Error: ${err}`);
    }
  }, [selectedDatasets, onSelectedDatasetsChange]);

  const toggleDataset = useCallback(
    (id: string) => {
      if (selectedDatasets.includes(id)) {
        onSelectedDatasetsChange(selectedDatasets.filter((d) => d !== id));
      } else {
        onSelectedDatasetsChange([...selectedDatasets, id]);
      }
    },
    [selectedDatasets, onSelectedDatasetsChange]
  );

  const ollamaStatus = serviceStatuses?.get('ollama');
  const ltStatus = serviceStatuses?.get('languagetool');
  const gectorStatus = serviceStatuses?.get('gector');

  return (
    <div className="config-panel">
      <div className="panel-header">
        <Settings size={16} />
        <span>Configuration</span>
      </div>

      {/* API Key */}
      <div className="config-section">
        <label className="config-label">
          <Key size={14} />
          OpenRouter API Key
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="sk-or-..."
          className="config-input"
        />
        <p className="config-hint">
          Get a key at{' '}
          <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer">
            openrouter.ai/keys
          </a>
        </p>
      </div>

      {/* Models — grouped by category */}
      <div className="config-section">
        <label className="config-label">Models</label>

        <div className="add-model-inline">
          <input
            type="text"
            value={newModelId}
            onChange={(e) => setNewModelId(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddModel(); }}
            placeholder="anthropic/claude-sonnet-4.6"
            className="config-input"
          />
          <button className="btn btn-sm btn-primary" onClick={handleAddModel} disabled={!newModelId.trim()}>
            <Plus size={12} />
            Add
          </button>
        </div>

        <ModelCategoryPanel models={models} onToggleModel={onToggleModel} onRemoveModel={onRemoveModel} />
      </div>

      {/* Local Services Status */}
      {serviceStatuses && onServiceUrlChange && (
        <div className="config-section">
          <label className="config-label">Local Services</label>
          {ollamaStatus && (
            <ServiceStatus
              status={ollamaStatus}
              label="Ollama"
              onUrlChange={(url) => onServiceUrlChange('ollama', url)}
            />
          )}
          {ltStatus && (
            <ServiceStatus
              status={ltStatus}
              label="LanguageTool"
              onUrlChange={(url) => onServiceUrlChange('languagetool', url)}
            />
          )}
          {gectorStatus && (
            <ServiceStatus
              status={gectorStatus}
              label="GECToR Sidecar"
              onUrlChange={(url) => onServiceUrlChange('gector', url)}
            />
          )}
        </div>
      )}

      {/* Datasets */}
      <div className="config-section">
        <label className="config-label">Datasets</label>
        <div className="dataset-list">
          {datasets.map((ds) => (
            <label key={ds.id} className="dataset-item">
              <input
                type="checkbox"
                checked={selectedDatasets.includes(ds.id)}
                onChange={() => toggleDataset(ds.id)}
              />
              <div>
                <span className="dataset-name">{ds.name}</span>
                <span className="dataset-count">{ds.scenarioCount} scenarios</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Dataset Upload */}
      <div className="config-section">
        <label className="config-label">
          <Upload size={14} />
          Upload Research Dataset
        </label>

        <div className="upload-group">
          <p className="config-hint">CoNLL-2014 / BEA-2019 (.m2 file)</p>
          <input type="file" ref={m2FileRef} accept=".m2,.txt" className="file-input" />
          <div className="upload-actions">
            <button className="btn btn-sm" onClick={() => handleM2Upload('conll2014')}>
              Load as CoNLL-2014
            </button>
            <button className="btn btn-sm" onClick={() => handleM2Upload('bea2019')}>
              Load as BEA-2019
            </button>
          </div>
        </div>

        <div className="upload-group">
          <p className="config-hint">JFLEG (.src + .ref files)</p>
          <label className="config-hint">Source file (.src)</label>
          <input type="file" ref={jflegSrcRef} accept=".src,.txt" className="file-input" />
          <label className="config-hint">Reference files (.ref0-.ref3)</label>
          <input type="file" ref={jflegRefRef} accept=".ref,.ref0,.ref1,.ref2,.ref3,.txt" multiple className="file-input" />
          <button className="btn btn-sm" onClick={handleJFLEGUpload}>
            Load JFLEG
          </button>
        </div>

        {uploadStatus && (
          <div className="upload-status">
            {uploadStatus}
            <button className="icon-btn" onClick={() => setUploadStatus('')}>
              <X size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
