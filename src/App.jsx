import React from 'react';
import './App.css';

import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import PageTitle from './components/PageTitle/PageTitle';
import Filters from './components/Filters/Filters';
import Products from './components/Products/Products';


function App() {
  return (
    <div className="App">
      <Breadcrumbs
        path={['Главная', 'Системы хранения']}
        current="Комплекты стеллажных систем"
      />
      <PageTitle title="Комплекты стеллажных систем" />
      <Products/>
    </div>
  );
}

export default App;