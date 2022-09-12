import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Category = () => {
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const pathId = useParams().id;
    const isAdding = pathId === undefined;


    const [showError, setShowError] = useState(false);
    const [category, setCategory] = useState({
        id: isAdding ? 0 : pathId,
        name: '',
        description: ''
    });

    const getCategory = async () => {
        const res = await fetch(`http://localhost:8080/category/${category.id}`);
        const data = await res.json();
        setCategory(data);
    };

    const postCategory = async () => {
        var res = await fetch('http://localhost:8080/category', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(category),
        });

        if (res.ok) {
            navigateTo('/categories');
        } else {
            setShowError(true);
        }
        console.log(res);
    };

    const deleteCategory = async () => {
        await fetch('http://localhost:8080/category', {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(category),
        });

        navigateTo('/categories/');
    }

    const onSave = () => {
        postCategory();
    }

    const onDelete = () => {
        deleteCategory();
    }

    useEffect(() => {
        if (!isAdding) {
            getCategory();
        }
    }, []);

    return (
        <div className='form'>
            <div className='mb-3 row'>
                <label htmlFor='input-id' className='col-sm-2 col-form-label'>ID</label>
                <div className='col-sm-10'>
                    <input type='text' readOnly className='form-control-plaintext' id='input-id' value={isAdding ? '' : category.id} />
                </div>
            </div>
            <div className='mb-3 row'>
                <label htmlFor='input-name' className='col-sm-2 col-form-label'>Name</label>
                <div className='col-sm-10'>
                    <input type='text' className='form-control' id='input-name' value={category.name} onChange={(event) => setCategory({ ...category, name: event.target.value })} />
                </div>
            </div>
            <div className='mb-3 row'>
                <label htmlFor='input-desc' className='col-sm-2 col-form-label'>Description</label>
                <div className='col-sm-10'>
                    <input type='text' className='form-control' id='input-desc' value={category.description} onChange={(event) => setCategory({ ...category, description: event.target.value })} />
                </div>
            </div>
            <div className='mb-3 row'>
                <div className='col-sm-2' />
                <div className='btn-group col-sm-10' role='group'>
                    {isAdding ?
                        <button onClick={() => onSave()} className='btn btn-secondary btn-success'>Add</button> :
                        <>
                            <button onClick={() => onSave()} className='btn btn-secondary btn-success'>Save</button>
                            <button onClick={() => onDelete()} className='btn btn-secondary btn-danger'>Delete</button>
                        </>
                    }
                    <button onClick={() => navigateTo('/categories')} className='btn btn-secondary'>Cancel</button>
                </div>
            </div>

            {showError ?
                <div className="alert alert-danger" role="alert">
                    Something went wrong.
                    <div style={{ float: 'right' }}>
                        <FaTimes className='close' onClick={() => { setShowError(false) }} />
                    </div>
                </div> : <></>
            }
        </div >
    )
}

export default Category
