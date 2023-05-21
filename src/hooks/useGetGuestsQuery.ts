import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@/app/supabase-provider';

const useGetGuestsQuery = ({ propertyId }: { propertyId: string }) => {
  const { supabase, session } = useSupabase();

  const fetchGuests = async () => {
    return await supabase
      .from('fact_table')
      .select(
        'id, role_id, profiles(id, email, first_name, last_name, last_sign_in_at)'
      )
      .eq('property_id', propertyId)
      // exclude the current user
      .neq('profile_id', session?.user.id)
      .throwOnError();
  };

  return useQuery({
    queryKey: ['guests', propertyId],
    queryFn: async () => fetchGuests().then((result) => result.data),
  });
};

export default useGetGuestsQuery;
