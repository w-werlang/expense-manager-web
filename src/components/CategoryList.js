import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';

const CategoryList = () => {
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const res = await fetch(`http://localhost:8080/category`);
        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const openCategory = (id) => {
        navigateTo('/category/' + id);
    }

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
                                    <AiFillEdit onClick={() => openCategory(category.id)} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigateTo('/category')} className='btn btn-primary' >Add Category</button>
        </>
    )
}

export default CategoryList
