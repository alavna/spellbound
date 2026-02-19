import { useState, useCallback } from 'react';

export interface ModelDownloadStatus {
  modelId: string;
  status: 'idle' | 'downloading' | 'ready' | 'error';
  progress: number; // 0-100
  error?: string;
}

/** Hook to track HuggingFace model download progress */
export function useModelDownloads() {
  const [downloads, setDownloads] = useState<Map<string, ModelDownloadStatus>>(new Map());

  const updateStatus = useCallback((modelId: string, update: Partial<ModelDownloadStatus>) => {
    setDownloads((prev) => {
      const next = new Map(prev);
      const current = next.get(modelId) || { modelId, status: 'idle' as const, progress: 0 };
      next.set(modelId, { ...current, ...update });
      return next;
    });
  }, []);

  const markDownloading = useCallback((modelId: string, progress: number) => {
    updateStatus(modelId, { status: 'downloading', progress });
  }, [updateStatus]);

  const markReady = useCallback((modelId: string) => {
    updateStatus(modelId, { status: 'ready', progress: 100 });
  }, [updateStatus]);

  const markError = useCallback((modelId: string, error: string) => {
    updateStatus(modelId, { status: 'error', error });
  }, [updateStatus]);

  return { downloads, markDownloading, markReady, markError };
}

/**
 * Create a progress callback for @huggingface/transformers pipeline().
 * The library calls this during model download with progress info.
 */
export function createProgressCallback(
  modelId: string,
  onProgress: (modelId: string, progress: number) => void
): (data: { status: string; progress?: number; file?: string }) => void {
  return (data) => {
    if (data.status === 'progress' && data.progress != null) {
      onProgress(modelId, Math.round(data.progress));
    }
  };
}
