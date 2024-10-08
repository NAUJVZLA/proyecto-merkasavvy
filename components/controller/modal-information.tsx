import InformationPage from "@/app/information/page";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
export default function ModalInformation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
        Information
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <InformationPage />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="foreground"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  className="bg-[#3daa22] shadow-lg shadow-indigo-500/20"
                  onPress={onClose}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
