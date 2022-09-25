import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

const CurrencyList = () => {

    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const [showError, setShowError] = useState(false);
    const [currencies, setCurrencies] = useState([]);

    const getCurrencies = async () => {
        var res = await fetch('http://localhost:8080/currency');
        var data = await res.json();

        if (res.ok) {
            return data;
        } else {
            setShowError(true);
        }
    };

    const onClickOpenCurrency = (id) => {
        navigateTo('/currency/' + id);
    }

    const onClickAddCurrency = () => {
        navigateTo('/currency')
    }

    const onClickCloseError = () => {
        setShowError(false);
    }

    useEffect(() => {
        const initializeObjects = async () => {
            setCurrencies(await getCurrencies());
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
                        <th colSpan={4}>Currencies</th>
                    </tr>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Code</th>
                        <th scope='col'>Name</th>
                        <th scope='col'></th>
                    </tr>
                </thead>

                <tbody>
                    {currencies.map((currency) => (
                        <tr key={currency.id} >
                            <th scope='row'>{currency.id}</th>
                            <td>{currency.code}</td>
                            <td>{currency.name}</td>
                            <td>
                                <button className='btn'>
                                    <AiFillEdit onClick={() => onClickOpenCurrency(currency.id)} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => onClickAddCurrency()} className='btn btn-primary'>Add Currency</button>

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

export default CurrencyList
