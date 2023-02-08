import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useGetProfileQuery from '@/hooks/useGetProfileQuery';

import Container from './ui/Container';

const Header = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { data } = useGetProfileQuery();
  const avatarUrl = data?.avatar_url;

  const links = [{ href: '/', label: 'Home' }];
  return (
    <header className="bg-slate-400">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <nav>
            <ul className="">
              {links.map(({ label, ...rest }) => (
                <li key={label}>
                  <Link {...rest}>
                    <a className="text-white">{label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100"
                aria-label="Customise options"
              >
                <Avatar.Root>
                  <Avatar.Fallback
                    className="flex h-full w-full items-center justify-center bg-slate-100 text-sm font-medium leading-none"
                    delayMs={600}
                  >
                    OS
                  </Avatar.Fallback>
                  {avatarUrl && (
                    <Avatar.Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET_NAME}/${avatarUrl}`}
                      className="h-8 w-8 rounded-full"
                      alt="Avatar"
                    />
                  )}
                </Avatar.Root>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                sideOffset={5}
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
