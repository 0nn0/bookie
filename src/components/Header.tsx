import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

import useGetProfileQuery from '@/hooks/useGetProfileQuery';

import Avatar from './Avatar';
import PropertyDropdown from './PropertyDropdown';
import Container from './ui/Container';

const Header = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { data } = useGetProfileQuery();

  const avatarUrl = data?.avatar_url;
  const firstName = data?.first_name;
  const lastName = data?.last_name;

  return (
    <header className="bg-slate-400">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <nav>
            <PropertyDropdown />
          </nav>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="inline-block overflow-hidden rounded-full"
                aria-label="Customise options"
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
      </Container>
    </header>
  );
};

export default Header;
