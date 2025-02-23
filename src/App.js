// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './elements/Home';
// import Edit from './elements/Edit';
// import Create from './elements/Create';
// import Show from './elements/Show';
// import LoginForm from './elements/LoginForm';
// import RegisterForm from './elements/RegisterForm';


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//       <Route path='/login' element={<LoginForm />} />
//         <Route path='/' element={<Home />} />
        
        
//         <Route path='create' element={<Create />} />
//         <Route path='edit/:projects_name' element={<Edit />} />
//         <Route path='show/:projects_name' element={<Show />} />
        
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './elements/Home';
import Edit from './elements/Edit';
import Create from './elements/Create';
import Show from './elements/Show';
import LoginForm from './elements/LoginForm';
import RegisterForm  from './elements/RegisterForm';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:projects_name" element={<Edit />} />
          <Route path="/show/:projects_name" element={<Show />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
