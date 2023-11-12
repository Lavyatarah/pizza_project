import React from 'react';
import Header from '../components/Header';
import { useState } from "react";
import { postEndpoint } from '../auth';

import {
  Button,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
} from "@mui/material";
import "./Login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await postEndpoint("auth/login", { email, password });
      console.log(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="login">
        <form onSubmit={handleSubmit}>
          <TextField
            className="inputfilled2"
            color="primary"
            label="Email"
            size="medium"
            placeholder="eg: hi@restaurant.com"
            required={true}
            sx={{ width: 220 }}
            variant="filled"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            className="inputfilled4"
            color="primary"
            label="Password"
            size="medium"
            required={true}
            sx={{ width: 220 }}
            variant="filled"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPasswordClick}
                    aria-label="toggle password visibility"
                  >
                    <Icon>{showPassword ? "visibility_off" : "visibility"}</Icon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            className="buttoncontained-text"
            color="primary"
            size="medium"
            variant="contained"
            type="submit"
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
