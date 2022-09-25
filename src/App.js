import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SideBar from './components/SideBar/SideBar';
import CategoryList from './components/MasterData/CategoryList';
import Category from './components/MasterData/Category';
import Currency from './components/MasterData/Currency';
import CurrencyList from './components/MasterData/CurrencyList';
import DepartmentList from './components/MasterData/DepartmentList';
import Department from './components/MasterData/Department';
import Employee from './components/MasterData/Employee';
import EmployeeList from './components/MasterData/EmployeeList';
import Event from './components/MasterData/Event';
import EventList from './components/MasterData/EventList';


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

          <Route path='/currencies' element={<CurrencyList />} />
          <Route path='/currency' element={<Currency />} />
          <Route path='/currency/:id' element={<Currency />} />

          <Route path='/departments' element={<DepartmentList />} />
          <Route path='/department' element={<Department />} />
          <Route path='/department/:id' element={<Department />} />

          <Route path='/employees' element={<EmployeeList />} />
          <Route path='/employee' element={<Employee />} />
          <Route path='/employee/:id' element={<Employee />} />

          <Route path='/events' element={<EventList />} />
          <Route path='/event' element={<Event />} />
          <Route path='/event/:id' element={<Event />} />
        </Routes>
      </div>
    </div >
  );
}

export default App;
