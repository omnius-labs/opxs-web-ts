'use client';

import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { useRouter } from 'next/navigation';

import { logout, me } from '@/features/auth/api';
import { User } from '@/features/auth/types';
import { useLayoutEffect, useState } from 'react';

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useLayoutEffect(() => {
    const fetchUser = async () => {
      try {
        if (!localStorage.getItem('refreshToken') || !localStorage.getItem('accessToken')) {
          return null;
        }
        const data = await me();
        setUser(data);
      } catch (error) {
        return null;
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');

    setUser(null);
  };

  return (
    <Navbar fluid>
      <div className="flex">
        <Navbar.Brand href="https://opxs-dev.omnius-labs.com/">
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
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle className="ml-2" />
          </>
        ) : (
          <div className="flex items-center">
            <Button
              size="sm"
              color="light"
              className="btn btn-primary mr-2"
              style={{ width: '100px' }}
              onClick={() => router.push('/auth/login')}
            >
              Log in
            </Button>
            <Button
              size="sm"
              className="btn btn-primary"
              style={{ width: '100px' }}
              onClick={() => router.push('/auth/register')}
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </Navbar>
  );
}
