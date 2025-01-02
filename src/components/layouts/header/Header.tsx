'use client';

import { Avatar, Button, DarkThemeToggle, Dropdown, MegaMenu, Navbar } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { HiChevronDown } from 'react-icons/hi';

import { useUser } from '@/features/auth/contexts';
import { tokenStore } from '@/features/auth/libs/tokenStore';
import { useAsync, useLocation } from 'react-use';

export function Header() {
  const location = useLocation();
  const router = useRouter();

  const { user, setUser, initUser } = useUser();

  const register = () => {
    router.push('/auth/register');
  };
  const login = () => {
    router.push('/auth/login');
  };
  const logout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    tokenStore.removeToken();
    router.push('/');
  };

  const state = useAsync(async () => {
    await initUser();
  }, []);

  return (
    <MegaMenu>
      <Navbar.Brand href="/">
        <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Opxs Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Opxs</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      {state.loading ? (
        <></>
      ) : (
        <Navbar.Collapse className="mx-10">
          <MegaMenu.DropdownToggle>
            Services
            <HiChevronDown className="ml-2" />
          </MegaMenu.DropdownToggle>
          <Navbar.Link href="/about" active={location.pathname === '/about/'}>
            About
          </Navbar.Link>
        </Navbar.Collapse>
      )}
      <div className="hidden items-center md:flex justify-self-end">
        {state.loading ? (
          <></>
        ) : !user ? (
          <>
            <Button size="sm" color="light" className="btn btn-primary mr-2" style={{ width: '100px' }} onClick={login}>
              Log in
            </Button>
            <Button size="sm" className="btn btn-primary" style={{ width: '100px' }} onClick={register}>
              Sign up
            </Button>
          </>
        ) : (
          <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" />}>
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
            </Dropdown.Header>
            <Dropdown.Item>A</Dropdown.Item>
            <Dropdown.Item>B</Dropdown.Item>
            <Dropdown.Item>C</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
        <DarkThemeToggle />
      </div>
      <MegaMenu.Dropdown className="hidden">
        <ul className="mx-auto mt-6 grid w-screen border-y border-gray-200 px-4 py-5 sm:grid-cols-2 md:grid-cols-3 md:px-6">
          <li>
            <a href="/services/file-converter" className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="font-semibold">File Converter</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Converts uploaded files.</span>
            </a>
          </li>
        </ul>
      </MegaMenu.Dropdown>
    </MegaMenu>
  );
}
