import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

const CategoryList = () => {

    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const [showError, setShowError] = useState(false);
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        var res = await fetch('http://localhost:8080/category');
        var data = await res.json();

        if (res.ok) {
            return data;
        } else {
            setShowError(true);
        }
    };

    const onClickOpenCategory = (id) => {
        navigateTo('/category/' + id);
    }

    const onClickAddCategory = () => {
        navigateTo('/category')
    }

    const onClickCloseError = () => {
        setShowError(false);
    }

    useEffect(() => {
        const initializeObjects = async () => {
            setCategories(await getCategories());
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
                        <th colSpan={4}>Categories</th>
                    </tr>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'></th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} >
                            <th scope='row'>{category.id}</th>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <button className='btn'>
                                    <AiFillEdit onClick={() => onClickOpenCategory(category.id)} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => onClickAddCategory()} className='btn btn-primary'>Add Category</button>

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

export default CategoryList
