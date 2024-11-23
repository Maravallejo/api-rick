import {             
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import RickAndMorty from "./componentes/rick-and-morty";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element ={ <RickAndMorty/> } />
      </Routes>
    </Router>
  );
}

export default App;
