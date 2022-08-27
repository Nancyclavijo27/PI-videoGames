import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux" //lo traigo del react redux
import { store } from "./store";//lo traigo del store

ReactDOM.render(//siempre se debe rodear la aplicacion o archivo raiz en provider
<Provider store={store}>
    
      <React.StrictMode>
        <App />
      </React.StrictMode>
    
  </Provider>,

  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//Si quieres empezar a medir el rendimiento en tu aplicación, pasa una función
//para registrar los resultados (por ejemplo: reportWebVitals(console.log))
//o enviar a un punto de enlace de análisis. Más información: https://bit.ly/CRA-vitals

reportWebVitals();