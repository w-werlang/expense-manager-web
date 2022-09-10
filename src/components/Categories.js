import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
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

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th colSpan={3}>Categories</th>
                    </tr>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <th scope='row'>{category.id}</th>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigateTo('/category')} className='btn btn-primary' >Add Category</button>
        </>
    )
}

export default Categories
