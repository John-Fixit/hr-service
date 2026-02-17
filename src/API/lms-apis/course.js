import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LMS_API } from "../../services/AxiosInstance";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const res = await LMS_API.post(`/course/create`, body);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_all_courses"],
      });
    },
  });
};

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ["get_all_courses"],
    queryFn: async () => {
      const res = await LMS_API.get(`/course/get-all-courses`);
      return res?.data?.data;
    },
  });
};
export const useGetStaffCourses = (staffId) => {
  return useQuery({
    queryKey: [`get_staff_course_${staffId}`],
    queryFn: async () => {
      const res = await LMS_API.get(`/course/get-all-courses`); //await LMS_API.get(
      // `/course/get-courses-by-staff-id/${staffId}`
      //);
      return res?.data?.data;
    },
  });
};
export const useGetCourseDetail = (courseID) => {
  return useQuery({
    queryKey: [`get_course_detail_${courseID}`],
    queryFn: async () => {
      const res = await LMS_API.get(`/course/get-courses-by-id/${courseID}`);
      return res?.data?.data;
    },
  });
};
export const useMutateCourseDetail = (staff_id) => {
  return useMutation({
    mutationFn: async (courseID) => {
      const res = await LMS_API.get(`/course/get-courses-by-id/${courseID}/${staff_id}`);
      return res?.data?.data;
    },
  });
};

export const useGetLessonQuiz = (lessonID) => {
  return useQuery({
    queryKey: [`get_lesson_quiz_${lessonID}`],
    queryFn: async () => {
      const res = await LMS_API.get(
        `/course/get-quiz-by-lesson-id/${lessonID}`
      );
      return res?.data?.data;
    },
  });
};
export const useMutateGetLessonQuiz = () => {
  return useMutation({
    mutationFn: async (lessonID) => {
      const res = await LMS_API.get(
        `/course/get-quiz-by-lesson-id/${lessonID}`
      );
      return res?.data?.data;
    },
  });
};
export const useUpdateCourseLesson = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const update_type = payload?.update_type
      const res = await LMS_API.put(
        `/course/update-lesson-recipient?update_type=${update_type}`,
        payload?.json
      );
      return res;
    },
  });
};
