import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Animes from './components/Animes/Animes';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import Home from './components/Home/Home';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import NotFound from './components/Layout/NotFound/NotFound';
import AnimePage from './components/AnimePage/AnimePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateAnime from './components/Admin/CreateAnime/CreateAnime';
import AdminAnimes from './components/Admin/AdminAnime/AdminAnimes';
import Users from './components/Admin/Users/Users';

function App() {

  window.addEventListener('contextmenu',e =>{
    e.preventDefault();
  });

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animes" element={<Animes />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />

        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />





        {/* Admin Routes */}

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/createanime" element={<CreateAnime />} />
        <Route path="/admin/animes" element={<AdminAnimes />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
