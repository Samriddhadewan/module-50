import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";

const SignUp = () => {
    const [errorMassage, setErrorMassage] = useState("")
    
    const handleSignUpForm = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;

        setErrorMassage("");

        createUserWithEmailAndPassword(auth, email, pass)
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.log("Error", error);
            setErrorMassage(error.message)
        })



    }

    return (
    
    <div className="card p-12 my-8 mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className="text-5xl text-center font-bold">Login now!</h1>
      <form onSubmit={handleSignUpForm} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {
        errorMassage && <p className="text-red-600"> {errorMassage}</p>
      }
    </div>
  )
}

export default SignUp