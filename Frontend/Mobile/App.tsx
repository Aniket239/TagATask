import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store'; // Adjust the path as needed
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';

import { View } from 'react-native';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleLogin = (username: string, password: string): boolean => {
    if (username === '' && password === '') {
      setIsLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {isLoggedIn ? <><Navbar /><Home /></> : <Login onLogin={handleLogin} />}
      </View>
    </Provider>

  );
};

export default App;
