import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import { getOrders, deleteOrder } from "../redux/actions/orderAction"

import { useSelector, useDispatch } from "react-redux"
import "../CSS/profile.css"
import ProfileCard from '../components/profileCard';

const Profile = () => {

  const { auth, service, order } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.token)
      dispatch(getOrders({ auth }))
  }, [auth.token, dispatch]);

  const del = (id) => {
    dispatch(deleteOrder({ id, auth }))
    dispatch(getOrders({ auth }))
  }

  var tabButtons = document.querySelectorAll(".buttonContainer button")
  var tabPanels = document.querySelectorAll(".tabcontent")


  function showPanel(panelIndex, colorCode) {
    tabButtons.forEach(function (node) {
      node.style.backgroundColor = ""
      node.style.color = ""
    })
    tabButtons[panelIndex].style.backgroundColor = colorCode

    tabPanels.forEach(function (node) {
      node.style.display = "none"
    })
    tabPanels[panelIndex].style.display = "block"
  }



  return (<>
    <Navbar />
    <div className="profilePage">
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
          <div className="buttonContainer">
            <button className="tablinks tab1" onClick={() => showPanel(0, "#2a2a2a")}>Pending Services</button>
            <button className="tablinks tab2" onClick={() => showPanel(1, "#2a2a2a")}>History</button>
          </div>
          <div id="tab1" style={{ display: "block" }} className="tabcontent">
            {
              order.length > 0 ?
                <div className="profile_card_container">
                  {order.map(ele => (
                    ele.status === "0" ?
                      <ProfileCard id={ele._id} service={ele.service} subService={ele.subService} price={ele.price} address={ele.address} state={ele.state} pinCode={ele.pinCode} dist={ele.dist} src={ele.image} button={true} deleteService={del} />
                      : ""
                  ))
                  }
                </div>
                : ""
            }
          </div>

          <div id="tab2" className="tabcontent">
            {
              order.length > 0 ?
                <div className="profile_card_container">
                  {order.map(ele => (
                    ele.status === "1" ?
                      <ProfileCard service={ele.service} subService={ele.subService} price={ele.price} address={ele.address} state={ele.state} pinCode={ele.pinCode} dist={ele.dist} src={ele.image} button={false} />
                      : ""
                  ))
                  }
                </div>
                : ""
            }
          </div>


        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default Profile;
