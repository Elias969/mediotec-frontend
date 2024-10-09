import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from './pages/Login'
import Principal from "./pages/Principal"
import Disciplinas from "./pages/Disciplinas"
import Professores from "./pages/Professores"
import Conceitos from "./pages/Conceitos"
import Turmas from "./pages/Turmas"
import Coordenadores from "./pages/Coordenadores"
import Comunicados from "./pages/Comunicados"
function App() {
  

  return (

    <BrowserRouter>
    <Routes>

<Route path="/" element={<Login />} />
<Route path="/principal" element={<Principal />} />
<Route path="/disciplinas" element={<Disciplinas />} />
<Route path="/professores" element={<Professores />} />
<Route path="/conceitos" element={<Conceitos />} />
<Route path="/turmas" element={<Turmas/>} />
<Route path="/coordenadores" element={<Coordenadores/>} />
<Route path="/comunicados" element={<Comunicados/>} />
    </Routes>
  
    
    </BrowserRouter>


  )
}

export default App

