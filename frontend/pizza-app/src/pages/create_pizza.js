import React from 'react';
import Header from '../components/Header';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAuthenticatedEndpoint } from '../auth';
import { Button, Form } from 'react-bootstrap';
import "./create_pizza.css";




function CreatePizza() {
  const [fields, setFields] = useState({name: "", price: "", image: ""});

     const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 
    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
        console.log(fields);
  };
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

      try {
          const { name, price, image} = fields;
            const res = await postAuthenticatedEndpoint("create_pizza", { name, price, image });

        const isLoggedIn = localStorage.getItem('jwtToken') !== null;
        if (isLoggedIn && localStorage.getItem("user") !== null && res.error === false) { 
          navigate("/dashboard");
        }
        } catch (err) {
            setError(err.message);
          console.log(err);
          return;
        } finally {
        setLoading(false);
        if (error === "") {
          setFields({ name: "", price: "", image: "" });
        }
        }
    };
  return (
    <div className="create-pizza">
        <Header />
      <div className="create-for-restaurants">Add pizza item</div>
      <Form  className="input" onSubmit={handleSubmit}>
        <Form.Control type="text" placeholder="Pizza's name" name="name" className="fields" required  onChange={handleChange} />
              <Form.Control type="number" placeholder="price" name="price" className="fields" required onChange={handleChange} />
                <Form.Control type="file" placeholder="image" name="image" className="fields"  onChange={handleChange} />
      <Button variant="dark" size="lg" type="submit"  className="fields">
        Create
              </Button>
        </Form>
    </div>
  )
}

export default CreatePizza;
