import { Route, Routes, BrowserRouter } from "react-router-dom";
import TelaPrincipal from "./Componentes/Telas/TelaPrincipal";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/BCCLP2Prova1B" element={<TelaPrincipal />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
