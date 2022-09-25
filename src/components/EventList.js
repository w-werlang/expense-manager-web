import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

const EventList = () => {

    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const [showError, setShowError] = useState(false);
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        var res = await fetch('http://localhost:8080/event');
        var data = await res.json();

        if (res.ok) {
            return data;
        } else {
            setShowError(true);
        }
    };

    const onClickOpenEvent = (id) => {
        navigateTo('/event/' + id);
    }

    const onClickAddEvent = () => {
        navigateTo('/event')
    }

    const onClickCloseError = () => {
        setShowError(false);
    }

    useEffect(() => {
        const initializeObjects = async () => {
            setEvents(await getEvents());
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
                        <th colSpan={4}>Events</th>
                    </tr>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'></th>
                    </tr>
                </thead>

                <tbody>
                    {events.map((event) => (
                        <tr key={event.id} >
                            <th scope='row'>{event.id}</th>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>
                                <button className='btn'>
                                    <AiFillEdit onClick={() => onClickOpenEvent(event.id)} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => onClickAddEvent()} className='btn btn-primary'>Add Event</button>

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

export default EventList
