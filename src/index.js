import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToDoList } from './components/ToDoList/ToDoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Header />

    <ToDoList />
    <Footer />
  </React.StrictMode>,
);
