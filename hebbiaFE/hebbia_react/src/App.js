import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function App() {
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // function getData() {
  //   axios({
  //     method: "GET",
  //     url: "/test",
  //   })
  //     .then((response) => {
  //       const res = response.data;
  //       setResponse(res.search);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       }
  //     });
  // }

  const onSubmit = handleSubmit((data) => {
    console.log(data, "data");
    console.log(data, "data");
    const { name, content } = data;
    axios
      .post("/upload", { name, content })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  });

  const onSearch = handleSubmit((data) => {
    axios
      .post("/test", { search: data.search })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          console.log(response.data, "DATA");
          setResponse(response.data.search);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>The best result is: {response}</p>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">File Name:</label>
          <input type="text" name="name" {...register("name")} />
          <label htmlFor="content">Content:</label>
          <input type="textArea" name="content" {...register("content")} />
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={onSearch}>
          <label htmlFor="search">Search sentence:</label>
          <input type="textArea" name="search" {...register("search")} />
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
