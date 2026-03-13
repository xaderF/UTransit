import { useQuery } from "@tanstack/react-query";
import { api, type User } from "@/lib/api";

export function useRoutes() {
  return useQuery({
    queryKey: ["routes"],
    queryFn: () => api.getRoutes(),
  });
}

export function useRouteStops(routeId: string | null) {
  return useQuery({
    queryKey: ["routes", routeId, "stops"],
    queryFn: () => api.getRouteStops(routeId!),
    enabled: !!routeId,
  });
}

export function useTripHistory(user: User | null) {
  return useQuery({
    queryKey: ["trips", user?.id],
    queryFn: () => api.getTripHistory(),
    enabled: !!user,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => api.getCurrentUser(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
