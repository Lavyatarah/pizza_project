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

      const history = useHistory();
 
    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
        console.log(fields);
  };
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {
            const res = await postEndpoint("login", { fields });
          console.log(res);
          localStorage.setItem("user", res.restaurantName);
          localStorage.setItem("jwtToken", res.jwtToken);
            setFields({email: "", password: ""});
        } catch (err) {
            setError(err.message);
            console.log(err);
        } finally {
          setLoading(false);
          useHistory.push("/dashboard");
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
