import { Container, Wrap } from "@chakra-ui/react";

import { useState } from "preact/hooks";
import { ImageComp } from "../../components/Image";

//@ts-ignore
import { ConfirmDelete } from "../../components/ConfirmDelete";

export const Images = () => {
  const [data, setData] = useState([
    1, 2, 3, 4, 13, 23, 30, 10, 12, 19, 18, 15, 16, 7,
  ]);
  return (
    <>
      {/* direction={["column", "row"]} align="baseline" maxWidth={"100%"} */}
      <Container marginTop="36" centerContent>
        <Wrap>
          {data.map((val, i) => {
            return (
              <ImageComp
                src="https://bit.ly/dan-abramov"
                i={i}
                alt="Image Alt"
              />
            );
          })}{" "}
        </Wrap>
        <ConfirmDelete />
      </Container>
    </>
  );
};
