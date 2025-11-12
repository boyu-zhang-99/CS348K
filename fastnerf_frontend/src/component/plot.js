import { Chart } from "react-google-charts";
import MainHeader from "./mainheader";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import "./config";
const Plot = () => {
  const [chartData, setchartData] = useState([]);

  useEffect(() => {
    function toJson(filepath) {
      return new Promise((resolve, reject) => {
        Papa.parse(filepath, {
          download: true,
          header: true,
          complete(results) {
            resolve(results.data);
          },
          error(err) {
            reject(err);
          },
        });
      });
    }

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
        const results = JSON.parse(jsonString).results;
        let chart_data = [];
        for (const item of results) {
          if (item["metrics"] === "metrics.csv") {
            const csvdata = await toJson(
              `${global.config.ip}/media/${item["title"]}/metrics.csv`
            );
            const loss_data = [["Train Steps", "Train Loss"]];
            for (const item of csvdata) {
              if (item["train/loss"] !== "") {
                loss_data.push([
                  Number(item["step"]),
                  Number(item["train/loss"]),
                ]);
              }
            }
            const test_data = {
              options: {
                chart: {
                  title: "Train Loss --- " + item["title"],
                },
              },
              loss_data: loss_data,
            };
            chart_data.push(test_data);
          }
          
        }
        setchartData(chart_data);
      } catch (error) {
        console.error(error);
        return;
      }
    };
    fetchData();
  }, [chartData.length]);

  return (
    <div>
      <MainHeader></MainHeader>
      {chartData.length > 0 ? (
        chartData.map(({ options, loss_data }) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ m: 5 }}
            key={options.chart.title}
          >
            <Grid>
              <Grid item xs={12}>
                <Typography
                  align="center"
                  level="h1"
                  fontSize="lg"
                  textColor="#000000"
                  mb={1}
                >
                  {options.chart.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Chart
                  chartType="Line"
                  width="800px"
                  height="400px"
                  data={loss_data}
                />
              </Grid>
            </Grid>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default Plot;
