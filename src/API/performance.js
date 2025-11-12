import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/AxiosInstance";

export const useGetReportingOfficer = (payload) => {
  return useQuery({
    queryKey: ["get_reporting_officer"],
    queryFn: async () => {
      const res = await API.post(`pms/get_reporting_officer`, payload);
      return res?.data?.data;
    },
  });
};
export const useGetCounterOfficer = (payload) => {
  return useQuery({
    queryKey: ["get_counter_officer"],
    queryFn: async () => {
      const res = await API.post(`pms/get_counter_signing_officer`, payload);
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
      console.log(payload);
      return await API.post(
        updateDraft
          ? "performance/update_aper_draft"
          : "performance/create_aper",
        payload
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("my_draft_aper");
      queryClient.invalidateQueries("my_pending_aper");
      queryClient.invalidateQueries("my_completed_aper");
    },
  });

  return createAper;
};
export const useUpdateAper = (updateDraft) => {
  const queryClient = useQueryClient();
  const updateAper = useMutation({
    mutationFn: async (payload) => {
      return await API.post(
        updateDraft
          ? "performance/update_aper_draft"
          : "performance/create_aper",
        payload
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("my_draft_aper");
      queryClient.invalidateQueries("my_pending_aper");
      queryClient.invalidateQueries("my_completed_aper");
    },
  });

  return updateAper;
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("pms/create_template", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get_list_template");
    },
  });
};
export const useEditTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("pms/edit_template", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get_list_template");
    },
  });
};
export const useCreateCycle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("pms/create_cycle", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get_cycle_list");
    },
  });
};

export const useGetListTemplate = ({ company_id }) => {
  return useQuery({
    queryKey: ["get_list_template"],
    queryFn: async () => {
      const res = await API.post("pms/list_templates", {
        company_id,
      });
      return res?.data?.data;
    },
  });
};
export const useGetCycleList = ({ company_id }) => {
  return useQuery({
    queryKey: ["get_cycle_list"],
    queryFn: async () => {
      const res = await API.post("pms/list_cycles", {
        company_id,
      });
      return res?.data?.data;
    },
  });
};
export const useGetTemplateDetail = ({ template_id }) => {
  return useQuery({
    queryKey: ["get_template_detail"],
    queryFn: async () => {
      const res = await API.post("pms/view_template", {
        template_id,
      });
      return res?.data?.data;
    },
  });
};

export const useGetTemplateRecipient = ({
  company_id = "",
  recipient_type = "",
}) => {
  return useQuery({
    queryKey: [`get_template_recipient_${company_id}_${recipient_type}`],
    queryFn: async () => {
      const res = await API.post("pms/get_recipient", {
        company_id,
        recipient_type,
      });
      return res?.data?.data;
    },
  });
};
export const useGetCycleRecipient = ({ cycle_id = "" }) => {
  return useQuery({
    queryKey: [`get_cycle_recipient_${cycle_id}`],
    queryFn: async () => {
      const res = await API.post("pms/view_cycle_recipients", {
        cycle_id,
      });
      return res?.data?.data;
    },
  });
};
export const useGetCycleResponse = ({ cycle_id = "" }) => {
  return useQuery({
    queryKey: [`get_cycle_response_${cycle_id}`],
    queryFn: async () => {
      const res = await API.post("pms/view_cycle_responses", {
        cycle_id,
      });
      return res?.data?.data;
    },
  });
};

export const useGetAwaitingPerformance = (payload) => {
  return useQuery({
    queryKey: [`list_awaiting_performances`, payload],
    queryFn: async () => {
      const res = await API.post(`pms/list_awaiting_performances`, payload);
      return res?.data?.data;
    },
  });
};

export const useGetPerformanceListing = (payload) => {
  return useQuery({
    queryKey: [`list_${payload.status}_performances`, payload],
    queryFn: async () => {
      const res = await API.post(`pms/list_${payload.status}_performances`, {
        staff_id: payload?.staff_id,
        company_id: payload?.company_id,
      });
      return res?.data?.data;
    },
  });
};

export const useGetApprovedPerformance = (payload) => {
  return useQuery({
    queryKey: [`list_approved_performances`, payload],
    queryFn: async () => {
      const res = await API.post(`pms/list_approved_performances`, payload);
      return res?.data?.data;
    },
  });
};
export const useGetDraftPerformance = (payload) => {
  return useQuery({
    queryKey: [`list_draft_performances`, payload],
    queryFn: async () => {
      const res = await API.post(`pms/list_draft_performances`, payload);
      return res?.data?.data;
    },
  });
};
export const useGetPendingPerformance = (payload) => {
  return useQuery({
    queryKey: [`list_pending_performances`, payload],
    queryFn: async () => {
      const res = await API.post(`pms/list_pending_performances`, payload);
      return res?.data?.data;
    },
  });
};

export const useSaveDraftPerformance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("pms/save_draft_performances", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("list_draft_performances");
    },
  });
};
export const useSendToReportingOfficerPerformance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("pms/submit_performances", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("list_pending_performances");
    },
  });
};
