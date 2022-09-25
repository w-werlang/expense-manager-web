import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

const DepartmentList = () => {

    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const [showError, setShowError] = useState(false);
    const [departments, setDepartments] = useState([]);

    const getDepartments = async () => {
        var res = await fetch('http://localhost:8080/department');
        var data = await res.json();

        if (res.ok) {
            return data;
        } else {
            setShowError(true);
        }
    };

    const onClickOpenDepartment = (id) => {
        navigateTo('/department/' + id);
    }

    const onClickAddDepartment = () => {
        navigateTo('/department')
    }

    const onClickCloseError = () => {
        setShowError(false);
    }

    useEffect(() => {
        const initializeObjects = async () => {
            setDepartments(await getDepartments());
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
                                    <AiFillEdit onClick={() => onClickOpenDepartment(department.id)} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => onClickAddDepartment()} className='btn btn-primary'>Add Department</button>

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

export default DepartmentList
