import useDeleteGuestMutation from '@/hooks/useDeleteGuestMutation';

import Avatar from './Avatar';

const GuestListItem = ({
  id,
  propertyId,
  firstName,
  lastName,
  email,
  avatarUrl,
}: {
  id: string;
  propertyId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
}) => {
  return (
    <div className="block p-4">
      <div className="flex">
        <div className="w-10 pt-1">
          <Avatar
            avatarUrl={avatarUrl}
            size={32}
            firstName={firstName}
            lastName={lastName}
          />
        </div>
        <div className="">
          <div className="inline-flex font-semibold text-gray-700">
            {firstName} {lastName}
          </div>
          <div className="mr-2 text-sm text-gray-400">{email}</div>
          <div className="mt-3">
            <DeleteButton propertyId={propertyId} guestId={id}>
              Delete
            </DeleteButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestListItem;

function DeleteButton({
  children,
  propertyId,
  guestId,
}: {
  children: React.ReactNode;
  propertyId: string;
  guestId: string;
}) {
  const mutation = useDeleteGuestMutation({ propertyId, guestId });

  return (
    <button
      disabled={mutation.isLoading}
      className="text-red-600 hover:text-red-900"
      onClick={() => {
        mutation.mutate(propertyId);
      }}
    >
      {mutation.isLoading ? 'Loading' : children}
    </button>
  );
}
