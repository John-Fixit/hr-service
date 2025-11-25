import { useCourseStore } from "../../../../hooks/useCourseStore";
import CbtExamDrawer from "./cbt_test_drawer";
import CourseDetailDrawer from "./course-details-drawer";
import CreateCourseDrawer from "./create-course-drawer";

const LmsDrawers = () => {
  const { drawerName } = useCourseStore();
  return (
    <>
      {drawerName === "create-course" && <CreateCourseDrawer />}
      {drawerName === "course-detail" && <CourseDetailDrawer />}
      {drawerName === "cbt-exam" && <CbtExamDrawer />}
    </>
  );
};

export default LmsDrawers;
