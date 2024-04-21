import './App.css'
import Navbar from './components/HP/Navbar'
import Brows_1 from './components/HP/Brows_1';
import Brows_2 from "./components/HP/Brows_2";
import HowTo from './components/HP/howto';
import FeaturesSection from './components/HP/SectionHomePage';
import FooterHP from './components/HP/FooterHP';
import OnlyPass from './components/HP/OnlyPass';


function App() {
  return (
    <>
      <Navbar  />
      <div className='flex flex-row items-center pt-14 bg-[#F7F7F7]'>
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

export default App
