import { useCourseStore } from "../../../../hooks/useCourseStore";
import CbtExamDrawer from "./cbt_test_drawer";
import CourseDetailDrawer from "./course-details-drawer";
import CreateCourseDrawer from "./create-course-drawer";
import CreatorCourseDetailDrawer from "./creator-course-detail-drawer";
import AdminCreatorCoursesDrawer from "./admin-creator-courses-drawer";
import { useEffect } from "react";
import useQuizAttemptStore from "../../../../hooks/useQuizAttemptStore";

const LmsDrawers = () => {
  const { drawerName, isOpen, openCourseDrawer } = useCourseStore();
  const activeAttempt = useQuizAttemptStore((state) => state.getActiveAttempt());

  useEffect(() => {
    if (!activeAttempt || isOpen) return;
    if (activeAttempt?.isSubmitted) return;
    openCourseDrawer({
      drawerName: "cbt-exam",
      quizData: activeAttempt?.quizData || [],
      lesson: activeAttempt?.lesson || null,
      quizScope: activeAttempt?.quizScope || "lesson",
      restoreAttemptKey: activeAttempt?.attemptKey,
    });
  }, [activeAttempt, isOpen, openCourseDrawer]);

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
