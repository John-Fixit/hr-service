import { useCourseStore } from "../../../../hooks/useCourseStore";
import CourseDetailDrawer from "./course-details-drawer";
import CreateCourseDrawer from "./create-course-drawer";

const LmsDrawers = () => {
  const { drawerName } = useCourseStore();
  return (
    <>
      {drawerName === "create-course" && <CreateCourseDrawer />}
      {drawerName === "course-detail" && <CourseDetailDrawer />}
    </>
  );
};

export default LmsDrawers;
