import { Drawer } from "antd";
import CourseDetail from "../courses/course-detail/CourseDetail";
import { useCourseStore } from "../../../../hooks/useCourseStore";

const CourseDetailDrawer = () => {
  const { isOpen, closeCourseDrawer } = useCourseStore();
  return (
    <>
      <Drawer width={1500} open={isOpen} onClose={closeCourseDrawer}>
        <CourseDetail />
      </Drawer>
    </>
  );
};

export default CourseDetailDrawer;
