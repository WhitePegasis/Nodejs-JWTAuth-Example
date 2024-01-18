import React from 'react';
import LoginForm from './component/LoginForm';
import SignupForm from './component/SignupForm';
import ProtectedData from './component/ProtectedData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div style={styles.appContainer}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/protected" element={<ProtectedData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

export default App;

