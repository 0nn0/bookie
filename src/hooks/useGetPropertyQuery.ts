import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

const useGetPropertyQuery = ({ propertyId }: { propertyId: string }) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const fetchProperty = async (propertyId: string) => {
    if (!user?.id) throw new Error('User not logged in');

    // check if user is owner or guest of property
    const { data, error } = await supabaseClient
      .from('guests_owners')
      .select()
      .eq('property_id', propertyId)
      .eq('profile_id', user.id)
      .single();

    if (data) {
      const { data: propertyData, error: propertyError } = await supabaseClient
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (propertyError) {
        throw new Error(propertyError.message);
      }

      return propertyData;
    } else {
      throw new Error('User is not owner or guest of property');
    }
  };

  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => fetchProperty(propertyId),
    enabled: !!propertyId,
  });
};

export default useGetPropertyQuery;
