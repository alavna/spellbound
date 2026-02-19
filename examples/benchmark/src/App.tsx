import { useState } from 'react';
import { Play, Gavel, Trash2 } from 'lucide-react';
import { useBenchmark } from './hooks/useBenchmark';
import { useServiceStatus } from './hooks/useServiceStatus';
import { ConfigPanel } from './components/ConfigPanel';
import { ProgressPanel } from './components/ProgressPanel';
import { RankingsPanel } from './components/RankingsPanel';
import { ResultsTable } from './components/ResultsTable';
import { ClassificationResultsPanel } from './components/ClassificationResultsPanel';
import { DownloadProgress } from './components/DownloadProgress';
import { RawResponseViewer } from './components/RawResponseViewer';
import type { BenchmarkResult } from './types';

const LOCAL_SERVICES = [
  { id: 'ollama', label: 'Ollama', defaultUrl: 'http://localhost:11434', healthEndpoint: '/api/tags' },
  { id: 'languagetool', label: 'LanguageTool', defaultUrl: 'http://localhost:8010', healthEndpoint: '/v2/languages' },
  { id: 'gector', label: 'GECToR', defaultUrl: 'http://localhost:8020', healthEndpoint: '/health' },
];

function App() {
  const benchmark = useBenchmark();
  const { statuses: serviceStatuses, setServiceUrl } = useServiceStatus(LOCAL_SERVICES);
  const [rawViewResult, setRawViewResult] = useState<BenchmarkResult | null>(null);

  const isRunning =
    benchmark.progress.phase === 'running' ||
    benchmark.progress.phase === 'judging';

  return (
    <div className="app">
      <header className="app-header">
        <h1>Spellbound Benchmark</h1>
        <p>Compare grammar correction quality across LLM providers, offline engines, and ML models</p>
      </header>

      <div className="app-layout">
        <aside className="app-sidebar">
          <ConfigPanel
            apiKey={benchmark.apiKey}
            onApiKeyChange={benchmark.setApiKey}
            models={benchmark.models}
            onToggleModel={benchmark.toggleModel}
            onAddModel={benchmark.addModel}
            onRemoveModel={benchmark.removeModel}
            selectedDatasets={benchmark.selectedDatasets}
            onSelectedDatasetsChange={benchmark.setSelectedDatasets}
            serviceStatuses={serviceStatuses}
            onServiceUrlChange={setServiceUrl}
          />

          <div className="action-buttons">
            <button
              className="btn btn-primary btn-lg"
              onClick={benchmark.run}
              disabled={isRunning}
            >
              <Play size={16} />
              Run Benchmark
            </button>

            {benchmark.results.length > 0 && benchmark.apiKey && (
              <button
                className="btn btn-secondary"
                onClick={benchmark.runJudge}
                disabled={isRunning}
                title="Use an LLM to evaluate the quality of detected issues"
              >
                <Gavel size={14} />
                Run LLM Judge
              </button>
            )}

            {(benchmark.results.length > 0 || benchmark.classificationResults.length > 0) && (
              <button
                className="btn btn-danger-outline btn-sm"
                onClick={benchmark.clearResults}
                disabled={isRunning}
                title="Clear all cached results and start fresh"
              >
                <Trash2 size={14} />
                Clear Results
              </button>
            )}
          </div>
        </aside>

        <main className="app-main">
          <DownloadProgress downloads={benchmark.downloads} />

          <ProgressPanel
            progress={benchmark.progress}
            onCancel={benchmark.cancel}
          />

          <RankingsPanel rankings={benchmark.rankings} />

          <ResultsTable
            results={benchmark.results}
            onViewRaw={setRawViewResult}
          />

          <ClassificationResultsPanel results={benchmark.classificationResults} />

          {benchmark.results.length === 0 && benchmark.classificationResults.length === 0 && benchmark.progress.phase === 'idle' && (
            <div className="empty-state">
              <h2>Ready to benchmark</h2>
              <p>
                Select models and datasets from the sidebar, then click "Run Benchmark"
                to compare grammar correction quality.
              </p>
              <ul className="feature-list">
                <li>F0.5 scoring (standard GEC metric, weights precision 2x over recall)</li>
                <li>Spellbound, Harper.js, nspell, Hunspell WASM (offline)</li>
                <li>OpenRouter gateway for all cloud LLM providers</li>
                <li>Ollama for local LLMs (Phi-4, Qwen, Gemma, Llama)</li>
                <li>LanguageTool and GECToR via local services</li>
                <li>T5 seq2seq grammar models via Transformers.js</li>
                <li>Classification models: style, tone, bias, clarity</li>
                <li>Upload CoNLL-2014, BEA-2019, or JFLEG datasets</li>
                <li>Optional LLM judge for issue quality evaluation</li>
              </ul>
            </div>
          )}
        </main>
      </div>

      <RawResponseViewer result={rawViewResult} onClose={() => setRawViewResult(null)} />
    </div>
  );
}

export default App;
