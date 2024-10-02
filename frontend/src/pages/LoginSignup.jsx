import React, { useState } from "react";
import LoginForm from "../components/authForms/LoginForm";
import SignUpForm from "../components/authForms/SignUpForm";

const LoginSignup = () => {
  const [formType,setFormType] = useState("")
  console.log(formType);
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-bl from-blue-700 to-green-500 flex justify-center">
      <div className="rounded-xl absolute top-[10%] xl:w-[50%] lg:w-[70%] md:w-[80%] w-[90%]  bg-white">
        {
          formType === 'SignUp' ? <SignUpForm callBack={()=>setFormType("")}/> : <LoginForm callBack={()=>setFormType("SignUp")}/>
        }
      </div>
    </div>
  );
};

export default LoginSignup;
