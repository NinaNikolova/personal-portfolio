import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import Certificates from './components/Certificates';
import { Softskills } from './components/Softskills';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills />
      <Softskills />
      <Projects />
      {/* <Contact /> */}
      <Certificates />
      <Footer />
    </div>
  );
}

export default App;
