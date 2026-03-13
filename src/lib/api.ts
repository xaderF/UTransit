const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...options?.headers,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("access_token");
    window.dispatchEvent(new Event("auth:logout"));
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = typeof err.detail === "string" ? err.detail : Array.isArray(err.detail) ? err.detail[0]?.msg ?? res.statusText : res.statusText;
    throw new Error(msg);
  }
  return res.json();
}

export interface Route {
  id: string;
  name: string;
  campus: string;
  color: string | null;
}

export interface RouteStop {
  route_id: string;
  stop_order: number;
  stop: { id: string; name: string; lat: number; lng: number };
}

export interface Trip {
  id: string;
  user_id: string;
  route_id: string;
  start_stop_id: string;
  end_stop_id: string | null;
  started_at: string;
  ended_at: string | null;
  status: string;
  fare_cents: number | null;
}

export interface User {
  id: string;
  email: string;
  student_id: string | null;
  full_name: string | null;
  created_at: string;
}

export const api = {
  getRoutes: () => fetchApi<Route[]>("/api/v1/routes"),
  getRouteStops: (routeId: string) => fetchApi<RouteStop[]>(`/api/v1/routes/${routeId}/stops`),
  getTripHistory: (limit = 20) => fetchApi<Trip[]>(`/api/v1/trips/history?limit=${limit}`),
  getCurrentUser: () => fetchApi<User>("/api/v1/auth/me"),
};
