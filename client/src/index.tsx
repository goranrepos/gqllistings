import React from 'react';
import ReactDOM from 'react-dom/client';
import { Listings } from './sections';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Listings title="Listings Title"/>
  </React.StrictMode>
);

