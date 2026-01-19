import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import { PrivateRoute } from './routes/PrivateRoute'
import { HostRoute } from './routes/HostRoute'
import TourManagement from './pages/hosts/TourManagement'
import HostLayout from './pages/layout/HostLayout'
import TourPage from './pages/players/TourPage'
import PlayerLayout from './pages/layout/PlayerLayout'
import TourDetailHost from './pages/hosts/TourDetailHost'
import TourDetailPage from './pages/players/TourDetailPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>


        <Route element={<PrivateRoute />}>
          <Route element={<PlayerLayout />}>
            <Route path='/' element={<TourPage />}></Route>
            <Route path='/tours/:tourCode' element={<TourDetailPage />}></Route>
          </Route>
        </Route>
        <Route element={<HostRoute />}>
          <Route path='/host/tour-management' element={<HostLayout><TourManagement /></HostLayout>}></Route>
          <Route path='/host/tour-management/:tourId' element={<HostLayout><TourDetailHost /></HostLayout>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
