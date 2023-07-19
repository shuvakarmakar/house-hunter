import Navbar from "../Shared/Navbar/Navbar";
import useOwner from "../hook/useOwner";
import useRenter from "../hook/useRenter";
import { NavLink, Outlet } from "react-router-dom";
import { Slide } from "react-awesome-reveal";

const Dashboard = () => {
    const [isOwner] = useOwner();
    const [isRenter] = useRenter();

    return (
        <>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content lg:m-10 items-center justify-center">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <Slide direction="left" triggerOnce>
                        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                            {isOwner ? (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/manageHouses">
                                            Manage Houses
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/addhouse">
                                            Add New House
                                        </NavLink>
                                    </li>
                                </>
                            ) : isRenter ? (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/managebookings">
                                            Manage Bookings
                                        </NavLink>
                                    </li>
                                </>
                            ) : null}
                        </ul>
                    </Slide>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
