"use client"
import React, {useState} from 'react';
import Link from "next/link";
import {useAuth} from "@/contexts/auth";
import {useTheme} from "next-themes";
import {Avatar, Dropdown, Navbar} from "flowbite-react";
import Favicon from '/public/vercel.svg';

const Menu = () => {
  const {isAuthenticated, logout, user} = useAuth();
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
  }

  const openDropdownMenu = () => {
    setDropdownMenu((oldValue) => !oldValue);
  }

  const {systemTheme, theme, setTheme} = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleSetTheme = (event) => {
    event.preventDefault();
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <>
      <Navbar rounded className="mx-auto p-4 container">
        <Navbar.Brand href="https://flowbite-react.com">
          <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Shop Logo"/>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">JJ SHOP</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {
            isAuthenticated
            &&
            <>
              <Dropdown
                arrowIcon={true}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img={`${user.image ? user.image : 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}`}
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{`${user.firstName} ${user.lastName}`}</span>
                  <span className="block truncate text-sm font-medium">{user.email}</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item>
                  <Link href={'#'} onClick={logoutHandler}>Logout</Link>
                </Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle/>
            </>
          }
        </div>
        <Navbar.Collapse>
          <Link href="/">
            Home
          </Link>
          <Link href="/products/page/1">Shop</Link>
          <Link href="#">Services</Link>
          <Link href="#">Pricing</Link>
          <Link href="#" onClick={handleSetTheme}>Contact</Link>
          {
            !isAuthenticated &&
            <Link href={'/login'}>Login</Link>
          }
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Menu;