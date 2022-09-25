import SideBarEntry from './SideBarEntry'
import SideBarProfile from './SideBarProfile'

const SideBar = () => {
    return (
        <div className='side-bar d-flex flex-column flex-shrink-0 p-3 text-bg-dark'>
            <a href='/' className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'>
                <span className='fs-4'>Menu</span>
            </a>
            <hr />
            <ul className='nav nav-pills flex-column mb-auto'>
                <SideBarEntry text='Categories' path='categories' />
                <SideBarEntry text='Currency' path='currencies' />
                <SideBarEntry text='Departments' path='departments' />
                <SideBarEntry text='Employee' path='employees' />
                <SideBarEntry text='Events' path='events' />

            </ul>
            <hr />
            <SideBarProfile />
        </div>
    )
}

export default SideBar
