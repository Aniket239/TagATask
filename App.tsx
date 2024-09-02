import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { View } from 'react-native';
const App = () => {
  return (
      <View style={{
        flex: 1,
        backgroundColor: 'white'}}>
        <Navbar />
        <Home />
      </View>
  );
}
export default App;