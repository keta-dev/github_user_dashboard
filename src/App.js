import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Error from './pages/Error';

function App() {
  return (
    // <AuthWrapper>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    // </AuthWrapper>
  );
}

export default App;
