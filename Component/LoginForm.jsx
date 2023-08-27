import React, { useState } from 'react'
import styles from './LoginForm.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';


export default function LoginForm() {
 const router=useRouter()
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setpassword]=useState('')
  const [login, setLogin]=useState(false);

  const submitHandler=async(e)=>{
    e.preventDefault()
    
    let obj={
        name, 
        email, 
        password
    }
    if(!login){
      //signup request
      const response= await axios.post("/api/signup",obj);
      console.log(response.data)
      const {token,userId}=response.data
      localStorage.setItem("userId",userId)
      localStorage.setItem("userId",token)
      if(token){
        router.push("/todolist")
    }
   
    }
    else{
      //login request
      const response= await axios.post("/api/login",obj);
      console.log(response.data)
      const {token,userId}=response.data
      localStorage.setItem("userId",userId)
      localStorage.setItem("userId",token)
      if(token){
        router.push("/todolist")
    }
   
    }

   
  }
  const loginStateHandler=()=>{
    setLogin(prevState=>!prevState)
  }
  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <label className={styles.label}>Name</label>
        <input className={styles.inputField} type="text" onChange={(e) => setName(e.target.value)} required />
        <label className={styles.label}>Email</label>
        <input className={styles.inputField} type="email" onChange={(e) => setEmail(e.target.value)} required />
        <label className={styles.label}>Password</label>
        <input className={styles.inputField} type="password" onChange={(e) => setpassword(e.target.value)} required />
        <button className={styles.submitButton} type="submit">{login ? 'Login' : 'Signup'}</button>
      </form>
      <button className={styles.toggleButton} onClick={loginStateHandler}>
        {login ? 'Create New Account' : 'Login to Existing Account'}
      </button>
    </div>
  )
}
