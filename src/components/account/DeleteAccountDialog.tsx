'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { useSupabase } from '@/app/supabase-provider';

import Dialog from '../dialog/Dialog';
import { DialogContext } from '../dialog/DialogContext';

const DeleteAccountDialog = () => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();
  const dialogContext = useContext(DialogContext);

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
      return;
      console.log('invalidating queries...');
      queryClient.invalidateQueries();

      console.log('signing out...');
      await supabase.auth.signOut();

      dialogContext?.setOpen(false);

      console.log('redirecting...');
      router.push('/login');
    },
  });

  return (
    <Dialog
      title="Are you sure?"
      body="This action cannot be undone. This will permanently delete your account."
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
