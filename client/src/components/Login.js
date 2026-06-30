import React from 'react'
import Auth from './Auth'
const Login = (props) => {
  return (
    <div>
       < Auth isLogin={true} showAlert={props.showAlert}/>
    </div>
  )
}

export default Login
