import LandingPage from './components/Pages/LandingPage/LandingPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/Pages/AuthPages/LoginPage';
import Home from './components/Pages/HomePage/Home';

const App = () => {
  return (
    < BrowserRouter>
      < Routes >
        < Route path='/' element={<LandingPage/>}/>
        < Route path='/login' element={<LoginPage/>}/>
        < Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App