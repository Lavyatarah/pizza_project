import React from 'react';
import Header from '../components/Header';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postEndpoint } from '../auth';
import { Button, Form } from 'react-bootstrap';
import "./Login.css";



function Login() {
  const [fields, setFields] = useState({email: "", password: ""});

     const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    
  useEffect(() => {
        const timer = setTimeout(() => {
          setError("");
        }, 3000);
        return () => clearTimeout(timer);
      }, [error]);

 
    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
        console.log(fields);
  };
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

      try {
          const { email, password} = fields;
            const res = await postEndpoint("login", { email, password });
          const res_Json = JSON.stringify(res.restaurant);
        localStorage.setItem("user", res_Json);
        localStorage.setItem("jwtToken", res.jwtToken);
        const isLoggedIn = localStorage.getItem('jwtToken') !== null;
        if (isLoggedIn) { 
          navigate("/dashboard");
        }
        } catch (err) {
            setError(err.message);
          console.log(err);
          return;
        } finally {
        setLoading(false);
        if (error === "") {
          setFields({ email: "", password: "" });
        }
        }
    };
  return (
    <div className="login">
        <Header />
      <div className="login-restaurants">Login to Restaurant</div>
      {error && <div className="alert alert-danger danger-small">{error}</div>}
      <Form  className="inputstandard" onSubmit={handleSubmit}>
        <Form.Control type="email" placeholder="email" name="email" className="field" required  onChange={handleChange} />
        <Form.Control type="password" placeholder="password" name="password"  className="field" required onChange={handleChange} />
      <Button variant="dark" size="lg" type="submit"  className="field">
        Login
              </Button>
        </Form>
    </div>
  )
}

export default Login;
