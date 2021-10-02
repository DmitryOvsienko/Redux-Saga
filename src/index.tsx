import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import {Provider} from 'react-redux' //библиотека для связки реакта с редаксом
// import {compose, createStore, applyMiddleware} from 'redux'
// import createSagaMiddleware from 'redux-saga'

// const saga = createSagaMiddleware()

// const store = createStore(rootReducer, compose(
//   applyMiddleware(
//      saga // добавляем сагу в миддлвеер
//   ),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )) // создаем стор редакса это хранилище

ReactDOM.render(
  // <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  // </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
