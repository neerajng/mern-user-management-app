import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import Layout from "../../components/Layout";


// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;   


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // const v1 = USER_REGEX.test(name)
    // const v2 = PWD_REGEX.test(password)
    // if(!v1 || !v2){
    //   toast.error('validation fails')
    //   return
    // }
    
    if (password !== password2) {
      toast.error("Passwords do not match");
    } 

 
    else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Layout title='Register'>
      <section className="heading">
        {/* <p ref={errRef} className={errMsg? 'errmsg' : 'offscreen'}>{errMsg}</p> */}
        <h1 className="text-info fs-1 fw-bolder"> 
          REGISTER
        </h1>
        <p className="text-secondary">Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control rounded-pill ps-4"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control rounded-pill ps-4"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control rounded-pill ps-4"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control rounded-pill ps-4"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>

          <div className="form-group mt-3">
            <button type="submit" className="button button-block bg-info border-info rounded-pill ps-4" >
            {/* disabled={!validName || !validPwd || !validMatch ? true: false} */}
              Submit
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}

export default Register;
