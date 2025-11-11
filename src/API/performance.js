import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/AxiosInstance";

export const useGetReportingOfficer = (payload) => {
  return useQuery({
    queryKey: ["get_reporting_officer"],
    queryFn: async () => {
      const res = await API.post(`performance/get_reporting_officer`, payload);
      return res?.data?.data;
    },
  });
};
export const useGetCounterOfficer = (payload) => {
  return useQuery({
    queryKey: ["get_counter_officer"],
    queryFn: async () => {
      const res = await API.post(
        `performance/get_counter_signing_officer`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useGetActivePerformance = (company_id) => {
  return useQuery({
    queryKey: ["get_active_performance"],
    queryFn: async () => {
      const res = await API.get(
        `performance/get_active_performance_year/${company_id}`
      );
      return res?.data?.data;
    },
  });
};
export const useGetMyAper = (payload) => {
  return useQuery({
    queryKey: [`my_${payload?.status}_aper`, payload],
    queryFn: async () => {
      const res = await API.post(`performance/list_aper`, payload);
      return res?.data?.data;
    },
  });
};

export const useCreateAper = (updateDraft) => {
  const queryClient = useQueryClient();
  const createAper = useMutation({
    mutationFn: async (payload) => {
      console.log(payload)
      return await API.post(updateDraft? "performance/update_aper_draft" : "performance/create_aper", payload);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries("my_draft_aper");
      queryClient.invalidateQueries("my_pending_aper");
      queryClient.invalidateQueries("my_completed_aper");
    }
  });

  return createAper;
};
export const useUpdateAper = (updateDraft) => {
  const queryClient = useQueryClient();
  const updateAper = useMutation({
    mutationFn: async (payload) => {
      return await API.post(updateDraft? "performance/update_aper_draft" : "performance/create_aper", payload);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries("my_draft_aper");
      queryClient.invalidateQueries("my_pending_aper");
      queryClient.invalidateQueries("my_completed_aper");
    }
  });

  return updateAper;
};
