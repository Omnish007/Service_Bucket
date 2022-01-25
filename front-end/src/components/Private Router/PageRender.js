import React from 'react'
import { useParams } from "react-router-dom"
import NotFound from '../NotFound'
import { useSelector } from 'react-redux'

const ganeratePage = (pageName) => {
    const component = () => require(`../../Pages/${pageName}`).default

    try {
        return React.createElement(component())
    } catch (error) {
        return <NotFound />
    }
}

function PageRender() {

    const { page, id } = useParams()
    const { auth } = useSelector(state => state)

    let pageName = ""

    if(auth.token){
        if(id){
            pageName = `${page}/[id]`
        }
        else{
            pageName = `${page}`
        }
    }

    return ganeratePage(pageName)
}

export default PageRender
