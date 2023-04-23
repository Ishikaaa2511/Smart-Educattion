import { useState } from "react";

import { Link , useNavigate } from "react-router-dom";

import Layout1 from "../../Layout1/Layout1";

import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../../utils/Buttons/Button1/Button1";

import usericon from "/icons/user.png";
import emailicon from "/icons/email.png";
import lockicon from "/icons/lock.png";

import css from "./Signup.module.css";
import {Form } from 'reactstrap';

import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {setDoc , doc} from 'firebase/firestore';
import {db} from '../../../firebase.config';
import {auth} from '../../../firebase.config';
import {storage} from '../../../firebase.config';
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

import {toast} from 'react-toastify';


const Signup = () => {

  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [file, setFile] = useState(null);
  const [loading, setLoading]= useState(false);

  const navigate = useNavigate()

  
  const Signup = async (e)=>{
    e.preventDefault()
    
    setLoading(true)
    
    try{
      const userCarditional = await createUserWithEmailAndPassword(auth, email, password)
      
      const user = userCarditional.user
      
      console.log(user);
      
      const storageRef = ref(storage, `images/${Date.now() + username}`)
      
      const uploadTask = uploadBytesResumable(storageRef, file)
      
      uploadTask.on((error)=>{
        console.log(error.message)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadUrl)=>{
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadUrl,
          });
          
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadUrl,
          })
        })
      })
      
      setLoading(false)
      
      toast.success("Account Created")
      
      navigate("/")
    }
    catch(error){
      setLoading(false)
      
      toast.error("Something Went Wrong")
    }
  }
  
  return (
    <>
      <Layout1>
      {
              loading ? (
                <div lg = "12" className='text-center'><h5 className='fw-bold'>Loading...</h5></div>
              ):
              (
                <div className={css.outerDiv}>
                <div className={css.loginBox}>
                  <div className={css.ttl}>Sign up and start learning</div>
                  <hr />
                  <Form className={css.boxBdy}  onSubmit={Signup}>
                    <InputUtil
                      type="text"
                      name="username"
                      icon={usericon}
                      placeholderTxt="Username"
                      value={username} onChange = {(e)=> setUsername(e.target.value)}
                    />
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
                    <InputUtil
                      type= "file" 
                      onChange = {(e)=> setFile(e.target.files[0])}
                    />
                   
                    <Button1
                      txt="Signup"
                      color="var(--white)"
                      bck="var(--purple)"
                      hovBck="var(--purple-dark)"
                      extraCss={{
                        width: "100%",
                        margin: "0",
                        border: "none",
                        padding: "1rem",
                      }}
                     
                    />
                    <div className={css.blck}>
                      <span className={css.blckTxt}>
                        By signing up, you agree to our
                        <Link to="/join/forgot-password" className={css.anchor}>
                          Terms of Use
                        </Link>
                        and
                        <Link to="/join/forgot-password" className={css.anchor}>
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </div>
                    <div className={css.blck}>
                      <span className={css.blckTxt2}>Already have an account?</span>
                      <Link to="/join/login" className={css.anchor}>
                        <b>Log in</b>
                      </Link>
                    </div>
                  </Form>
                </div>
              </div>
              )
           }
      </Layout1>
    </>
  );
};

export default Signup;

