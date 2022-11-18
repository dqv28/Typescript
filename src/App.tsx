
import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from './components/pages/LayoutAdmin'
import ProductAdd from './components/products/ProductAdd'
import ProductEdit from './components/products/ProductEdit'
import Products from './components/products/Products'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<h1>Home Admin Page</h1>} />
          <Route path='products' element={<Products />} />
          <Route path='product-add' element={<ProductAdd />} />
          <Route path='product/:id/edit' element={<ProductEdit />} />
        </Route>
        <Route path="*" element={<h1 className='d-flex justify-content-center'>404 | Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
