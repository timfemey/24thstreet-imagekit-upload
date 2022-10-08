import {
  FormControl,
  InputGroup,
  Input,
  Container,
  useToast,
} from "@chakra-ui/react";

export const Upload = () => {
  const toast = useToast();
  return (
    <>
      <Container marginTop="80" centerContent>
        <FormControl as={"form"}>
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
              placeholder="Choose Image"
            />
          </InputGroup>
        </FormControl>
      </Container>
    </>
  );
};
