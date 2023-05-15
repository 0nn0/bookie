import {
  Session,
  User,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useContext } from 'react';

import { DialogContext } from '@/components/dialog/DialogContext';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import Card from '@/components/layout/Card';
import CardContent from '@/components/layout/CardContent';
import ErrorState from '@/components/layout/ErrorState';
import LoadingState from '@/components/layout/LoadingState';
import PropertyLayout from '@/components/layout/PropertyLayout';
import SectionHeading from '@/components/layout/SectionHeading';
import DeletePropertyDialog from '@/components/property/DeletePropertyDialog';
import PropertyContent from '@/components/property/PropertyContent';
import PropertyDetailsForm from '@/components/property/PropertyDetailsForm';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { RoleIdByName } from '@/constants/constants';
import useGetPropertyQuery from '@/hooks/useGetPropertyQuery';
import { NextPageWithLayout } from '@/pages/_app';

const SettingsPage = ({
  initialSession,
  user,
  roleId,
}: {
  initialSession: Session;
  user: User;
  roleId: string;
} & NextPageWithLayout) => {
  const router = useRouter();
  const propertyId = router.query.id as string;

  const dialogContext = useContext(DialogContext);
  const { isLoading, data, error } = useGetPropertyQuery({
    propertyId,
  });

  return (
    <PropertyLayout roleId={roleId}>
      <Container>
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
    </PropertyLayout>
  );
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout title="Property">{page}</AuthenticatedLayout>;
};

export default SettingsPage;

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
    .select('role_id')
    .eq('profile_id', session.user.id)
    .eq('property_id', ctx.params.id)
    .eq('role_id', RoleIdByName.Owner)
    .single();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
      roleId: data.role_id,
    },
  };
};
