import { useQuery } from "@tanstack/react-query";
import { LMS_API } from "../../services/AxiosInstance";

export const useGetDashboardData = (staffId) => {
  return useQuery({
    queryKey: ["get_dashboard_data"],
    queryFn: async () => {
      const res = await LMS_API.get(
        `/course/get-creator-courses-lesson-summary`,
        {
          params: {
            creator: staffId,
          },
        },
      ); //staffId = creatorId
      return res?.data?.data;
    },
  });
};

export const useGetRespondedStats = (staffId) => {
  return useQuery({
    queryKey: ["get-responded-stats"],
    queryFn: async () => {
      const res = await LMS_API.get(`/course/get-creator-dashboard-charts`, {
        params: {
          creator: staffId,
        },
      });
      return res?.data?.data?.data;
    },
  });
};
export const useGetPopularCourses = (staffId) => {
  return useQuery({
    queryKey: ["get-popular-courses"],
    queryFn: async () => {
      const res = await LMS_API.get(`/course/get-creator-popular-courses`, {
        params: {
          creator: staffId,
        },
      });
      return res?.data?.data?.data;
    },
  });
};
