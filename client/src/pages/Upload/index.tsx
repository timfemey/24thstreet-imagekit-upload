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
      <Container marginTop="80" centerContent>
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
            />
          </InputGroup>
          <Input name="name" placeholder="Name" />
          <Input name="pin" placeholder="PIN" />
          <InputGroup>
            <Input type={"submit"} value="Upload" />
          </InputGroup>
        </FormControl>
      </Container>
    </>
  );
};
