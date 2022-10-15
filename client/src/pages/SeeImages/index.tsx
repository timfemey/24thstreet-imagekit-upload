import { Container, Box } from "@chakra-ui/react";

import { useState, useEffect } from "preact/hooks";
import { ImageComp } from "../../components/Image";

//@ts-ignore
import { ConfirmDelete } from "../../components/ConfirmDelete";

export const Images = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const aborter = new AbortController();
    fetch("https://street-team-image-upload.herokuapp.com/file", {
      method: "GET",
      signal: aborter.signal,
    }).then(async (res) => {
      const ponse = (await res.json()).data.data;

      setData([...ponse]);
    });
    return () => {
      aborter.abort();
    };
  }, []);

  return (
    <>
      {/* direction={["column", "row"]} align="baseline" maxWidth={"100%"} */}
      <Container
        mt="5rem"
        centerContent
        border="1px solid black"
        w="90%"
        mx="auto"
        maxW="50rem"
      >
        {data.map((val, i) => {
          return (
            <>
              <Box paddingX={5} mb="3rem">
                <ImageComp
                  src={val.url}
                  fileid={val.fileId}
                  name={val.name}
                  i={i}
                  alt={val.name}
                />
              </Box>
            </>
          );
        })}{" "}
        <ConfirmDelete />
      </Container>
    </>
  );
};
