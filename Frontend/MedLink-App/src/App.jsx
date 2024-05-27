import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login.jsx'
import Register from './Register.jsx'
import Forgot from './Forgot.jsx';
import PasswordForgot from './PasswordForgot.jsx';
import RedirectWithParams from './RedirectWithParams.jsx';
import Doctors from './Doctors.jsx';
import Polyclinics from './Polyclinics.jsx';
import AdminPanel from './AdminPanel.jsx';
import Header from './components/Header.jsx';
import Appointment from './Appointment.jsx';
import WelcomePage from './welcome-page.jsx';
import Footer from './components/Footer.jsx';
import MainLayout from './components/MainLayout.jsx';

function App() {
  return (
        <Router>
        <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/PasswordForgot" element={<PasswordForgot />} />
          <Route path="/auth/user/reset-password/:userid/:token" element={<RedirectWithParams />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/Polyclinics" element={<Polyclinics />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
          </Route>
        </Routes>
        </Router>
      
  )
}

export default App;