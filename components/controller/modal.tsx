import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Link,
} from "@nextui-org/react";
import {
  Folder,
  FolderPen,
  FolderPenIcon,
  ListCheck,
  Tags,
  ScanBarcode,
} from "lucide-react";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <label onClick={onOpen} color="primary">
        <ListCheck />
      </label>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create List
              </ModalHeader>
              <ModalBody>
                <Input
                  endContent={<FolderPenIcon />}
                  autoFocus
                  label="List | Name"
                  placeholder="Enter the name of the list"
                  variant="bordered"
                />
                <Input
                  endContent={<ScanBarcode />}
                  label="Description"
                  placeholder="Enter a description for the list"
                  variant="bordered"
                />
                <Input
                  endContent={<Tags />}
                  label="Tags (optional)"
                  placeholder="Add tags separated by commas"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="success" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="success" onPress={onClose}>
                  Create List
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
