import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import Certificates from './components/Certificates';
import { Softskills } from './components/Softskills';
import { LanguageProvider } from './i18n/LanguageContext';

const THEME_STORAGE_KEY = 'portfolio-theme';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <LanguageProvider>
      <div className="App">
        <NavBar theme={theme} toggleTheme={toggleTheme} />
        <Banner />
        <Skills />
        <Softskills />
        <Projects />
        {/* <Contact /> */}
        <Certificates />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
