import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/initializeDB`);
                const result = await response.json();

            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark ">
                <div className="container-fluid ">
                    <a className="navbar-brand text-white" href="#">Roxiller</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#footer">About</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Chose Operation
                                </a>
                                <ul className="dropdown-menu text-white">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
