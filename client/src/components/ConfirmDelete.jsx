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
import { useShowDeleteModal } from "../store/store";
import { useState } from "preact/hooks";

export const ConfirmDelete = () => {
  const set = useShowDeleteModal((state) => state);
  const [pin, setPin] = useState("");
  const toast = useToast();
  const isOpen = set.show;
  function onClose() {
    set.setUnConfirm();
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
              onComplete={(e) => {
                setPin(e);
              }}
              onChange={(e) => {
                if (isNaN(Number(e))) {
                  toast({
                    title: "Invalid Character",
                    description: "Input is not a Number",
                    isClosable: true,
                    status: "error",
                    duration: 3000,
                  });
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
            <p>{pin}</p>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
