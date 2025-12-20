import LandingPage from './components/Pages/LandingPage/LandingPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/Pages/AuthPages/LoginPage';
import Home from './components/Pages/HomePage/Home';
<<<<<<< HEAD
=======
import MyNetworkPage from './components/Pages/MyNetworkpage/MyNetworkPage';
import JobsPage from './components/Pages/JobsPage/JobsPage';
import MessagePage from './components/Pages/MessagePage/MessagePage';
import NotificationPage from './components/Pages/NotificationPage/NotificationPage';
>>>>>>> dev

const App = () => {
  return (
    < BrowserRouter>
      < Routes >
        < Route path='/' element={<LandingPage/>}/>
        < Route path='/login' element={<LoginPage/>}/>
        < Route path='/home' element={<Home/>}/>
<<<<<<< HEAD
      </Routes>
=======
        < Route path='/network' element={<MyNetworkPage/>}/>
        < Route path='/jobs' element={<JobsPage/>}/>
        < Route path='/messages' element={<MessagePage/>}/>
        < Route path='/notifications' element={<NotificationPage/>}/>
      </Routes>

        {/* <Route path="/mypreferences" element={<MyPreferences />}>
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="language" element={<Language />} />
          <Route path="activity" element={<Activity />} />
          <Route path="job-posting" element={<JobPosting />} />
        </Route> */}
>>>>>>> dev
    </BrowserRouter>
  )
}

export default App