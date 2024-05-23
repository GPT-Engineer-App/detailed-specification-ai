import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, VStack, Textarea, Button, Heading, useToast } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jjfebbwwtcxyhvnkuyrh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiIsImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Feedback = () => {
  const { demoId } = useParams();
  const [feedback, setFeedback] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    const { error } = await supabase.from("Feedback").insert([{ demo_id: demoId, feedback }]);
    if (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your feedback.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFeedback("");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Submit Feedback</Heading>
        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          size="lg"
        />
        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </Container>
  );
};

export default Feedback;