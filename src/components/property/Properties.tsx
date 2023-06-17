'use client';

import { useContext } from 'react';

import { DialogContext } from '../dialog/DialogContext';
import SectionHeading from '../layout/SectionHeading';
import Button from '../ui/Button';
import FloatingActionButton from '../ui/FloatingActionButton';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';

export default function Properties() {
  const dialogContext = useContext(DialogContext);

  function handleShowPropertyForm() {
    dialogContext?.setDialog(
      <PropertyForm
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
        title="Properties"
        action={
          <Button
            onClick={handleShowPropertyForm}
            className="hidden sm:inline-flex"
          >
            Add property
          </Button>
        }
      />
      <PropertyList />
      <div className="sm:hidden">
        <FloatingActionButton
          onClick={handleShowPropertyForm}
          takePropertyNavIntoAccount={false}
        />
      </div>
    </>
  );
}
