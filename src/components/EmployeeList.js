import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';

const EmployeeList = () => {
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const [employees, setCategories] = useState([]);

    const getCategories = async () => {
        const res = await fetch(`http://localhost:8080/employee`);
        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const openEmployee = (id) => {
        navigateTo('/employee/' + id);
    }

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th colSpan={4}>Employees</th>
                    </tr>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} >
                            <th scope='row'>{employee.id}</th>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>
                                <button className='btn'>
                                    <AiFillEdit onClick={() => openEmployee(employee.id)} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigateTo('/employee')} className='btn btn-primary' >Add Employee</button>
        </>
    )
}

export default EmployeeList
