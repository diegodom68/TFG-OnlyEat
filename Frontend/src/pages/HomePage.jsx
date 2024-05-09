import Navbar from "../components/HP/Navbar";
import Brows_1 from "../components/HP/Brows_1";
import Brows_2 from "../components/HP/Brows_2";
import HowTo from "../components/HP/howto";
import FeaturesSection from "../components/HP/SectionHomePage";
import FooterHP from "../components/HP/FooterHP";
import OnlyPass from "../components/HP/OnlyPass";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center bg-[#F7F7F7] w-full">
        <Brows_1 />
        <Brows_2 />
      </div>
      <HowTo />
      <OnlyPass />
      <FeaturesSection />
      <FooterHP />
    </>
  );
}
