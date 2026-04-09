const API_BASE = (() => {
  if (process.env.NODE_ENV === 'production') return '';

  const url = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, '') ?? '';
  return url || 'http://localhost:5137';
})();

export interface Website {
  id: string;
  user_id: string;
  name: string;
  url: string;
  created_at: string;
}

export interface WebsiteIn {
  name: string;
  url: string;
}

export interface InsightItem {
  title: string;
  desc: string;
  tag: string;
}

export interface WebsiteInsights {
  website_id: string;
  website_name: string;
  website_url: string;
  scores: {
    performance: number | null;
    accessibility: number | null;
    best_practices: number | null;
    seo: number | null;
  };
  insights: InsightItem[];
  cached: boolean;
}

export interface ActivityEvent {
  id: string;
  user_id: string;
  type: string;
  title: string;
  description: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface AnalyticsData {
  total_websites: number;
  total_deployments: number;
  top_website: { name: string; url: string } | null;
  sparkline: number[];
}

async function request<T>(method: string, path: string, body?: object): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return undefined as T;

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Request failed');
  return data;
}

export const getWebsites = () => request<Website[]>('GET', '/api/websites');
export const addWebsite = (payload: WebsiteIn) => request<Website>('POST', '/api/websites', payload);
export const updateWebsite = (id: string, payload: WebsiteIn) => request<Website>('PATCH', `/api/websites/${id}`, payload);
export const deleteWebsite = (id: string) => request<void>('DELETE', `/api/websites/${id}`);

export const getInsights = (websiteId: string) => request<WebsiteInsights>('GET', `/api/insights/${websiteId}`);
export const getActivity = (limit = 20) => request<ActivityEvent[]>('GET', `/api/activity?limit=${limit}`);
export const createActivity = (payload: { type: string; title: string; description: string; metadata?: Record<string, unknown> }) =>
  request<{ status: string }>('POST', '/api/activity', payload);
export const getAnalytics = () => request<AnalyticsData>('GET', '/api/analytics');