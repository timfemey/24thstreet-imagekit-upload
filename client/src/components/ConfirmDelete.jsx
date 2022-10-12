import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import { useShowDeleteModal, useFileId } from "../store/store";
import { useState } from "preact/hooks";

export const ConfirmDelete = () => {
  const set = useShowDeleteModal((state) => state);
  const file = useFileId((state) => state.file);
  const [pin, setPin] = useState("");
  const toast = useToast();
  const isOpen = set.show;
  function onClose() {
    set.setUnConfirm();
  }
  function onFinish() {
    fetch(
      `https://street-team-image-upload.herokuapp.com/file?pin=${pin}&file_id=${file}`,
      { method: "DELETE" }
    )
      .then(async (res) => {
        const ponse = await res.json();
        setPin("");
        onStateCall(ponse);
      })
      .catch(() => {
        toast({
          title: "Server Error",
          status: "error",
          description: "Failed to Delete",
          duration: 4000,
          isClosable: true,
        });
      });
  }

  function onStateCall(delRes) {
    if (delRes.status == true) {
      toast({
        title: "Response",
        status: delRes.message,
        description: "Deleted Successfully",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Response",
        status: "error",
        description: "Failed to Delete",
        duration: 4000,
        isClosable: true,
      });
    }
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter PIN</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PinInput
              type="alphanumeric"
              focusBorderColor="orange.400"
              errorBorderColor="red.500"
              mask={true}
              onChange={(e) => {
                if (isNaN(Number(e))) {
                  toast({
                    title: "Invalid Character",
                    description: "Input is not a Number",
                    isClosable: true,
                    status: "error",
                    duration: 3000,
                  });
                } else {
                  setPin(e);
                }
              }}
            >
              <PinInputField isRequired />
              <PinInputField isRequired />
              <PinInputField isRequired />
              <PinInputField isRequired />
            </PinInput>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="red" onClick={onFinish}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
