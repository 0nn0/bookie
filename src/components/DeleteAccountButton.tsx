import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import Button from './ui/Button';

const DeleteAccountButton = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      console.log('deleting account...');
      return await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: async () => {
      console.log('invalidating queries...');
      queryClient.invalidateQueries();

      console.log('signing out...');
      await supabase.auth.signOut();

      console.log('redirecting...');
      router.push('/login');
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <Button intent="error" onClick={handleClick} disabled={mutation.isLoading}>
      Delete account
    </Button>
  );
};

export default DeleteAccountButton;
