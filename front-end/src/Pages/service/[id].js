import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar"
import Footer from "../../components/footer"
import LoadIcon from "../../images/loading.gif"
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getServices } from '../../redux/actions/serviceActions';

const ServiceForm = () => {


  const { auth, service } = useSelector(state => state)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [services, setServices] = useState({})
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoad(true)
    dispatch(getServices())
    setLoad(false)
  }, []);



  return (<>
    <Navbar />
    <div>

      <h1>{id}</h1>

     
    </div>
    <Footer />

  </>)
};

export default ServiceForm;
