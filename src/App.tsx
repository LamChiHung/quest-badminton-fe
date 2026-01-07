import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import HomePage from './pages/HomePage'
import { PrivateRoute } from './routes/PrivateRoute'
import { HostRoute } from './routes/HostRoute'
import TourManagement from './pages/hosts/TourManagement'
import HostLayout from './pages/layout/HostLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>


        <Route element={<PrivateRoute />}>
          <Route path='/' element={<HomePage />}></Route>
        </Route>
        <Route element={<HostRoute />}>
            <Route path='/host/tour-management' element={<HostLayout><TourManagement /></HostLayout>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
