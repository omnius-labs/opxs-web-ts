'use client';

import { logout } from '@/features/auth/api/logout';
import { useUser } from '@/features/auth/hooks/me';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <Navbar fluid>
      <div className="flex mr-auto">
        <Navbar.Brand href="https://opxs-dev.omnius-labs.com/">
          <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Opxs Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Opxs</span>
        </Navbar.Brand>
      </div>
      <div className="flex items-center md:order-2">
        {user ? (
          <>
            <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" rounded />}>
              <Dropdown.Header>
                <span className="block text-sm">{user.name}</span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  logout();
                  localStorage.removeItem('refreshToken');
                  localStorage.removeItem('accessToken');
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle className="ml-2" />
          </>
        ) : (
          <div className="flex items-center">
            <Button onClick={() => router.push('/auth/login')} size="xs" color="light" className="btn btn-primary mx-2">
              Log in
            </Button>
            <Button onClick={() => router.push('/auth/register')} size="xs" className="btn btn-primary">
              Sign up
            </Button>
          </div>
        )}
      </div>
      {user ? (
        <Navbar.Collapse className="mx-4 text-center">
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      ) : (
        <></>
      )}
    </Navbar>
  );
}
