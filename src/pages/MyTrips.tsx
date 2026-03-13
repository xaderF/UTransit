import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MyTripsSection from "@/components/MyTripsSection";

const MyTrips = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <MyTripsSection />
      </main>
      <Footer />
    </div>
  );
};

export default MyTrips;
