import { useState } from "react";

import { Link , useNavigate} from "react-router-dom";

import Layout1 from "../../Layout1/Layout1";

import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../../utils/Buttons/Button1/Button1";

import emailicon from "/icons/email.png";
import lockicon from "/icons/lock.png";

import css from "./Login.module.css";
import { signInWithEmailAndPassword } from 'firebase/auth';

import {auth} from '../../../firebase.config';


import {toast} from 'react-toastify';


const Login = () => {
 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate()

  const signIn = async(e) =>{

    e.preventDefault()
    setLoading(true)

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email,
        password);

        const user = userCredential.user;

        console.log(user)
        setLoading(false)
        toast.success('Successfully logged in')
        navigate('/')

    }catch(error){
        setLoading(false)
        toast.error(error.message)
    }
  }


  
  return (
    <>
      <Layout1>
        <div className={css.outerDiv}>
          <div className={css.loginBox}>
            <div className={css.ttl}>Log in to your Udemy account</div>
            <hr />
            <div className={css.boxBdy}>
              <InputUtil
                type="email"
                name="email"
                icon={emailicon}
                placeholderTxt="Email"
                value={email} 
                onChange = {(e)=> setEmail(e.target.value)}
              />
              <InputUtil
               type="password"
               name="password"
               
               icon={lockicon}
               placeholderTxt="Password"
               value={password} 
               onChange = {(e)=> setPassword(e.target.value)}
              />
              <Button1
                txt="Login"
                color="var(--white)"
                bck="var(--purple)"
                hovBck="var(--purple-dark)"
                extraCss={{
                  width: "100%",
                  margin: "0",
                  border: "none",
                  padding: "1rem",
                }}
                onClick={signIn}
              />
              <div className={css.blck}>
                <span className={css.blckTxt}>or</span>
                <Link to="/join/forgot-password" className={css.anchor}>
                  Forgot password
                </Link>
              </div>
              <div className={css.blck}>
                <Link to="/join/login" className={css.anchor}>
                  Log in to a different account
                </Link>
              </div>
              <div className={css.blck}>
                <span className={css.blckTxt}>Dont have an account?</span>
                <Link to="/join/signup" className={css.anchor}>
                  <b>Signup</b>
                </Link>
              </div>
              <div className={css.blck}>
                <Link to="/join/login" className={css.anchor}>
                  <b>Login with your organization</b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout1>
    </>
  );
};

export default Login;
