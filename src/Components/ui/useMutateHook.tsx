import { useMutation } from '@tanstack/react-query';
const useMutateHook = (properties: any) => {
  return useMutation(properties);
};

export default useMutateHook;
