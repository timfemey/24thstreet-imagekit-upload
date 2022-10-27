import {
  FormControl,
  InputGroup,
  Input,
  Container,
  useToast,
  Button,
} from "@chakra-ui/react";

export const Upload = () => {
  const toast = useToast();
  return (
    <>
      <Container
        marginTop="50"
        padding={10}
        centerContent
        width="90%"
        maxWidth="517px"
        marginX="auto"
      >
        <FormControl
          as={"form"}
          method="POST"
          action={"https://street-team-image-upload.herokuapp.com/file"}
          encType={"multipart/form-data"}
        >
          <InputGroup>
            <Input
              onFocus={() => {
                toast({
                  title: "Best Practice",
                  description:
                    "Ensure to Enhance Image using https://bigjpg.com/ before Uploading",
                  isClosable: true,
                  duration: 5000,
                  status: "info",
                });
              }}
              border={"none"}
              type={"file"}
              name="file"
              accept="image/*"
              placeholder="Choose Image"
              mb={5}
            />
          </InputGroup>
          <Input name="name" placeholder="Name" mb={5} />
          <Input name="pin" placeholder="PIN" mb={5} />
          <InputGroup>
            <Input
              type={"submit"}
              value="Upload"
              bg="teal"
              color="white"
              fontWeight={700}
            />
          </InputGroup>
        </FormControl>
      </Container>
    </>
  );
};
