import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

import useGetProfileQuery from '@/hooks/useGetProfileQuery';

import Avatar from './Avatar';
import PropertyDropdown from './PropertyDropdown';
import Button from './ui/Button';
import Container from './ui/Container';

const Header = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { data } = useGetProfileQuery();

  const avatarUrl = data?.avatar_url;
  const firstName = data?.first_name;
  const lastName = data?.last_name;

  return (
    <header className="bg-gray-800">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <PropertyDropdown />

          <div className="flex items-center gap-3">
            <Button intent="dark" href="https://wa.me/31619429873">
              Feedback
            </Button>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="inline-flex h-8 w-8 overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  aria-label="User menu"
                >
                  <Avatar
                    avatarUrl={avatarUrl}
                    size={32}
                    firstName={firstName}
                    lastName={lastName}
                  />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  sideOffset={5}
                  align="end"
                >
                  <DropdownMenu.Item
                    className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onSelect={() => {
                      router.push('/account');
                    }}
                  >
                    Your Account
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onSelect={() => {
                      supabaseClient.auth.signOut();
                      router.push('/logout');
                    }}
                  >
                    Logout
                  </DropdownMenu.Item>
                  <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
