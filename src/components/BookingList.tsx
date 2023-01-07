import useGetBookingsQuery from '@/hooks/useGetBookingsQuery';

// const DeleteButton: React.FC<{
//   children: React.ReactNode;
//   propertyId: string;
// }> = ({ children, propertyId }) => {
//   const mutation = useDeletePropertyMutation({ propertyId });

//   return (
//     <>
//       <button
//         onClick={() => {
//           mutation.mutate(propertyId);
//         }}
//       >
//         {mutation.isLoading || mutation.isSuccess ? 'Loading' : children}
//       </button>
//       {mutation.isError && <div>You are not the owner</div>}
//     </>
//   );
// };

const BookingList = ({
  propertyId,
  roleId,
  guestsOwnersId,
}: {
  propertyId: string;
  roleId: 'OWNER';
  guestsOwnersId: string;
}) => {
  const { isLoading, data, error } = useGetBookingsQuery({
    propertyId,
    roleId,
    guestsOwnersId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No bookings listed</div>;
  }

  return (
    <table border={1} cellPadding={10}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Start date</th>
          <th>End date</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          console.log({ item });
          const { id, start_date, end_date, guests_owners } = item;
          const { first_name, last_name } = guests_owners.profiles;

          return (
            <tr key={id}>
              <td>
                {first_name} {last_name}
              </td>
              <td>{start_date}</td>
              <td>{end_date}</td>
              <td>{guests_owners.role_id}</td>
              <td>
                <button>Cancel (coming soon)</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookingList;
