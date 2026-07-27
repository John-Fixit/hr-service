/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Button } from "@nextui-org/react";

const ConfirmDeleteModal = ({
  isOpen,
  handleOk,
  handleCancel,
  subject,
  loading,
}) => {
  return (
    <Modal
      maskClosable={false}
      title={
        <BsExclamationCircleFill size={15} className="text-red-600 mb-2" />
      }
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okType="primary"
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={handleCancel} variant="faded" size="sm">
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleOk}
            isLoading={loading}
            className="bg-red-400 text-white"
            size="sm"
          >
            Ok
          </Button>
        </div>
      }
    >
      <p className="mt-6 text-xl">{subject}</p>
    </Modal>
  );
};

export default ConfirmDeleteModal;
