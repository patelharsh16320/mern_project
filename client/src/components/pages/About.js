import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css'

const About = () => {
    const Navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const data = await res.json();
            // console.log(data);
            setUserData(data);

            if (!res.status === 200) {
                const err = new Error(res.err);
                throw err;
            }
        }
        catch (e) {
            console.log(e.message);
            Navigate('/login');
        }
    }
    const updateData = () => {
        Navigate('/update');
    }
    const deleteData = () => {
        confirmAlert({
          message: 'Are you sure to Delete this ID.',
          buttons: [
            { label: 'Yes', onClick: () => Navigate('/delete') },
            { label: 'No', onClick: () => toast.error('Cancle',{theme: "colored"}) }
          ]
        });
    }
    useEffect(() => {
        callAboutPage();
    });

    return (
        <>
            <div className='container emp-profile'>
                <form method="GET">
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='pofile-img'>
                                <img src="/images/about.jpg" alt="User_Photo" width={'100%'} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='profile-head'>
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className='profile mt-3 mb-5'>Rankings: <span>8/10</span></p>
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a href='#home' className="nav-link active" id="home-tab" data-toggle="tab" role="tab">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href='#profile' className="nav-link" id="profile-tab" data-toggle="tab" role="tab">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            {/* <input type="submit" className='profile_edit_btn btn btn-dark button_effect_about' name='btnAddMore' value="Edit Profile" onClick={updateData} /> */}
                            <button className='profile_edit_btn btn btn-dark button_effect_about mt-3' type="button" onClick={updateData}>Edit Profile</button>
                            <button className='profile_edit_btn btn btn-dark button_effect_about mt-3' type="button" onClick={deleteData}>Delete Profile</button>
                        </div>
                    </div>

                    <div className='row'>
                        {/* left side  */}
                        <div className='col-md-4'>
                            <div className='profile-work'>
                                <p className='text-uppercase'>Work Link</p>
                                <NavLink to='/about'>YouTube</NavLink><br />
                                <NavLink to='/about'>InstrGram</NavLink><br />
                                <NavLink to='/about'>SnapChat</NavLink><br />
                                <NavLink to='/about'>Watsapp</NavLink><br />
                                <NavLink to='/about'>SnapChat</NavLink><br />
                            </div>
                        </div>
                        {/* Right side  */}
                        <div className='col-md-4 pl-5 about-info'>
                            <div className='tab-content profile-tab' id='myTabContent'>
                                <div className='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'>
                                    <div className='row'>
                                        <div className='col-md-6'> <label>User ID</label> </div>
                                        <div className='col-md-6'> <p>{userData._id}</p> </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'> <label>Phone</label> </div>
                                        <div className='col-md-6'> <p>{userData.phone}</p> </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'> <label>Email</label> </div>
                                        <div className='col-md-6'> <p>{userData.email}</p></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'> <label>English Level</label> </div>
                                        <div className='col-md-6'> <p>Expert</p> </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'> <label>Availablity</label> </div>
                                        <div className='col-md-6'> <p>3 Month</p> </div>
                                    </div>
                                </div>
                                <div className='tab-pane fade' id='profile' role='tabpanel' aria-labelledby='profile-tab'>
                                    <div className='row'>
                                        <div className='col-md-6'> <label>Phone </label> </div>
                                        <div className='col-md-6'> <p>{userData.phone}</p> </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'> <label>Email </label> </div>
                                        <div className='col-md-6'> <p>{userData.email}</p> </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'> <label>Links </label> </div>
                                        <div className='col-md-6'> <p>None</p> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default About 