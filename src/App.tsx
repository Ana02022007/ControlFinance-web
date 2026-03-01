import './App.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import PersonSearchPage from './pages/person';
import PersonCreatePage from './pages/person/create';
import PersonUpdatePage from './pages/person/update';
import PersonDeletePage from './pages/person/delete';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Bem-Vindo ao Control Finance!</h1>
            <h2  className={"center"}>Qual tela deseja ser direcionada?</h2>
            <div className="card">
              <Link to="/person/search">
                <button>Pessoas</button>
              </Link>
            </div>
          </>
        }
      />
    
      <Route path="/person/create" element={<PersonCreatePage />} />
      <Route path="/person/search" element={<PersonSearchPage />} />
      <Route path="/person/update/:id" element={<PersonUpdatePage />} />
      <Route path="/person/delete/:id" element={<PersonDeletePage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
