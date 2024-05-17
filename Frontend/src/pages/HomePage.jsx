import Navbar from "../components/HP/Navbar";
import Brows_1 from "../components/HP/Brows_1";
import Brows_2 from "../components/HP/Brows_2";
import HowTo from "../components/HP/howto";
import FeaturesSection from "../components/HP/SectionHomePage";
import FooterHP from "../components/HP/FooterHP";
import OnlyPass from "../components/HP/OnlyPass";
import HeroSection from "../components/HP/HeroSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowTo />
      <OnlyPass />
      <FeaturesSection />
      <FooterHP />
    </>
  );
}
