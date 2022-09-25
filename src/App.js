import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SideBar from './components/SideBar/SideBar';
import CategoryList from './components/CategoryList';
import Category from './components/Category';
import DepartmentList from './components/DepartmentList';
import Department from './components/Department';
import Event from './components/Event';
import EventList from './components/EventList';
import Employee from './components/Employee';
import EmployeeList from './components/EmployeeList';
import Currency from './components/Currency';
import CurrencyList from './components/CurrencyList';

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
          <Route path='/departments' element={<DepartmentList />} />
          <Route path='/department' element={<Department />} />
          <Route path='/department/:id' element={<Department />} />
          <Route path='/events' element={<EventList />} />
          <Route path='/event' element={<Event />} />
          <Route path='/event/:id' element={<Event />} />
          <Route path='/employees' element={<EmployeeList />} />
          <Route path='/employee' element={<Employee />} />
          <Route path='/employee/:id' element={<Employee />} />
          <Route path='/currencies' element={<CurrencyList />} />
          <Route path='/currency' element={<Currency />} />
          <Route path='/currency/:id' element={<Currency />} />
        </Routes>
      </div>
    </div >
  );
}

export default App;
