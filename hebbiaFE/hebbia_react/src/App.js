import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Input,
  Box,
  Button,
  Container,
  Textarea,
  Text,
  Center,
  Divider,
} from "@chakra-ui/react";

function App() {
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <ChakraProvider>
      <Center>
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          p="6"
          mt="20"
          bgGradient="linear(to-r, blue.100, blue.200)"
          display="flex"
          flexDirection="column"
        >
          <Box p="6">
            <Text fontSize="1xl" fontWeight="bold">
              Upload a file (as a json array):
            </Text>
            <Box display="flex" alignItems="baseline" pb="6">
              <form onSubmit={onSubmit}>
                <label htmlFor="name">File Name:</label>
                <Input
                  type="text"
                  name="name"
                  {...register("name")}
                  bg="white"
                />
                <label htmlFor="content">Content:</label>
                <Textarea
                  type="textArea"
                  name="content"
                  {...register("content")}
                  lg
                  bg="white"
                />
                <Button type="submit" value="Submit" mt="3">
                  Submit
                </Button>
              </form>
            </Box>
            <Divider />
            <Box pt="6">
              <form onSubmit={onSearch}>
                <label htmlFor="search">Search sentence:</label>
                <Input
                  type="textArea"
                  name="search"
                  {...register("search")}
                  bg="white"
                />
                <Button type="submit" value="Submit" mt="3">
                  Search
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
        <Box
          minW="sm"
          borderWidth="1px"
          borderRadius="lg"
          minH="400"
          p="6"
          mt="20"
          bgGradient="linear(to-r, blue.100, blue.200)"
          display="flex"
          flexDirection="column"
        >
          <Container>
            <Text fontSize="2xl">The best result is: </Text>
            <Container centerContent bg="white" borderRadius="2">
              {response}
            </Container>
          </Container>
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
