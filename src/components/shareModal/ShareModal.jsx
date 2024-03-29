import { Modal } from "@mantine/core";

import PostShare from "../postShare/PostShare";

function ShareModal({ modalOpened, setModalOpened }) {
  return (
    <>
       <Modal
        className="custom-modal" 
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        closeButtonProps={{
          style: {
            width: "30px",
            height: "30px",
          },
        }}
      >
        
      <PostShare/>
        
      </Modal>
    </>
  );
}
export default ShareModal;
