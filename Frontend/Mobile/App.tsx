import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';

import { View } from 'react-native';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleLogin = (username: string, password: string): boolean => {
    if (username === '1234' && password === '1234') {
      setIsLoggedIn(true); 
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {isLoggedIn ? <><Navbar /><Home /></> : <Login onLogin={handleLogin} />}
    </View>
  );
};

export default App;
