'use client';

import { useContext } from 'react';

import { DialogContext } from '@/components/dialog/DialogContext';
import DeletePropertyDialog from '@/components/property/DeletePropertyDialog';
import Button from '@/components/ui/Button';

export default function DeletePropertyButton({
  propertyId,
}: {
  propertyId: string;
}) {
  const dialogContext = useContext(DialogContext);

  return (
    <Button
      fullWidth
      intent="error"
      onClick={() => {
        dialogContext?.setDialog(
          <DeletePropertyDialog propertyId={propertyId} />
        );
        dialogContext?.setOpen(true);
      }}
    >
      Delete property
    </Button>
  );
}
