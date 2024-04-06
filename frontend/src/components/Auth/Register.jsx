import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    try {
      if (name === "" || email === "" || password === "") {
        Swal.fire({
          title: "Register",
          text: "Please fill all fields",
          icon: "error",
          showConfirmButton: true,
          timer: 1000,
        });
        return;
      }
      Swal.fire({
        title: "Register",
        text: "Please wait...",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      const API_URL = process.env.REACT_APP_API_URL;
      const register = await axios.post(`${API_URL}/register`, {
        nama_lengkap: name,
        email,
        password,
        role: "user",
      });
      Swal.close();
      if (register.status === 201) {
        Swal.fire({
          title: "Register",
          text: "Register berhasil",
          icon: "success",
          showConfirmButton: true,
          timer: 1000,
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Register",
        text: "Register gagal",
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
            Register
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Nama Lengkap"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Register
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="/login"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign in
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
