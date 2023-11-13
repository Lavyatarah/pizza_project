import React from 'react';
import Header from '../components/Header';
import { useState, useHistory } from "react";
import { postEndpoint } from '../auth';
import { Button, Form } from 'react-bootstrap';
import "./Login.css";



function Login() {
  const [fields, setFields] = useState({email: "", password: ""});

     const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

 
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
          console.log(res);
          localStorage.setItem("user", res.restaurant.name);
          localStorage.setItem("jwtToken", res.jwtToken);
            setFields({email: "", password: ""});
        } catch (err) {
            setError(err.message);
          console.log(err);
          return;
        } finally {
          setLoading(false);
        }
    };
  return (
    <div className="login">
        <Header />
      <div className="login-restaurants">Login to Restaurant</div>
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
