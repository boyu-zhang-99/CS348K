import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import "./config";
class Upload extends Component {
  state = {
    title: "",
    content: "",
    file: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("file", this.state.file, this.state.file.name);
    form_data.append("title", this.state.title);
    let url = global.config.ip + "/posts/";
    await axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
        auth: {
          username: "bzhang99",
          password: "CS348K_2023!",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    // const response = await fetch(url, {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Basic ${btoa("bzhang99:Hyhy5920@")}`,
    //         },
    //       });
    // const jsonString = await response.text();
    this.props.passChildData(true);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Title"
            id="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
          <Input
            type="file"
            id="file"
            accept="video/mp4,video/mov"
            onChange={this.handleFileChange}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

export default Upload;
