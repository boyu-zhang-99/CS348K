import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Upload from "./upload";

import "./config";
import { useNavigate } from "react-router-dom";
export default function BasicCard() {
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  const fetchData = async () => {
    const url = new URL("/posts/", global.config.ip);
    try {
      const response = await fetch(url.href, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa("bzhang99:CS348K_2023!")}`,
        },
      });
      const jsonString = await response.text();
      setData(JSON.parse(jsonString).results);
      setChange(false);
    } catch (error) {
      console.error(error);
      return;
    }
  };
  useEffect(() => {
    fetchData();
  }, [change]);
  const deleteVideo = async (title) => {
    let url = global.config.ip + "/posts/" + title;
    await axios.delete(url, {
      auth: {
        username: "bzhang99",
        password: "CS348K_2023!",
      },
    });
    setChange(true);
  };

  const triggernerf = (file,title) => {
    let url = global.config.ip + "/trigger/";
    axios.post(url,{
      file: file,
      title: title,
    },{
      auth: {
        username: "bzhang99",
        password: "CS348K_2023!",
      },
    });
  };
  const navigate = useNavigate();
  const getGraphs = (data) => {
    return data ? (
      data.map(({ file, title, dance }) => {
        return (
          <Card sx={{ minHeight: "400px", width: 400 }} key={title}>
            <CardCover>
              <video autoPlay loop muted>
                <source src={file} type="video/mp4" />
              </video>
            </CardCover>
            <CardCover
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0) 300px)",
              }}
            />
            <CardContent sx={{ justifyContent: "flex-end" }}>
              <Typography level="h2" fontSize="lg" textColor="#808080" mb={1}>
                {title}
              </Typography>
              <Button
                variant="solid"
                size="lg"
                onClick={() => {
                  triggernerf(file,title);
                  navigate('/')
                }}
              >
                Create Avatar
              </Button>
              
            </CardContent>
            <CardOverflow>
              <Button
                variant="solid"
                size="lg"
                color="danger"
                onClick={() => {
                  deleteVideo(title);
                }}
              >
                Delete
              </Button>
            </CardOverflow>
          </Card>
        );
      })
    ) : (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  };

  return (
    <Box
      component="ul"
      sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 0, m: 2 }}
    >
      {getGraphs(data)}
      <Card sx={{ minHeight: "400px", width: 400 }} key="submit">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Upload passChildData={setChange}></Upload>
        </Box>
      </Card>
    </Box>
  );
}
