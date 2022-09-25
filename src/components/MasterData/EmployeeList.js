import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

const EmployeeList = () => {

    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const [showError, setShowError] = useState(false);
    const [employees, setEmployees] = useState([]);

    const getEmployees = async () => {
        var res = await fetch('http://localhost:8080/employee');
        var data = await res.json();

        if (res.ok) {
            return data;
        } else {
            setShowError(true);
        }
    };

    const onClickOpenEmployee = (id) => {
        navigateTo('/employee/' + id);
    }

    const onClickAddEmployee = () => {
        navigateTo('/employee')
    }

    const onClickCloseError = () => {
        setShowError(false);
    }

    useEffect(() => {
        const initializeObjects = async () => {
            setEmployees(await getEmployees());
        }

        initializeObjects();

        // Disable useEffect missing dependency warning:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
                                    <AiFillEdit onClick={() => onClickOpenEmployee(employee.id)} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => onClickAddEmployee()} className='btn btn-primary'>Add Employee</button>

            {showError &&
                <div className="alert alert-danger" role="alert">
                    <p>Something went wrong.</p>
                    <div style={{ float: 'right' }}>
                        <FaTimes className='close' onClick={() => onClickCloseError()} />
                    </div>
                </div>
            }
        </>
    )
}

export default EmployeeList
