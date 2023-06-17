'use client';

import ErrorState from '@/components/layout/ErrorState';
import LoadingState from '@/components/layout/LoadingState';
import PropertyDetailsForm from '@/components/property/PropertyDetailsForm';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

export default function PropertySettings({
  propertyId,
}: {
  propertyId: string;
}) {
  const { isLoading, data, error } = useGetPropertyQuery({
    propertyId,
  });

  return (
    <>
      {isLoading && <LoadingState />}

      {error instanceof Error && (
        <ErrorState>{JSON.stringify(error.message, null, 2)}</ErrorState>
      )}

      {data?.name && <PropertyDetailsForm name={data.name} />}
    </>
  );
}
