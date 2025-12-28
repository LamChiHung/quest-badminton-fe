import { BrowserRouter, Route, Routes } from 'react-router'
import ConfirmRegister from './components/ui/AutoAlert'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
