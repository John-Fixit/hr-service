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
        queryKey: ["get_courses"],
      });
    },
  });
};

export const useGetCourses = () => {
  return useQuery({
    queryKey: ["get_courses"],
    queryFn: async () => {
      const res = await LMS_API.get(`/course/get-all-courses`);
      return res?.data?.data;
    },
  });
};
