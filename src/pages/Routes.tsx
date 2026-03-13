import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RoutesSection from "@/components/RoutesSection";

const Routes = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <RoutesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Routes;
