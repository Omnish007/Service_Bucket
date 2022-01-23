import React, { useState } from 'react';
import Navbar from "../components/Navbar"
import Footer from "../components/footer"

import { useSelector, useDispatch } from "react-redux"
import "../CSS/profile.css"

const Profile = () => {

  const { auth, service } = useSelector(state => state)

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
            <button className="tablinks tab1"  onClick={() => tabs("tab1")}>Pending Services</button>
            <button className="tablinks tab2" onClick={() => tabs("tab2")}>History</button>
          </div>
          <div id="tab1" style={{display:"block"}} className="tabcontent">
               
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
