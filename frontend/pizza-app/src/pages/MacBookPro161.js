import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import "./MacBookPro161.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { postEndpoint } from "../auth";

const MacBookPro161 = () => {
    const [fields, setFields] = useState({name: "", email: "", phoneNumber: "", location: "", password: "", confirmPassword: ""});


    const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  
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
        if (fields.password !== fields.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

      try {
        const { name, email, phoneNumber, location, password, confirmPassword } = fields;
        
          const res = await postEndpoint("register", { name, email, phoneNumber, location, password });
            console.log(res);
            setFields({name: "", email: "", phoneNumber: "", location: "", password: "", confirmPassword: ""});
        } catch (err) {
            setError(err.message);
        console.log(err);
        return;
        } finally {
          setLoading(false);
        setError("");
        useHistory.push("/login");
        }
    };
    
  return (
    <div className="macbook-pro-16-1">
        <Header />
      <div className="register-restaurants">Register Restaurant</div>
      {error && <div className="alert alert-danger danger-small">{error}</div>}
      <Form  className="inputstandard" onSubmit={handleSubmit}>
              <Form.Control type="text" placeholder="Restaurant's name" name="name" className="field" required onChange={handleChange} />
        

  
        <Form.Control type="email" placeholder="email" name="email" className="field" required  onChange={handleChange} />
        


        <Form.Control type="tel" placeholder="phone number" name="phoneNumber" className="field"  required onChange={handleChange} />

        <Form.Control type="text" placeholder="location" name="location" className="field" required onChange={handleChange} />
        <Form.Control type="password" placeholder="password" name="password"  className="field" required onChange={handleChange} />
        <Form.Control type="password" placeholder="confirm password" name="confirmPassword" className="field"  required onChange={handleChange} />
      <Button variant="dark" size="lg" type="submit"  className="field">
        Register
        </Button>
        
        </Form>
    </div>
  );
};

export default MacBookPro161;
