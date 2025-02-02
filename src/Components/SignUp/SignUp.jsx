import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";

const SignUp = () => {
    const [errorMassage, setErrorMassage] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)
    
    const handleSignUpForm = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setErrorMassage("");
        setSuccessMessage(false);

        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!regex.test(password)){
            setErrorMassage("password should contain at least 1number, 1uppercase letter, 1 lowercase letter, 1 special character");
            return;
        }
  

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            setSuccessMessage(true);

        })
        .catch(error => {
            console.log("Error", error);
            setErrorMassage(error.message);
            setSuccessMessage(false)
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
      {
        successMessage && <p className="text-green-500">Account sign in successful!</p>
      }
    </div>
  )
}

export default SignUp