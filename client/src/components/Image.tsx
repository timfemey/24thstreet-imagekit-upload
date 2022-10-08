import { Image, CircularProgress, WrapItem, Center } from "@chakra-ui/react";
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai";
import { ReactElement } from "react";
import { useShowDeleteModal } from "../store/store";

interface Props {
  src: string;
  i: number;
  alt: string;
}

export const ImageComp = (props: Props) => {
  const { src, i, alt } = props;

  const set = useShowDeleteModal((state) => state);
  function showConfirmDeleteModal() {
    set.setConfirm();
  }

  return (
    <>
      <WrapItem>
        <Center>
          <Image
            key={i}
            loading={i > 3 ? "lazy" : "eager"}
            fallback={
              (
                <CircularProgress isIndeterminate color="orange.300" />
              ) as ReactElement<any>
            }
            boxSize="min"
            objectFit="contain"
            src={src}
            alt={alt}
          />

          <h2 style={{ fontSize: "2rem" }}>
            <AiOutlineDownload />
          </h2>
          <h2 style={{ fontSize: "2rem" }} onClick={showConfirmDeleteModal}>
            {" "}
            <AiOutlineDelete />
          </h2>
        </Center>
      </WrapItem>
    </>
  );
};
