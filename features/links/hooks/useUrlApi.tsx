import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import urlApi from "../api";
import type { FormValues } from "../components/LnkPopup";


const useUrlApi = () => {
  const queryClient = useQueryClient();

  const inValidateCurrentQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["currentUserUrl"],
    });
  };

  // fetch all urls of current users
  const currentUserUrls = useQuery({
    queryKey: ["currentUserUrl"],
    queryFn: urlApi.currentUsersUrls,
  });

  // delete any existing url info
  const deleteMutation = useMutation({
    mutationFn: urlApi.delete,
    onSuccess: inValidateCurrentQuery,
  });

  // update any existing url info
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FormValues> }) =>
      urlApi.update(id, data),
    onSuccess: inValidateCurrentQuery,
  });

  //  create new short url
  const createUrlMutation = useMutation({
    mutationFn: urlApi.create,
    onSuccess: inValidateCurrentQuery,
  });

  return {
    currentUserUrls,
    createUrlMutation,
    deleteMutation,
    updateMutation,
  };
};

export default useUrlApi;
