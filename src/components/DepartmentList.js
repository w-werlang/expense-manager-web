import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';

const DepartmentList = () => {
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const [departments, setDepartments] = useState([]);

    const getDepartments = async () => {
        const res = await fetch(`http://localhost:8080/department`);
        const data = await res.json();
        setDepartments(data);
    };

    useEffect(() => {
        getDepartments();
    }, []);

    const openDeparment = (id) => {
        navigateTo('/department/' + id);
    }

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th colSpan={4}>Departments</th>
                    </tr>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department) => (
                        <tr key={department.id} >
                            <th scope='row'>{department.id}</th>
                            <td>{department.name}</td>
                            <td>{department.description}</td>
                            <td>
                                <button className='btn'>
                                    <AiFillEdit onClick={() => openDeparment(department.id)} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigateTo('/department')} className='btn btn-primary' >Add Department</button>
        </>
    )
}

export default DepartmentList
