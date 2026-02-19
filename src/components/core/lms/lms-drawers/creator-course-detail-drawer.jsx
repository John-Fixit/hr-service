import { Drawer } from "antd";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import CreatorCourseDetail from "../courses/creator-course-detail/CreatorCourseDetail";

const CreatorCourseDetailDrawer = () => {
  const { isOpen, closeCourseDrawer } = useCourseStore();
  return (
    <>
      <Drawer width={1500} open={isOpen} onClose={closeCourseDrawer}>
        <CreatorCourseDetail />
      </Drawer>
    </>
  );
};

export default CreatorCourseDetailDrawer;
