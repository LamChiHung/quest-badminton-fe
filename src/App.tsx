import { BrowserRouter, Route, Routes } from 'react-router'
import ConfirmRegister from './components/ui/AutoAlert'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import HomePage from './pages/HomePage'
import { PrivateRoute } from './routes/PrivateRoute'
import NavigationMenuLayout from './components/custom/NavigationMenuLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/' element={<NavigationMenuLayout />}>
          <Route element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
