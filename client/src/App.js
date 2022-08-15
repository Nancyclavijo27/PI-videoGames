import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom" //para cetiar las rutas
import LandingPage from "./components/LandingPage"
import Home from './components/Home'
//import CreationGame from "./components/CreationGame"
//import Detail from "./components/Detail"

//ruta para renderizar la Landing,  el home, DogCreation y Detail

 function App() {
  return (
    // rodea el div
    
    <div className="App">
      <BrowserRouter>
      <Switch>
         <Route  exact path = "/home" component= {Home}/>
         <Route exact path = "/" component= {LandingPage}/>
      </Switch>
      </BrowserRouter>
    
    </div>
   
  );
}

export default App;






