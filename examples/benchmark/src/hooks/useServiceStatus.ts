import { useState, useEffect, useCallback, useRef } from 'react';

export interface ServiceConfig {
  id: string;
  label: string;
  defaultUrl: string;
  healthEndpoint: string;
}

export interface ServiceStatus {
  id: string;
  url: string;
  online: boolean;
  checking: boolean;
  models?: string[];
}

const POLL_INTERVAL = 60_000; // 60 seconds (reduced frequency to cut console noise)

/** Shared hook for auto-detecting local services (Ollama, LanguageTool, GECToR sidecar).
 * Pings default ports on mount, polls every 60s, stores custom URLs in localStorage. */
export function useServiceStatus(services: ServiceConfig[]) {
  const [statuses, setStatuses] = useState<Map<string, ServiceStatus>>(() => {
    const map = new Map<string, ServiceStatus>();
    for (const svc of services) {
      const storedUrl = localStorage.getItem(`service-url-${svc.id}`);
      map.set(svc.id, {
        id: svc.id,
        url: storedUrl || svc.defaultUrl,
        online: false,
        checking: true,
      });
    }
    return map;
  });

  const servicesRef = useRef(services);
  servicesRef.current = services;

  const checkService = useCallback(async (svc: ServiceConfig, url: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      const resp = await fetch(`${url}${svc.healthEndpoint}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!resp.ok) return { online: false, models: undefined };

      // For Ollama, extract model list
      if (svc.id === 'ollama') {
        const data = await resp.json();
        const models = (data.models || []).map((m: { name: string }) => m.name);
        return { online: true, models };
      }
      return { online: true, models: undefined };
    } catch {
      return { online: false, models: undefined };
    }
  }, []);

  const checkAll = useCallback(async () => {
    const svcs = servicesRef.current;
    for (const svc of svcs) {
      setStatuses((prev) => {
        const current = prev.get(svc.id);
        const url = current?.url || svc.defaultUrl;
        const next = new Map(prev);
        next.set(svc.id, { ...next.get(svc.id)!, checking: true, url });
        return next;
      });
    }

    // Check all services in parallel
    const results = await Promise.all(
      svcs.map(async (svc) => {
        const url = localStorage.getItem(`service-url-${svc.id}`) || svc.defaultUrl;
        const result = await checkService(svc, url);
        return { svc, url, result };
      })
    );

    setStatuses((prev) => {
      const next = new Map(prev);
      for (const { svc, url, result } of results) {
        next.set(svc.id, {
          id: svc.id,
          url,
          online: result.online,
          checking: false,
          models: result.models,
        });
      }
      return next;
    });
  }, [checkService]);

  // Initial check on mount + poll
  useEffect(() => {
    checkAll();
    const interval = setInterval(checkAll, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [checkAll]);

  const setServiceUrl = useCallback((serviceId: string, url: string) => {
    localStorage.setItem(`service-url-${serviceId}`, url);
    setStatuses((prev) => {
      const next = new Map(prev);
      const existing = next.get(serviceId);
      if (existing) {
        next.set(serviceId, { ...existing, url, checking: true });
      }
      return next;
    });
    // Re-check after URL change
    const svc = servicesRef.current.find((s) => s.id === serviceId);
    if (svc) {
      checkService(svc, url).then((result) => {
        setStatuses((prev) => {
          const next = new Map(prev);
          next.set(serviceId, {
            id: serviceId,
            url,
            online: result.online,
            checking: false,
            models: result.models,
          });
          return next;
        });
      });
    }
  }, [checkService]);

  return { statuses, setServiceUrl, refresh: checkAll };
}
