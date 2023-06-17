'use client';

import { useParams } from 'next/navigation';
import { z } from 'zod';

import PropertyDetailsForm from '@/components/property/PropertyDetailsForm';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

const schema = z.object({
  name: z.string().min(3, 'Please enter a valid name'),
});

export type FormSchema = z.infer<typeof schema>;

export default function PropertyDetailsFormContainer() {
  const params = useParams();
  const propertyId = params.id;

  const { data, error, isLoading } = useGetPropertyQuery({
    propertyId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>{JSON.stringify(error.message, null, 2)}</div>;
  }

  return <PropertyDetailsForm name={data?.name} />;
}
