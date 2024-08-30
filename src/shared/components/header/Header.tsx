'use client';

import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/features/auth/contexts';

interface HeaderProps {
  register: () => void;
  login: () => void;
  logout: () => void;
}

export function Header({ register, login, logout }: HeaderProps) {
  const router = useRouter();
  const { user } = useUser();

  return (
    <Navbar fluid>
      <div className="flex">
        <Navbar.Brand href={process.env.NEXT_PUBLIC_API_ORIGIN}>
          <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Opxs Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Opxs</span>
        </Navbar.Brand>
      </div>
      {user ? (
        <Navbar.Collapse className="mx-4 text-center">
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
        </Navbar.Collapse>
      ) : (
        <></>
      )}
      <div className="flex items-center md:order-2">
        {user ? (
          <>
            <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" rounded />}>
              <Dropdown.Header>
                <span className="block text-sm">{user.name}</span>
              </Dropdown.Header>
              <Dropdown.Item>A</Dropdown.Item>
              <Dropdown.Item>B</Dropdown.Item>
              <Dropdown.Item>C</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle className="ml-2" />
          </>
        ) : (
          <div className="flex items-center">
            <Button size="sm" color="light" className="btn btn-primary mr-2" style={{ width: '100px' }} onClick={login}>
              Log in
            </Button>
            <Button size="sm" className="btn btn-primary" style={{ width: '100px' }} onClick={register}>
              Sign up
            </Button>
          </div>
        )}
      </div>
    </Navbar>
  );
}
