import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <div >
      <Navbar />
      <main className="p-4  mt-4" >
        <h1 className="text-2xl font-bold">Bienvenido a Mi Proyecto</h1>
        <p>Esta es la página principal de la aplicación.</p>
      </main>
    </div>
  );
}

export default App
