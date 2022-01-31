import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../components/Navbar"
import Footer from "../components/footer"


import { getOrders, deleteOrder } from "../redux/actions/orderAction"

import { useSelector, useDispatch } from "react-redux"
import "../CSS/profile.css"


import ProfileRight from '../components/Profile/ProfileRight';
import ProfileLeft from '../components/Profile/ProfileLeft';

const Profile = () => {
  var history = 0
  var pending = 0
  const { auth, service, order } = useSelector(state => state)
  const dispatch = useDispatch()
  

  useEffect(() => {
    if (auth.token)
      dispatch(getOrders({ auth }))
  }, [auth.token, dispatch]);







  return (<>
    <Navbar />
    <div className="profilePage">
      <ProfileLeft />
      <ProfileRight />
    </div>
    <Footer />
  </>
  );
};

export default Profile;
