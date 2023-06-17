import DeleteAccountButton from '@/components/account/DeleteAccountButton';
import ProfileForm from '@/components/account/ProfileForm';
import Card from '@/components/layout/Card';
import CardContent from '@/components/layout/CardContent';
import SectionHeading from '@/components/layout/SectionHeading';
import PropertyContent from '@/components/property/PropertyContent';
import Container from '@/components/ui/Container';
import Headline from '@/components/ui/Headline';
import Text from '@/components/ui/Text';

export default async function Page() {
  return (
    <Container>
      <SectionHeading title="Account" />
      <PropertyContent>
        <Card>
          <CardContent>
            <Headline size="h2" className="mb-4">
              Profile
            </Headline>
            <ProfileForm submitButtonLabel="Update" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Headline size="h2" className="mb-1">
              Danger zone
            </Headline>
            <Text intent="secondary" size="sm" className="mb-8">
              Permanently delete your account and all of its related data. This
              action is not reversible.
            </Text>
            <DeleteAccountButton />
          </CardContent>
        </Card>
      </PropertyContent>
    </Container>
  );
}
