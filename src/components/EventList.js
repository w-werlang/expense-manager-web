import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';

const EventList = () => {
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        const res = await fetch(`http://localhost:8080/event`);
        const data = await res.json();
        setEvents(data);
    };

    useEffect(() => {
        getEvents();
    }, []);

    const openDeparment = (id) => {
        navigateTo('/event/' + id);
    }

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
                                    <AiFillEdit onClick={() => openDeparment(event.id)} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigateTo('/event')} className='btn btn-primary' >Add Event</button>
        </>
    )
}

export default EventList
