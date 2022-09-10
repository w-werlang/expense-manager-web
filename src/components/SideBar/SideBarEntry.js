import { useNavigate } from 'react-router-dom';

const SideBarEntry = ({ text, path }) => {
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    }

    return (
        <li>
            <button onClick={() => navigateTo(path)} className={`side-bar-entry-button text-start nav-link text-white ${window.location.pathname === '/' + path ? 'active' : ''}`}>
                {text}
            </button>
        </li>
    )
}

export default SideBarEntry
