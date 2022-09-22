import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Event = () => {
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const pathId = useParams().id;
    const isAdding = pathId === undefined;


    const [showError, setShowError] = useState(false);
    const [event, setEvent] = useState({
        id: isAdding ? 0 : pathId,
        name: '',
        description: ''
    });

    const getEvent = async () => {
        const res = await fetch(`http://localhost:8080/event/${event.id}`);
        const data = await res.json();
        setEvent(data);
    };

    const postEvent = async () => {
        var res = await fetch('http://localhost:8080/event', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(event),
        });

        if (res.ok) {
            navigateTo('/events');
        } else {
            setShowError(true);
        }
    };

    const deleteEvent = async () => {
        await fetch('http://localhost:8080/event', {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(event),
        });

        navigateTo('/events/');
    }

    const onSave = () => {
        postEvent();
    }

    const onDelete = () => {
        deleteEvent();
    }

    useEffect(() => {
        if (!isAdding) {
            getEvent();
        }
    }, []);

    return (
        <div className='form'>
            <div className='mb-3 row'>
                <label htmlFor='input-id' className='col-sm-2 col-form-label'>ID</label>
                <div className='col-sm-10'>
                    <input type='text' readOnly className='form-control-plaintext' id='input-id' value={isAdding ? '' : event.id} />
                </div>
            </div>
            <div className='mb-3 row'>
                <label htmlFor='input-name' className='col-sm-2 col-form-label'>Name</label>
                <div className='col-sm-10'>
                    <input type='text' className='form-control' id='input-name' value={event.name} onChange={(_event) => setEvent({ ...event, name: _event.target.value })} />
                </div>
            </div>
            <div className='mb-3 row'>
                <label htmlFor='input-desc' className='col-sm-2 col-form-label'>Description</label>
                <div className='col-sm-10'>
                    <input type='text' className='form-control' id='input-desc' value={event.description} onChange={(_event) => setEvent({ ...event, description: _event.target.value })} />
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
                    <button onClick={() => navigateTo('/events')} className='btn btn-secondary'>Cancel</button>
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

export default Event
