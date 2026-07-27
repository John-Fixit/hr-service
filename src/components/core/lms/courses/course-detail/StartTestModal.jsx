import { Modal } from "antd";

const TestConfirmationModal = ({ modalOpen, setModalOpen }) => {
  return (
    <>
      <Modal
        centered
        open={modalOpen}
        onOk={() => modalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default TestConfirmationModal;
