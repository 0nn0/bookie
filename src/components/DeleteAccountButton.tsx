import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import Dialog from './Dialog';
import { DialogContext } from './DialogContext';
import Button from './ui/Button';

const DeleteAccountButton = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
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
      console.log('invalidating queries...');
      queryClient.invalidateQueries();

      console.log('signing out...');
      await supabase.auth.signOut();

      dialogContext?.setOpen(false);

      console.log('redirecting...');
      router.push('/login');
    },
  });

  const handleClick = () => {
    dialogContext?.setDialog(
      <Dialog
        title="Are you sure?"
        body="This action cannot be undone. This will permanently delete your account."
        confirmButton={{
          label: 'Yes, delete account',
          disabled: mutation.isLoading,
          onClick: () => {
            mutation.mutate();
          },
        }}
        cancelButton={{
          label: 'No, keep account',
          onClick: () => {
            dialogContext?.setOpen(false);
          },
        }}
      />
    );

    dialogContext?.setOpen(true);
  };

  return (
    <Button intent="error" onClick={handleClick} disabled={mutation.isLoading}>
      Delete account
    </Button>
  );
};

export default DeleteAccountButton;
