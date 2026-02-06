import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductsList from './pages/ProductManagement/ProductsList/ProductsList'
import CreateProduct from './pages/ProductManagement/CreateProduct/CreateProduct'

import AdminLayout from './components/layout/AdminLayout'

function App() {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<ProductsList />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
