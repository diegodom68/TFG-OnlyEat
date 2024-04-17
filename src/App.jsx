import './App.css'
import Navbar from './components/Navbar'
import Brows_1 from './components/Brows_1';

function App() {
  return (
    <div >
      <Navbar />
        <Brows_1 />
        <h1 className="text-2xl font-bold">Bienvenido a Mi Proyecto</h1>
        <p>Esta es la página principal de la aplicación.</p>
    </div>
  );
}

export default App
