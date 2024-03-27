'use client';

import { Avatar, Button, Dropdown, Flowbite, Navbar } from 'flowbite-react';

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onSignIn: () => void;
  onSignOut: () => void;
  onSignUp: () => void;
}

export const Header = ({ user, onSignIn, onSignOut, onSignUp }: HeaderProps) => (
  <Flowbite theme={{ mode: 'dark' }}>
    <Navbar fluid rounded>
      <Navbar.Brand href={process.env.NEXT_PUBLIC_API_ORIGIN}>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Opxs</span>
      </Navbar.Brand>
      <div>
        {user ? (
          <>
            <div className="flex md:order-2">
              <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" rounded />}>
                <Dropdown.Header>
                  <span className="block text-sm">Bonnie Green</span>
                  <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onSignOut}>Sign out</Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>
          </>
        ) : (
          <>
            <div className="flex md:order-2 gap-2">
              <Button color="dark" size="sm" onClick={onSignIn}>
                Sign in
              </Button>
              <Button color="light" size="sm" onClick={onSignUp}>
                Sign up
              </Button>
            </div>
          </>
        )}
      </div>
    </Navbar>
  </Flowbite>
);
