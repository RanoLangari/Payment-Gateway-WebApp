import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Login",
        text: "Please wait...",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      const API_URL = process.env.REACT_APP_API_URL;
      const login = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      Swal.close();
      if (login.status === 200) {
        Swal.fire({
          title: "Login",
          text: "Login berhasil",
          icon: "success",
          showConfirmButton: true,
          timer: 1000,
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Login",
        text: "Email atau password salah",
        icon: "error",
        showConfirmButton: true,
        timer: 1000,
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              size="lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="/register"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
