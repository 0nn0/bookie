import { useMutation, useQueryClient } from '@tanstack/react-query';

import { InviteRequestBody } from '@/app/api/invite/route';

const useAddGuestMutation = ({ propertyId }: { propertyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      firstName: string;
      lastName: string;
      email: string;
    }) => {
      try {
        const requestBody: InviteRequestBody = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          propertyId: propertyId,
        };

        const result = await fetch('/api/invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const body = await result.json();

        if (result.ok) {
          return body;
        }

        throw new Error(body.message);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['guests', propertyId]);
    },
  });
};

export default useAddGuestMutation;
