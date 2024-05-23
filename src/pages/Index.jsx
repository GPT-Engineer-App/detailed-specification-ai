import { useEffect, useState } from "react";
import { Container, VStack, Text, Box, Button, Heading, Spinner } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

const supabaseUrl = "https://jjfebbwwtcxyhvnkuyrh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Index = () => {
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemos = async () => {
      const { data, error } = await supabase.from("Demos").select("*");
      if (error) {
        console.error("Error fetching demos:", error);
      } else {
        setDemos(data);
      }
      setLoading(false);
    };

    fetchDemos();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Demo Feedback Tool</Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          demos.map((demo) => (
            <Box key={demo.id} p={5} shadow="md" borderWidth="1px" width="100%">
              <Heading fontSize="xl">{demo.name}</Heading>
              <Text mt={4}>{demo.description}</Text>
              <Button mt={4} colorScheme="teal" as={Link} to={`/feedback/${demo.id}`}>
                Give Feedback
              </Button>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;