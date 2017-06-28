import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import BooksApp from './components/BooksApp'
import './css/index.css'

ReactDOM.render(
  <BrowserRouter basename="/my-reads">
    <BooksApp />
  </BrowserRouter>,
  document.getElementById('root')
);
