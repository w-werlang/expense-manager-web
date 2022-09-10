import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Category = () => {
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const pathID = useParams().id;
    const [category, setCategory] = useState({
        id: pathID === undefined ? 0 : pathID,
        name: '',
        description: ''
    });

    const getCategory = async () => {
        const res = await fetch(`http://localhost:8080/category/${category.id}`);
        const data = await res.json();
        setCategory(data);
    };

    const postCategory = async () => {
        await fetch('http://localhost:8080/category', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(category),
        });

        navigateTo('/categories/');
    };

    const save = () => {
        postCategory();
    }

    useEffect(() => {
        if (category.id != 0) {
            getCategory();
        }
    }, []);

    return (
        <div className='form'>
            <div className='mb-3 row'>
                <label htmlFor='input-id' className='col-sm-2 col-form-label'>ID</label>
                <div className='col-sm-10'>
                    <input type='text' readOnly className='form-control-plaintext' id='input-id' value={category.id} />
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
                    <button onClick={() => save()} className='btn btn-secondary btn-success'>Save</button>
                    <button onClick={() => navigateTo('/categories')} className='btn btn-secondary btn-warning'>Cancel</button>
                </div>
            </div>
        </div >
    )
}

export default Category
