
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import LayoutAdmin from './components/pages/LayoutAdmin'
import ProductAdd from './components/products/ProductAdd'
import ProductEdit from './components/products/ProductEdit'
import Products from './components/products/Products'
import Antd from './components/products/TestAntd'

function App() {

  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={<h1 className='d-flex justify-content-center'>Home</h1>}> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="test" element={<Antd />} />
        {/* </Route> */}
        <Route path="/admin" element={<LayoutAdmin />}>
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
