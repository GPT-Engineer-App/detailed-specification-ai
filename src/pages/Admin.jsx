import { useState, useEffect } from "react";
import { Container, VStack, Input, Button, Heading, useToast, Box, Text } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jjfebbwwtcxyhvnkuyrh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiIsImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [demos, setDemos] = useState([]);
  const [eventName, setEventName] = useState("");
  const [demoName, setDemoName] = useState("");
  const [demoDescription, setDemoDescription] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("Events").select("*");
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchDemos = async () => {
      const { data, error } = await supabase.from("Demos").select("*");
      if (error) {
        console.error("Error fetching demos:", error);
      } else {
        setDemos(data);
      }
    };

    fetchDemos();
  }, []);

  const handleCreateEvent = async () => {
    const { error } = await supabase.from("Events").insert([{ name: eventName }]);
    if (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "There was an error creating the event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Event Created",
        description: "The event has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEventName("");
      const { data } = await supabase.from("Events").select("*");
      setEvents(data);
    }
  };

  const handleCreateDemo = async () => {
    const { error } = await supabase.from("Demos").insert([{ event_id: selectedEvent, name: demoName, description: demoDescription }]);
    if (error) {
      console.error("Error creating demo:", error);
      toast({
        title: "Error",
        description: "There was an error creating the demo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Demo Created",
        description: "The demo has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setDemoName("");
      setDemoDescription("");
      const { data } = await supabase.from("Demos").select("*");
      setDemos(data);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Admin Dashboard</Heading>
        <Heading as="h2" size="lg">Create Event</Heading>
        <Input
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          size="lg"
        />
        <Button colorScheme="teal" onClick={handleCreateEvent}>
          Create Event
        </Button>
        <Heading as="h2" size="lg">Create Demo</Heading>
        <Input
          value={demoName}
          onChange={(e) => setDemoName(e.target.value)}
          placeholder="Demo Name"
          size="lg"
        />
        <Input
          value={demoDescription}
          onChange={(e) => setDemoDescription(e.target.value)}
          placeholder="Demo Description"
          size="lg"
        />
        <Input
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          placeholder="Event ID"
          size="lg"
        />
        <Button colorScheme="teal" onClick={handleCreateDemo}>
          Create Demo
        </Button>
        <Heading as="h2" size="lg">Events</Heading>
        {events.map((event) => (
          <Box key={event.id} p={5} shadow="md" borderWidth="1px" width="100%">
            <Text>{event.name}</Text>
          </Box>
        ))}
        <Heading as="h2" size="lg">Demos</Heading>
        {demos.map((demo) => (
          <Box key={demo.id} p={5} shadow="md" borderWidth="1px" width="100%">
            <Text>{demo.name}</Text>
            <Text>{demo.description}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Admin;