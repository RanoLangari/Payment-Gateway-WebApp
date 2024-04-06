import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { NavbarWithMegaMenu } from "./Navbar";
import axios from "axios";
const ProductPage = () => {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchBarang = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const fetchBarang = await axios.get(`${API_URL}/barang`);
      if (fetchBarang.status === 200) {
        setBarang(fetchBarang.data.data);
        setLoading(true);
      }
    } catch (error) {
      console.log(`error`);
    }
  };
  useEffect(() => {
    fetchBarang();
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const Client_Key = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", Client_Key);
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const CheckOut = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const API_URL = process.env.REACT_APP_API_URL;
      const getUser = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (getUser.status === 200) {
        const data = {
          nama: getUser.data.data.nama_lengkap,
          email: getUser.data.data.email,
          total_harga: e.target.total_harga.value,
        };
        const createPesanan = await axios.post(`${API_URL}/pesanan`, data);
        if (createPesanan.status === 200) {
          const snap = window.snap;
          snap.pay(createPesanan.data.token, {
            onSuccess: function (result) {
              console.log("success");
            },
            onPending: function (result) {
              console.log("pending");
            },
            onError: function (result) {
              console.log("error");
            },
            onClose: function () {
              console.log("close");
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const BarangItem = ({ barang }) => {
    return (
      <Card className="w-96 mt-10 mx-auto">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={barang.image_url}
            alt="product"
            className="object-cover w-full h-full"
          />
        </CardHeader>
        <form onSubmit={CheckOut}>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {barang.nama}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                Rp. {barang.harga}
              </Typography>
              <input type="hidden" name="total_harga" value={barang.harga} />
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
              type="submit"
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              Pesan Sekarang
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  };

  return !loading ? (
    <div className="flex items-center justify-center h-screen">
      <Spinner color="blue" />
    </div>
  ) : (
    <div>
      <NavbarWithMegaMenu />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {barang.map((barang) => (
          <BarangItem barang={barang} key={barang.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
