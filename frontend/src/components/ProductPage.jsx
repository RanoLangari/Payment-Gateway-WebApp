import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { NavbarWithMegaMenu } from "./Navbar";
import axios from "axios";
const ProductPage = () => {
  const [productImg, setProductImg] = useState({});
  useEffect(() => {
    try {
      const category = "food";
      axios
        .get("https://api.api-ninjas.com/v1/randomimage?category=" + category, {
          headers: {
            "X-Api-Key": process.env.REACT_APP_API_KEY,
            Accept: "image/jpeg",
          },
        })
        .then((response) => {});
    } catch (error) {
      console.log(`error`);
    }
  }, []);

  return (
    <div>
      <NavbarWithMegaMenu />
      <Card className="w-96 mt-10 mx-auto">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={productImg}
            alt="product"
            className="object-cover w-full h-full"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              Apple AirPods
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              $95.00
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            With plenty of talk and listen time, voice-activated Siri access,
            and an available wireless charging case.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductPage;
