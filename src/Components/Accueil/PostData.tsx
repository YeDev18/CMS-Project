import { useQueryClient } from '@tanstack/react-query';
import useServerUpload from './upload';
export const PostTonnageDt = () => {
  const { postTonnagesDt } = useServerUpload();
  const queryClient = useQueryClient();
  return {
    mutationFn: postTonnagesDt,
    onSuccess: () => {
      // Vous pouvez effectuer des actions supplémentaires ici après le succès de la mutation
      console.log('Todo ajouté post_tonnages_dt ');
      queryClient.invalidateQueries({ queryKey: ['tonnages'] });
    },
    onError: (error: TypeError) => {
      console.error('Erreur lors de post_tonnages_dt :', error);
    },
  };
};

export const PostTonnagePaa = () => {
  const { postTonnagesPAA } = useServerUpload();
  const queryClient = useQueryClient();
  return {
    mutationFn: postTonnagesPAA,
    onSuccess: () => {
      // Vous pouvez effectuer des actions supplémentaires ici après le succès de la mutation
      console.log('Todo ajouté post_tonnages_PAA ');
      queryClient.invalidateQueries({ queryKey: ['tonnages'] });
    },
    onError: (error: TypeError) => {
      console.error('Erreur lors de post_tonnages_dt :', error);
    },
  };
};

export const PostBoardDt = () => {
  const { postBoardDt } = useServerUpload();
  const queryClient = useQueryClient();
  return {
    mutationFn: postBoardDt,
    onSuccess: () => {
      console.log('Todo ajoute post_decalaration_DT');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError: (error: TypeError) => {
      console.error('Erreur lors de post_decalaration_DT :', error);
    },
  };
};

export const PostBoardPaa = () => {
  const { postBoardPAA } = useServerUpload();
  const queryClient = useQueryClient();
  return {
    mutationFn: postBoardPAA,
    onSuccess: () => {
      console.log('Todo ajoute post_decalaration_DT');
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError: (error: TypeError) => {
      console.error('Erreur lors de post_decalaration_PAA :', error);
    },
  };
};
