import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Currency = () => {

    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const pathId = useParams().id;
    const isAdding = pathId === undefined;

    const [showError, setShowError] = useState(false);
    const [currency, setCurrency] = useState({
        id: isAdding ? 0 : pathId,
        name: '',
        description: ''
    });

    const getCurrency = async () => {
        var res = await fetch(`http://localhost:8080/currency/${currency.id}`);
        var data = await res.json();

        if (res.ok) {
            return data;
        } else {
            setShowError(true);
        }
    };

    const postCurrency = async () => {
        var res = await fetch('http://localhost:8080/currency', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(currency),
        });

        if (res.ok) {
            navigateTo('/currencies');
        } else {
            setShowError(true);
        }
    };

    const deleteCurrency = async () => {
        var res = await fetch('http://localhost:8080/currency', {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(currency),
        });

        if (res.ok) {
            navigateTo('/currencies');
        } else {
            setShowError(true);
        }
    }

    const onClickSave = () => {
        postCurrency();
    }

    const onClickDelete = () => {
        deleteCurrency();
    }

    const onClickCancel = () => {
        navigateTo('/currencies');
    }

    const onClickCloseError = () => {
        setShowError(false);
    }

    const onChangeCode = (_event) => {
        setCurrency({ ...currency, code: _event.target.value });
    }

    const onChangeName = (_event) => {
        setCurrency({ ...currency, name: _event.target.value });
    }

    useEffect(() => {
        const initializeObjects = async () => {
            if (!isAdding) {
                setCurrency(await getCurrency());
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
                    <input type='text' readOnly className='form-control-plaintext' id='input-id' value={isAdding ? '' : currency.id} />
                </div>
            </div>

            <div className='mb-3 row'>
                <label htmlFor='input-code' className='col-sm-2 col-form-label'>Code</label>
                <div className='col-sm-10'>
                    <input type='text' className='form-control' id='input-code' value={currency.code} onChange={(_event) => onChangeCode(_event)} />
                </div>
            </div>

            <div className='mb-3 row'>
                <label htmlFor='input-name' className='col-sm-2 col-form-label'>Name</label>
                <div className='col-sm-10'>
                    <input type='text' className='form-control' id='input-name' value={currency.name} onChange={(_event) => onChangeName(_event)} />
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

export default Currency
