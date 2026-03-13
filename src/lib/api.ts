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
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? res.statusText);
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
  getTripHistory: (userId: string, limit = 20) =>
    fetchApi<Trip[]>(`/api/v1/trips/history?user_id=${userId}&limit=${limit}`),
  getCurrentUser: () => fetchApi<User>("/api/v1/auth/me"),
};
