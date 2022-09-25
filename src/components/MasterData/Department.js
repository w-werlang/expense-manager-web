import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Department = () => {

    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const pathId = useParams().id;
    const isAdding = pathId === undefined;

    const [showError, setShowError] = useState(false);
    const [department, setDepartment] = useState({
        id: isAdding ? 0 : pathId,
        name: '',
        description: ''
    });

    const getDepartment = async () => {
        var res = await fetch(`http://localhost:8080/department/${department.id}`);
        var data = await res.json();

        if (res.ok) {
            return data;
        } else {
            setShowError(true);
        }
    };

    const postDepartment = async () => {
        var res = await fetch('http://localhost:8080/department', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(department),
        });

        if (res.ok) {
            navigateTo('/departments');
        } else {
            setShowError(true);
        }
    };

    const deleteDepartment = async () => {
        var res = await fetch('http://localhost:8080/department', {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(department),
        });

        if (res.ok) {
            navigateTo('/departments');
        } else {
            setShowError(true);
        }
    }

    const onClickSave = () => {
        postDepartment();
    }

    const onClickDelete = () => {
        deleteDepartment();
    }

    const onClickCancel = () => {
        navigateTo('/departments');
    }

    const onClickCloseError = () => {
        setShowError(false);
    }

    const onChangeName = (_event) => {
        setDepartment({ ...department, name: _event.target.value });
    }

    const onChangeDescription = (_event) => {
        setDepartment({ ...department, description: _event.target.value });
    }

    useEffect(() => {
        const initializeObjects = async () => {
            if (!isAdding) {
                setDepartment(await getDepartment());
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
                    <input type='text' readOnly className='form-control-plaintext' id='input-id' value={isAdding ? '' : department.id} />
                </div>
            </div>

            <div className='mb-3 row'>
                <label htmlFor='input-name' className='col-sm-2 col-form-label'>Name</label>
                <div className='col-sm-10'>
                    <input type='text' className='form-control' id='input-name' value={department.name} onChange={(_event) => onChangeName(_event)} />
                </div>
            </div>

            <div className='mb-3 row'>
                <label htmlFor='input-description' className='col-sm-2 col-form-label'>Description</label>
                <div className='col-sm-10'>
                    <input type='text' className='form-control' id='input-description' value={department.description} onChange={(_event) => onChangeDescription(_event)} />
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

export default Department
