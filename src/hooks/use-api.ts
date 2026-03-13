import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

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

export function useTripHistory(userId: string | null) {
  return useQuery({
    queryKey: ["trips", userId],
    queryFn: () => api.getTripHistory(userId!),
    enabled: !!userId,
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
