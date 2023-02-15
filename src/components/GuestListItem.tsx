import * as Avatar from '@radix-ui/react-avatar';

import useDeleteGuestMutation from '@/hooks/useDeleteGuestMutation';

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
          <Avatar.Root>
            <Avatar.Fallback
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-medium leading-none"
              delayMs={600}
            >
              {firstName[0]}
              {lastName[0]}
            </Avatar.Fallback>
            {avatarUrl && (
              <Avatar.Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET_NAME}/${avatarUrl}`}
                className="h-8 w-8 rounded-full"
                alt="Avatar"
              />
            )}
          </Avatar.Root>
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
