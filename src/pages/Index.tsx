import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import RegisterSection from "@/components/RegisterSection";
import UTransitBasics from "@/components/UTransitBasics";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <RegisterSection />
        <UTransitBasics />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
