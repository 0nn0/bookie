'use client';

import { useContext } from 'react';

import { DialogContext } from '@/components/dialog/DialogContext';
import ErrorState from '@/components/layout/ErrorState';
import LoadingState from '@/components/layout/LoadingState';
import DeletePropertyDialog from '@/components/property/DeletePropertyDialog';
import PropertyDetailsForm from '@/components/property/PropertyDetailsForm';
import Button from '@/components/ui/Button';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

export default function PropertyDetails({
  propertyId,
}: {
  propertyId: string;
}) {
  const dialogContext = useContext(DialogContext);
  const { isLoading, data, error } = useGetPropertyQuery({
    propertyId,
  });

  return (
    <>
      {isLoading && <LoadingState />}

      {error instanceof Error && (
        <ErrorState>{JSON.stringify(error.message, null, 2)}</ErrorState>
      )}

      {data && (
        <>
          <PropertyDetailsForm name={data.name} />
          <br />
          <br />
          <br />
          <div className="mt-12 mb-12">
            <hr />
          </div>
          <Button
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
        </>
      )}
    </>
  );
}
