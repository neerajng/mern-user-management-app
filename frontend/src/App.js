import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/User/Dashboard';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import Profile from './pages/User/Profile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import PageNotFound from './pages/404Page';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <div className='container' style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path='/signup' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Dashboard />} />
            <Route path="/user" element={<Profile />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
      <Footer/>
      <ToastContainer />
    </>
  );
}

export default App;
