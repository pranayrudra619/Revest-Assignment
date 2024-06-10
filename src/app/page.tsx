"use client";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import {
  Box,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Logo from "../../public/Images/logo.png";
import Apple from "../../public/Images/apple.png";
import Google from "../../public/Images/google.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { productJson } from "./data";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  paintBoxUrl: string;
  description: string;
  specialOfferPercentage: string | number;
  exclusive: boolean;
  size: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 0,
      name: "",
      price: 0,
      imageUrl: "",
      paintBoxUrl: "",
      description: "",
      specialOfferPercentage: "" || 0,
      exclusive: true,
      size: "",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortedField, setSortedField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    setProducts(productJson);
    setFilteredProducts(productJson);
  }, []);

  const handleSort = (field) => {

    if (field === sortedField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortedField(field);
      setSortDirection("asc");
    }
  };


  const sortProducts = (products) => {
    if (sortedField === "") return products;

    const sorted = [...products];


    sorted.sort((a, b) => {
      const aValue = a[sortedField];
      const bValue = b[sortedField];

      if (sortDirection === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return sorted;
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };


  const handleSearchClick = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const sortedAndFilteredProducts = sortProducts(filteredProducts);

  return (
    <>
      <Box sx={{ padding: "20px 50px", backgroundColor: "#ffffff" }}>
        <Grid container spacing={2} sx={{ padding: "20px" }}>
          <Grid item xs={6}>
            <Typography>
              <IconButton>
                <ShoppingCartIcon />
              </IconButton>
              Cart
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">

            <Image src={Logo} alt="logo" height={50} width={150} />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2} sx={{ padding: "20px" }}>
          <Grid item xs={6}>
            <Typography variant="h5">
              All Paints{" "}
              <span style={{ fontSize: "0.875rem", color: "gray" }}>
                ({sortedAndFilteredProducts.length} products)
              </span>
            </Typography>
            <Grid sx={{ pt: "20px" }}>
              <TextField
                id="outlined-size-small"
                placeholder="Search by name"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          backgroundColor: "green",
                          borderRadius: 0,
                          color: "#FFFFFF",
                        }}
                        onClick={() => handleSearchClick()}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { paddingRight: 0 },
                }}
                sx={{
                  "& .MuiButtonBase-root-MuiIconButton-root": {
                    borderRadius: "0px",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="flex-end"
            alignItems="end"
          >
            <Box display="flex" alignItems="right">
              <Typography variant="h6" sx={{ marginRight: 1 }} gutterBottom>
                Sort by

                <IconButton onClick={() => handleSort("price")}>
                  {sortedField === "price" && sortDirection === "asc" ? (
                    <ArrowUpwardIcon style={{ color: "green" }} />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                </IconButton>
                <IconButton onClick={() => handleSort("price")}>
                  {sortedField === "price" && sortDirection === "desc" ? (
                    <ArrowDownwardIcon style={{ color: "green" }} />
                  ) : (
                    <ArrowDownwardIcon />
                  )}
                </IconButton>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ pt: "20px" }}>
          {sortedAndFilteredProducts.map((product: any) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card sx={{ position: "relative", minHeight: 300 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    position: "absolute",
                    top: 8,
                    left: 8,
                    right: 8,
                    zIndex: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "yellow",
                      padding: "2px 8px",
                      borderRadius: "15px 0px",
                    }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {product.specialOfferPercentage}% OFF
                    </Typography>
                  </Box>
                  {product.exclusive && (
                    <Box
                      sx={{
                        backgroundColor: "red",
                        padding: "2px 8px",
                        borderRadius: "15px 0px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.primary"
                        style={{ color: "white" }}
                      >
                        Exclusive
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    height: 220,

                    width: 400,
                    marginBottom: 2,
                  }}
                >
                  <Image
                    src={product.imageUrl}
                    alt="background"

                    width="500"
                    height="220"

                  />
                  <Image
                    src={product.paintBoxUrl}
                    alt={product.name}
                    layout="intrinsic"
                    width={100}
                    height={100}
                    style={{
                      position: "absolute",
                      bottom: -60,
                      right: 50,
                      borderRadius: "8px",
                    }}
                  />

                </Box>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 250,
                    right: 8,
                    color: "green",
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ pt: "20px" }}
                  >
                    {product.description}
                  </Typography>
                  <Grid container spacing={2} sx={{ pt: "20px" }}>
                    <Grid item xs={7}>
                      <Typography variant="h6" component="div">
                        {product.price} SAR{" "}
                        <span style={{ fontSize: "0.875rem", color: "gray" }}>
                          (Incl. VAT)
                        </span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size {product.size}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "green" }}
                        textAlign="right"
                      >
                        Visualizer
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "green" }}
                        textAlign="right"
                      >
                        View Product
                      </Typography>
                    </Grid>


                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: "#F7F8FB" }}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{ display: "flex", padding: "10px" }}
          justifyContent="space-around"
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Need help?
            </Typography>
            <Typography variant="body2" color="gray">
              You can reach our support team if you need any assistance.
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <EmailIcon color="success" sx={{ marginRight: "10px" }} />
            <Typography variant="body2">help@jazeerapaints.com</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <PhoneIcon color="success" sx={{ marginRight: "10px" }} />
            <Typography variant="body2">9200-000-85</Typography>
          </Box>
        </Grid>
        <Divider />
        <Grid
          container
          spacing={2}
          sx={{ padding: "20px 0px 20px 100px" }}
          justifyContent="space-between"
        >
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Subscribe Newsletter
            </Typography>
            <Typography variant="body2" color="gray">
              Be the first to know about our special offers and the latest home
              design ideas.
            </Typography>
            <Box
              sx={{ display: "flex", marginTop: "10px", alignItems: "center" }}
            >

              <Grid sx={{ pt: "20px" }}>
                <TextField
                  id="outlined-size-small"
                  placeholder="Search by name"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            backgroundColor: "green",
                            borderRadius: 0,
                            color: "#FFFFFF",
                          }}
                        >
                          <Typography variant="body1">Subscribe</Typography>
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: { paddingRight: 0 },
                  }}
                  sx={{
                    "& .MuiButtonBase-root-MuiIconButton-root": {
                      borderRadius: "0px",
                    },
                  }}
                />
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Jazeera Paints
            </Typography>
            <Typography variant="body2" color="gray">
              News
            </Typography>
            <Typography variant="body2" color="gray">
              About Us
            </Typography>
            <Typography variant="body2" color="gray">
              Contact Us
            </Typography>
            <Typography variant="body2" color="gray">
              Academy
            </Typography>
            <Typography variant="body2" color="gray">
              Site Map
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Discover
            </Typography>
            <Typography variant="body2" color="gray">
              Products
            </Typography>
            <Typography variant="body2" color="gray">
              Colors
            </Typography>
            <Typography variant="body2" color="gray">
              Catalogues
            </Typography>
            <Typography variant="body2" color="gray">
              For You Programme
            </Typography>
            <Typography variant="body2" color="gray">
              Shop Products
            </Typography>
            <Typography variant="body2" color="gray">
              Our Stores
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Download app from
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              <Grid>
                <Image src={Apple} alt="Apple Logo" height={36} width={132} />
              </Grid>
              <Grid>
                <Image src={Google} alt="Google logo" height={36} width={132} />
              </Grid>

            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Box>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: "20px" }}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="body2" align="center">
                © Jazeera Paints, 2022
              </Typography>
              <Typography variant="body2" align="center">
                Note: The color that appears on the screen may not be the exact
                color of the paint due to the variance in monitor calibration.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: "20px" }}
          >
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton>
                  <FacebookIcon />
                </IconButton>
                <IconButton>
                  <TwitterIcon />
                </IconButton>
                <IconButton>
                  <LinkedInIcon />
                </IconButton>
                <IconButton>
                  <InstagramIcon />
                </IconButton>
                <IconButton>
                  <YouTubeIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
