import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Employee = () => {

    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const pathId = useParams().id;
    const isAdding = pathId === undefined;

    const [showError, setShowError] = useState(false);
    const [departmentList, setDepartmentList] = useState([]);
    const [employee, setEmployee] = useState({
        id: isAdding ? 0 : pathId,
        firstName: '',
        lastName: '',
        department: {
            id: 0,
            name: '',
            description: ''
        }
    });

    const getDepartmentList = async () => {
        var res = await fetch(`http://localhost:8080/department`);
        var data = await res.json();

        if (res.ok) {
            return data;
        } else {
            setShowError(true);
        }
    }

    const getEmployee = async () => {
        var res = await fetch(`http://localhost:8080/employee/${employee.id}`);
        var data = await res.json();

        if (res.ok) {
            return data;
        } else {
            setShowError(true);
        }
    };

    const postEmployee = async () => {
        var res = await fetch('http://localhost:8080/employee', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(employee),
        });

        if (res.ok) {
            navigateTo('/employees');
        } else {
            setShowError(true);
        }
    };

    const deleteEmployee = async () => {
        var res = await fetch('http://localhost:8080/employee', {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(employee),
        });

        if (res.ok) {
            navigateTo('/employees');
        } else {
            setShowError(true);
        }
    }

    const onClickSave = () => {
        postEmployee();
    }

    const onClickDelete = () => {
        deleteEmployee();
    }

    const onClickCancel = () => {
        navigateTo('/employees');
    }

    const onClickCloseError = () => {
        setShowError(false);
    }

    const onChangeFirstName = (_event) => {
        setEmployee({ ...employee, firstName: _event.target.value });
    }

    const onChangeLastName = (_event) => {
        setEmployee({ ...employee, lastName: _event.target.value });
    }

    const onChangeDepartment = (_event) => {
        var selectedDepartmentName = _event.target.value;
        var selectedDepartment = departmentList.filter((element) => {
            return element.name === selectedDepartmentName;
        })[0];

        setEmployee({ ...employee, department: selectedDepartment });
    }

    useEffect(() => {
        const initializeObjects = async () => {
            var departmentList = await getDepartmentList();
            setDepartmentList(departmentList);

            if (isAdding) {
                setEmployee({ ...employee, department: departmentList[0] });
            } else {
                setEmployee(await getEmployee());
            }
        };

        initializeObjects();

        // Disable useEffect missing dependency warning:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='form'>
            <div className='mb-3 row'>
                <label htmlFor='input-id' className='col-sm-2 col-form-label'>ID</label>
                <div className='col-sm-10'>
                    <input type='text' readOnly className='form-control-plaintext' id='input-id' value={isAdding ? '' : employee.id} />
                </div>
            </div>

            <div className='mb-3 row'>
                <label htmlFor='input-firstName' className='col-sm-2 col-form-label'>First Name</label>
                <div className='col-sm-10'>
                    <input type='text' className='form-control' id='input-firstName' value={employee.firstName} onChange={(_event) => onChangeFirstName(_event)} />
                </div>
            </div>

            <div className='mb-3 row'>
                <label htmlFor='input-lastName' className='col-sm-2 col-form-label'>Last Name</label>
                <div className='col-sm-10'>
                    <input type='text' className='form-control' id='input-lastName' value={employee.lastName} onChange={(_event) => onChangeLastName(_event)} />
                </div>
            </div>

            <div className='mb-3 row'>
                <label htmlFor='input-department' className='col-sm-2 col-form-label'>Department</label>
                <div className='col-sm-10'>
                    <select value={employee.department.name} className="form-select" onChange={(_event) => onChangeDepartment(_event)} >
                        {departmentList.map((department) => (
                            <option key={department.id}>{department.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='mb-3 row'>
                <div className='col-sm-2' />
                <div className='btn-group col-sm-10' role='group'>
                    <button onClick={() => onClickSave()} className='btn btn-secondary btn-success'>{isAdding ? 'Add' : 'Save'}</button>
                    {!isAdding && <button onClick={() => onClickDelete()} className='btn btn-secondary btn-danger'>Delete</button>}
                    <button onClick={() => onClickCancel()} className='btn btn-secondary'>Cancel</button>
                </div>
            </div>

            {showError &&
                <div className="alert alert-danger" role="alert">
                    <p>Something went wrong.</p>
                    <div style={{ float: 'right' }}>
                        <FaTimes className='close' onClick={() => onClickCloseError()} />
                    </div>
                </div>
            }
        </div >
    )
}

export default Employee
