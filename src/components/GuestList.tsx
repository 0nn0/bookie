import useGetGuestsQuery from '@/hooks/useGetGuestsQuery';

import Card from './Card';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import GuestListItem from './GuestListItem';
import LoadingState from './LoadingState';

const GuestList = ({ propertyId }: { propertyId: string }) => {
  const { isLoading, data, error } = useGetGuestsQuery({ propertyId });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error instanceof Error) {
    return <ErrorState>Error: {error.message}</ErrorState>;
  }

  if (data.length === 0) {
    return <EmptyState>No guests have been invited yet</EmptyState>;
  }

  return (
    <Card>
      <div className="divide-y divide-gray-200">
        {data.map((item) => {
          const { id, role_id, profiles } = item;

          const { avatar_url, email, first_name, last_name } = profiles;

          return (
            <GuestListItem
              key={id}
              id={id}
              propertyId={propertyId}
              firstName={first_name}
              lastName={last_name}
              avatarUrl={avatar_url}
              email={email}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default GuestList;
