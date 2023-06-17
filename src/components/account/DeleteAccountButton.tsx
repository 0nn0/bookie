'use client';

import { useContext } from 'react';

import { DialogContext } from '../dialog/DialogContext';
import Button from '../ui/Button';
import DeleteAccountDialog from './DeleteAccountDialog';

export default function DeleteAccountButton() {
  const dialogContext = useContext(DialogContext);

  function handleDeleteButtonClick() {
    dialogContext?.setDialog(<DeleteAccountDialog />);
    dialogContext?.setOpen(true);
  }

  return (
    <Button intent="error" fullWidth onClick={handleDeleteButtonClick}>
      Delete account
    </Button>
  );
}
