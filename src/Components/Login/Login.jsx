import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(false)
  const [success, setSuccess] = useState(false)
  const emailRef = useRef()



  const handleLogin = (e)=> {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage(false);
    setSuccess(false);

    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      console.log(result.user);
      if(!result.user.emailVerified){
        setErrorMessage(true)
      }
      else{
        setSuccess(true);
      }
    })
    .catch(error => {
      console.log("Error", error.message);
      setErrorMessage(error.message);
    })
  }

  const handleForgetPass = () => {

    const email = emailRef.current.value;

    if(!email){
      alert("please enter the email")
    }
    else{
      sendPasswordResetEmail(auth, email)
      .then(()=> {
        alert("reset email pass has been sent to your inbox")
      })
      .catch((error)=> {
        console.log('ERROR',error)
      })
    }
    
    
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" ref={emailRef} name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" onClick={handleForgetPass} className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        {
          errorMessage && <p className="text-red-500">Login failed</p>
        }
        {
          success && <p className="text-green-600">Login success</p>
        }
      <div>
        For new account <Link className="underline text-blue-600" to="/signUp">Sign up</Link>
      </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default Login