import { Image, CircularProgress, Center, useToast } from "@chakra-ui/react";
import { ReactElement } from "react";
import { AiOutlineDelete, AiOutlineLink } from "react-icons/ai";
import { useFileId, useShowDeleteModal } from "../store/store";

interface Props {
  src: string;
  i: number;
  alt: string;
  fileid: string;
  name: string;
}

export const ImageComp = (props: Props) => {
  const { src, i, alt, fileid } = props;

  const set = useShowDeleteModal((state) => state);
  const file = useFileId((state) => state);
  const toast = useToast();
  function showConfirmDeleteModal(e: any) {
    file.setId(e.currentTarget.className);
    set.setConfirm();
  }

  async function copyLink(url: string) {
    window.navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          duration: 3000,
          title: "Image URL",
          description: "Link Copied Sucessfully!",
          isClosable: true,
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          duration: 4000,
          title: "Image URL",
          description: `Failed to copy Image link \n ${error}`,
          status: "error",
          isClosable: true,
        });
      });
  }

  return (
    <>
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

        <h2
          style={{ fontSize: "2rem" }}
          className={fileid}
          onClick={showConfirmDeleteModal}
        >
          {" "}
          <AiOutlineDelete />
        </h2>
        <h2
          style={{ fontSize: "2rem" }}
          className={fileid}
          onClick={() => copyLink(src)}
        >
          {" "}
          <AiOutlineLink />
        </h2>
      </Center>
    </>
  );
};
