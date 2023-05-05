import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { DialogContext } from '@/components/dialog/DialogContext';
import AuthLayout from '@/components/layout/AuthLayout';
import Card from '@/components/layout/Card';
import CardContent from '@/components/layout/CardContent';
import ErrorState from '@/components/layout/ErrorState';
import LoadingState from '@/components/layout/LoadingState';
import SectionHeading from '@/components/layout/SectionHeading';
import DeletePropertyDialog from '@/components/property/DeletePropertyDialog';
import PropertyContent from '@/components/property/PropertyContent';
import PropertyDetailsForm from '@/components/property/PropertyDetailsForm';
import PropertyNav from '@/components/property/PropertyNav';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { RoleIdByName } from '@/constants/constants';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';

const Settings: NextPage = () => {
  const router = useRouter();
  const propertyId = router.query.id as string;

  const dialogContext = useContext(DialogContext);
  const { isLoading, data, error } = useGetPropertyQuery({
    propertyId,
  });

  return (
    <AuthLayout title="Settings">
      <Container>
        <PropertyNav propertyId={propertyId} roleId={RoleIdByName.Owner} />

        <PropertyContent>
          <div className="mb-6">
            <SectionHeading title="Settings" />
          </div>
          <Card>
            <CardContent>
              {isLoading && <LoadingState />}

              {error instanceof Error && (
                <ErrorState>
                  {JSON.stringify(error.message, null, 2)}
                </ErrorState>
              )}

              {data && (
                <>
                  <PropertyDetailsForm name={data.name} />
                  <br />
                  <br />
                  <br />
                  <div className="mt-12 mb-12">
                    <hr />
                  </div>
                  <Button
                    intent="error"
                    onClick={() => {
                      dialogContext?.setDialog(
                        <DeletePropertyDialog propertyId={propertyId} />
                      );
                      dialogContext?.setOpen(true);
                    }}
                  >
                    Delete property
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </PropertyContent>
      </Container>
    </AuthLayout>
  );
};

export default Settings;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };

  if (!ctx.params?.id) {
    return {
      notFound: true,
    };
  }

  // check if user is owner of this property
  const { data } = await supabase
    .from('fact_table')
    .select()
    .eq('profile_id', session.user.id)
    .eq('property_id', ctx.params.id)
    .eq('role_id', RoleIdByName.Owner)
    .single();

  if (!data) {
    return {
      redirect: {
        destination: `/properties/${ctx.params.id}/error`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
