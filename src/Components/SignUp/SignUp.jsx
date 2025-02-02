import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [errorMassage, setErrorMassage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  const handleSignUpForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.checkBox.checked;
    console.log(email, password, terms);

    setErrorMassage("");
    setSuccessMessage(false);

    if(!terms){
        setErrorMassage("Please Agree To our terms and conditions");
        return;
    }


    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
      setErrorMassage(
        "password should contain at least 1number, 1uppercase letter, 1 lowercase letter, 1 special character"
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        // verification email section 
        sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("email verification sent");
          setSuccessMessage(true);
        })



      })
      .catch((error) => {
        console.log("Error", error);
        setErrorMassage(error.message);
        setSuccessMessage(false);
      });
  };

  return (
    <div className="card p-12 my-8 mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl text-center font-bold">Register now!</h1>
      <form onSubmit={handleSignUpForm} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered "
            required
          />
          <button
            onClick={() => setshowPassword(!showPassword)}
            className="absolute btn btn-xs  right-2 top-7"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
          <div className="form-control mt-3">
            <label className="label cursor-pointer">
            <input type="checkbox" name="checkBox" className="checkbox" />

              <span className="label-text">Please agree Terms and Conditions</span>
              
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
        <div>
          All ready have account ? <Link to="/login" className="underline text-blue-600">Log in</Link>
        </div>
      </form>
      {errorMassage && <p className="text-red-600"> {errorMassage}</p>}
      {successMessage && (
        <p className="text-green-500">A verification message has been sent to your mail</p>
      )}
    </div>
  );
};

export default SignUp;
