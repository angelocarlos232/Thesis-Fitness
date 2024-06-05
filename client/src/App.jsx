import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Authentication from './components/pages/Authentication/Authentication';
import Menu from './components/menu/Menu';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Start from './components/pages/Start/Start';
import Workouts from './components/pages/Workouts/Workouts';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Login from './components/pages/Authentication/Login';
import Register from './components/pages/Authentication/Register';
import PrivateRoute from './components/Private/PrivateRoute';
import PrivateRoute2 from './components/Private/PrivateRoute2';

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="main-menu fixed w-1/4 h-screen">
        <Menu />
      </div>
      <div className="main-content flex-1 h-screen">
        {children}
      </div>
    </div>
  );
};

axios.defaults.baseURL = 'http://localhost:5173';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Toaster position='bottom-right' toastOptions={{ duration: 3500 }} />

      <Routes>
        {/* Routes for unauthenticated users */}
        <Route element={<PrivateRoute2 />}>
          <Route path="/" element={<MainLayout><Start /></MainLayout>} />
          <Route path="/authentication" element={<MainLayout><Authentication /></MainLayout>} />
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
        </Route>
        {/* Routes for authenticated users */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/:userId" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/workouts/:userId" element={<MainLayout><Workouts /></MainLayout>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;