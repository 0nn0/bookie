'use client';

import { useContext } from 'react';

import { DialogContext } from '@/components/dialog/DialogContext';
import GuestList from '@/components/guests/GuestList';
import InviteGuestForm from '@/components/guests/InviteGuestForm';
import SectionHeading from '@/components/layout/SectionHeading';
import Button from '@/components/ui/Button';
import FloatingActionButton from '@/components/ui/FloatingActionButton';

export default function GuestsDetails({ propertyId }: { propertyId: string }) {
  const dialogContext = useContext(DialogContext);

  function handleInviteGuest() {
    dialogContext?.setDialog(
      <InviteGuestForm
        propertyId={propertyId}
        onSuccess={() => {
          dialogContext.setOpen(false);
        }}
      />
    );
    dialogContext?.setOpen(true);
  }

  return (
    <>
      <SectionHeading
        title="Guests"
        action={
          <Button
            onClick={handleInviteGuest}
            className="hidden items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto"
          >
            Invite guest
          </Button>
        }
      />

      <GuestList propertyId={propertyId} />
      <div className="sm:hidden">
        <FloatingActionButton
          onClick={handleInviteGuest}
          takePropertyNavIntoAccount={true}
        />
      </div>
    </>
  );
}
