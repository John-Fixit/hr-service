import { useCourseStore } from "../../../../hooks/useCourseStore";
import CbtExamDrawer from "./cbt_test_drawer";
import CourseDetailDrawer from "./course-details-drawer";
import CreateCourseDrawer from "./create-course-drawer";
import CreatorCourseDetailDrawer from "./creator-course-detail-drawer";
import AdminCreatorCoursesDrawer from "./admin-creator-courses-drawer";

const LmsDrawers = () => {
  const { drawerName } = useCourseStore();
  return (
    <>
      {drawerName === "create-course" && <CreateCourseDrawer />}
      {drawerName === "course-detail" && <CourseDetailDrawer />}
      {drawerName === "creator-course-detail" && <CreatorCourseDetailDrawer />}
      {drawerName === "creator-courses-list" && <AdminCreatorCoursesDrawer />}
      {drawerName === "cbt-exam" && <CbtExamDrawer />}
    </>
  );
};

export default LmsDrawers;
