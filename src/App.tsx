import './App.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import PersonSearchPage from './pages/person';
import PersonCreatePage from './pages/person/create';
import PersonUpdatePage from './pages/person/update';
import PersonDeletePage from './pages/person/delete';
import CategorySearchPage from './pages/category';
import CategoryCreatePage from './pages/category/create';
import TransactionSearchPage from './pages/transaction';
import TransactionCreatePage from './pages/transaction/create';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Bem-Vindo ao Control Finance!</h1>
            <h2>Qual tela deseja ser direcionada?</h2>
            <div className="card">
              <Link to="/person/search">
                <button>Pessoas</button>
              </Link>
              <Link to="/category/search">
                <button>Categorias</button>
              </Link>
              <Link to="/transaction/search">
                <button>Transações</button>
              </Link>
            </div>
          </>
        }
      />
    
      {/* Person Routes */}
      <Route path="/person/create" element={<PersonCreatePage />} />
      <Route path="/person/search" element={<PersonSearchPage />} />
      <Route path="/person/update/:id" element={<PersonUpdatePage />} />
      <Route path="/person/delete/:id" element={<PersonDeletePage />} />

      {/* Category Routes */}
      <Route path="/category/create" element={<CategoryCreatePage />} />
      <Route path="/category/search" element={<CategorySearchPage />} />

      {/* Transaction Routes */}
      <Route path="/transaction/create" element={<TransactionCreatePage />} />
      <Route path="/transaction/search" element={<TransactionSearchPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
