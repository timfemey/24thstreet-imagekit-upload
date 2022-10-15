import { Container, Box, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <>
      <Container mt="5rem" centerContent w="90%" mx="auto" maxW="50rem">
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.9s"
          emptyColor="gray.200"
          color="teal"
        />
      </Container>
    </>
  );
}
