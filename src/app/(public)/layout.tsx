import Link from 'next/link';

import Container from '@/components/ui/Container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container>
        <header className="pt-6 pb-6">
          <nav>
            <div className="flex items-center justify-between">
              <div>
                <Link href="/">
                  <strong>Bookie</strong>
                </Link>
              </div>
              <div className="flex gap-4">
                <div>
                  <Link href="/login">Login</Link>
                </div>
                <div>
                  <Link href="/signup">Sign up</Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </Container>
      <main>{children}</main>
    </>
  );
}
