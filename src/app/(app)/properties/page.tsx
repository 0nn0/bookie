'use client';

import { useContext } from 'react';

import { DialogContext } from '@/components/dialog/DialogContext';
import SectionHeading from '@/components/layout/SectionHeading';
import PropertyContent from '@/components/property/PropertyContent';
import PropertyForm from '@/components/property/PropertyForm';
import PropertyList from '@/components/property/PropertyList';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import FloatingActionButton from '@/components/ui/FloatingActionButton';

export default function Page() {
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
    <Container>
      <PropertyContent>
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
      </PropertyContent>
    </Container>
  );
}
