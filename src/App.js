import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CategoryList from './components/CategoryList';
import Category from './components/Category';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className='app'>
      <SideBar />

      <div className='main-page'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<CategoryList />} />
          <Route path='/category' element={<Category />} />
          <Route path='/category/:id' element={<Category />} />
        </Routes>
      </div>
    </div >
  );
}

export default App;
