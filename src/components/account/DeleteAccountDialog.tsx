'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

import { useSupabase } from '@/app/supabase-provider';

import Dialog from '../dialog/Dialog';
import { DialogContext } from '../dialog/DialogContext';

const DeleteAccountDialog = () => {
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();
  const dialogContext = useContext(DialogContext);

  const mutation = useMutation({
    mutationFn: async () => {
      console.log('deleting account...');

      const result = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // cookie: headers().get('cookie') as string,
        },
      });

      if (!result.ok) {
        throw new Error('Something went wrong');
      }

      return result;
    },
    onSuccess: async () => {
      console.log('invalidating queries...');

      queryClient.invalidateQueries();

      console.log('signing out...');
      await supabase.auth.signOut();

      dialogContext?.setOpen(false);

      console.log('redirecting...');
      router.push('/login');
    },
    onError: (error) => {
      console.log('error', error);
      setError('Something went wrong. Please try again.');
    },
  });

  return (
    <Dialog
      title="Are you sure?"
      body="This action cannot be undone. This will permanently delete your account."
      error={error}
      confirmButton={{
        label: 'Yes, delete account',
        disabled: mutation.isLoading,
        onClick: () => {
          mutation.mutate();
        },
        loading: mutation.isLoading,
      }}
      cancelButton={{
        label: 'No, keep account',
        disabled: mutation.isLoading,
        onClick: () => {
          dialogContext?.setOpen(false);
        },
      }}
    />
  );
};

export default DeleteAccountDialog;
