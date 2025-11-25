import { Drawer } from "antd";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import CbtTestView from "../cbt-exam/CbtTestView";

const CbtExamDrawer = () => {
  const { isOpen, closeCourseDrawer } = useCourseStore();
  return (
    <>
      <Drawer
        width={1500}
        open={isOpen}
        onClose={closeCourseDrawer}
        maskClosable={false}
        closable={false}
        // className="p-0 m-0"
        // title={null}
      >
        <CbtTestView />
      </Drawer>
    </>
  );
};

export default CbtExamDrawer;
