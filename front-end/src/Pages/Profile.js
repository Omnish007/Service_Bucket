import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import { getOrders } from "../redux/actions/orderAction"

import { useSelector, useDispatch } from "react-redux"
import "../CSS/profile.css"
import ProfileCard from '../components/profileCard';

const Profile = () => {

  const { auth, service, order } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders({ auth }))
  }, []);


  const tabs = (tabName, e) => {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", " ");
    }

    document.getElementById(tabName).style.display = "block";
    document.getElementsByClassName(tabName).classlist += "active";

  }

  return (<>
    <Navbar />
    <div className="profile">
      <div className="profile_left">
        <div className="profile_image">
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-256%2Faccount-profile-avatar-man-circle-round-user-30452.png&f=1&nofb=1" alt="" />
        </div>


        <div className="profile_info">
          <h5>Name: {auth.user?.name}</h5>
          <h5>Email: {auth.user?.email}</h5>
          <h5>Phone: {auth.user?.phone}</h5>

        </div>





      </div>

      <div className="profile_right">
        <div>
          <div className="tab">
            <button className="tablinks tab1" onClick={() => tabs("tab1")}>Pending Services</button>
            <button className="tablinks tab2" onClick={() => tabs("tab2")}>History</button>
          </div>
          <div id="tab1" style={{ display: "block" }} className="tabcontent">
            {
              order.length > 0 ?
                <div className="profile_card_container">
                  {order.map(ele => (
                    ele.status === "0" ?
                    <ProfileCard service={ele.service} subService={ele.subService} price={ele.price} address={ele.address} state={ele.state} pinCode={ele.pinCode} dist={ele.dist} src={ele.image}/>
                                       :""
                  ))
                  }
                </div>
                : ""
            }
          </div>

          <div id="tab2" className="tabcontent">

          </div>


        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default Profile;
