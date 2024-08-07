'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';

export default function Header() {
  return (
    <Navbar fluid>
      <div className="flex mr-auto">
        <Navbar.Brand href="https://opxs-dev.omnius-labs.com/">
          <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Opxs Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Opxs</span>
        </Navbar.Brand>
      </div>
      <div className="flex items-center md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle className="ml-2" />
      </div>
      <Navbar.Collapse className="mx-4 text-center">
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
