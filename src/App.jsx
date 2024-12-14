import 'aos/dist/aos.css';
import "./App.css";
import Navigation from "./screens/navigations/Navigation";
import "../src/styles/GlobalStyle.css";
import { useEffect } from 'react';
import Aos from 'aos';
const App = () => {
  console.clear();
  useEffect(() => {
    Aos.init({
      duration: 1000, 
      once: true,
    });
  }, []);
  return <Navigation />;
};

export default App;
