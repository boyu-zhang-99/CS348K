import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/material/CircularProgress";
import "./config";
import moment from 'moment';
//nested data is ok, see accessorKeys in ColumnDef below
// const data = [
//   {
//     input_video: 'boyu.mov',
//     pose_video: 'pose.mp4',
//     mask_video: 'masks.mp4',
//     novel_video: 'novel.mp4',
//     dance_video: 'dance.mp4',
//   },
// ];

const url = global.config.ip + "/media/";
const Maintable = () => {
  //should be memoized or stable
  const [data, setData] = useState([]);
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
    } catch (error) {
      console.error(error);
      return;
    }
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
    
  }, []);
  const columns = useMemo(
    () => [
      {
        accessorKey: "file", //normal accessorKey
        header: "Input Video",
        size: 200,
        Cell: ({ cell, row }) => (
          <>
          {row.original.train_time && "Start Time: "+moment(row.original.train_time).format('LLL')}
          <Card sx={{ minHeight: "400px", width: 300 }} key="test">
          <CardCover>
            <video autoPlay loop muted>
              <source src={cell.getValue()} type="video/mp4" />
            </video>
          </CardCover>
          <CardContent sx={{ justifyContent: "flex-end" }}>
            <Typography level="h2" fontSize="lg" textColor="#808080" mb={1}>
              {row.original.title}
            </Typography>
          </CardContent>
        </Card></>
          
        ),
      },
      {
        accessorKey: "pose", //normal accessorKey
        header: "Pose Video",
        size: 200,
        Cell: ({ cell, row }) => (
          <>
          {row.original.pose_time && "Time Elapsed: " + Math.floor(row.original.pose_time / 60)+"m" + row.original.pose_time % 60+"s"}
          <Card sx={{ minHeight: "400px", width: 300 }} key="test">
          <CardCover>
            {cell.getValue() === "na" ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <video autoPlay loop muted>
                <source
                  src={url + row.original.title + "/" + cell.getValue()}
                  type="video/mp4"
                />
              </video>
            )}
          </CardCover>
        </Card></>
          
        ),
      },
      {
        accessorKey: "mask", //normal accessorKey
        header: "Mask Video",
        size: 200,
        Cell: ({ cell, row }) => (
          <>{row.original.mask_time && "Time Elapsed: " + Math.floor(row.original.mask_time / 60)+"m" + row.original.mask_time % 60+"s"}
          <Card sx={{ minHeight: "400px", width: 300 }} key="test">
            <CardCover>
              {cell.getValue() === "na" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <video autoPlay loop muted>
                  <source
                    src={url + row.original.title + "/" + cell.getValue()}
                    type="video/mp4"
                  />
                </video>
              )}
            </CardCover>
          </Card></>
          
        ),
      },
      {
        accessorKey: "smpl", //normal accessorKey
        header: "SMPL Video",
        size: 200,
        Cell: ({ cell, row }) => (
          <>{row.original.smpl_time && "Time Elapsed: " + Math.floor(row.original.smpl_time / 60)+"m" + row.original.smpl_time % 60+"s"}
          <Card sx={{ minHeight: "400px", width: 300 }} key="test">
            <CardCover>
              {cell.getValue() === "na" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <video autoPlay loop muted>
                  <source
                    src={url + row.original.title + "/" + cell.getValue()}
                    type="video/mp4"
                  />
                </video>
              )}
            </CardCover>
          </Card></>
          
        ),
      },
      {
        accessorKey: "novel", //normal accessorKey
        header: "Novel Video",
        size: 200,
        Cell: ({ cell, row }) => (
          <>{row.original.novel_time && "Time Elapsed: " + Math.floor(row.original.novel_time / 60)+"m" + row.original.novel_time % 60+"s"}
          <Card sx={{minHeight: "400px", width: 300 }} key="test">
            <CardCover>
              {cell.getValue() === "na" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <video autoPlay loop muted>
                  <source
                    src={url + row.original.title + "/" + cell.getValue()}
                    type="video/mp4"
                  />
                </video>
              )}
            </CardCover>
          </Card>
          </>
        ),
      },
      {
        accessorKey: "dance", //normal accessorKey
        header: "Dance Video",
        size: 200,
        Cell: ({ cell, row }) => (
          <>{row.original.dance_time && "Time Elapsed: " + Math.floor(row.original.dance_time / 60)+"m" + row.original.dance_time % 60+"s"}
          <Card sx={{ minHeight: "400px", width: 300 }} key="test">
            <CardCover>
              {cell.getValue() === "na" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <video autoPlay loop muted>
                  <source
                    src={url + row.original.title + "/" + cell.getValue()}
                    type="video/mp4"
                  />
                </video>
              )}
            </CardCover>
          </Card>
          </>
        ),
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnActions={false}
      enableColumnFilters={false}
      enablePagination={false}
      enableSorting={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
    />
  );
};

export default Maintable;
