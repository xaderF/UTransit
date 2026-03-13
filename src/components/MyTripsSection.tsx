import { useCurrentUser, useTripHistory } from "@/hooks/use-api";

const MyTripsSection = () => {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: trips, isLoading: tripsLoading } = useTripHistory(user?.id ?? null);

  if (userLoading || !user) return null;

  return (
    <section className="bg-background py-10">
      <div className="max-w-[1080px] mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">My Trips</h2>
        <p className="text-sm text-muted-foreground mb-4">Signed in as {user.email}</p>

        {tripsLoading ? (
          <p className="text-muted-foreground">Loading trips...</p>
        ) : trips?.length === 0 ? (
          <p className="text-muted-foreground">No trips yet.</p>
        ) : (
          <ul className="space-y-3">
            {trips?.map((trip) => (
              <li
                key={trip.id}
                className="border border-border rounded-sm p-4 bg-card"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">Route {trip.route_id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(trip.started_at).toLocaleString()} · {trip.status}
                    </p>
                  </div>
                  {trip.fare_cents != null && (
                    <span className="text-sm font-medium">${(trip.fare_cents / 100).toFixed(2)}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MyTripsSection;
