"use client"
import React from 'react';
import Link from "next/link";
import {useAuth} from "@/contexts/auth";
import {useTheme} from "next-themes";
import {Avatar, Dropdown, Navbar, Tooltip} from "flowbite-react";

const Menu = () => {
  const {isAuthenticated, logout, user} = useAuth();

  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
  }

  const {systemTheme, theme, setTheme} = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleSetTheme = (event) => {
    event.preventDefault();
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <>
      <Navbar rounded className="mx-auto p-4 font-medium">
        <Link href={'/'} className="flex flex-wrap items-center justify-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Shop Logo"/>
          <span className="self-center whitespace-nowrap text-md font-semibold dark:text-white">JJ SHOP</span>
        </Link>
        <div className="flex md:order-2">
          {
            isAuthenticated
            &&
            <div className="flex flex-wrap items-center gap-2">
              <Tooltip content={`Toggle ${currentTheme === 'dark' ? 'Light' : 'Dark'} Theme`}>
                <button onClick={handleSetTheme}
                        className="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg p-2 inline-flex items-center dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  {
                    currentTheme === 'dark' ?
                      <svg
                        id="theme-toggle-light-icon"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      :
                      <svg
                        id="theme-toggle-dark-icon"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                        ></path>
                      </svg>
                  }
                </button>
              </Tooltip>
              <Dropdown
                arrowIcon={true}
                inline
                label={
                  <Tooltip content={'My account'}>
                    <Avatar
                      alt="User settings"
                      img={`${user.image ? user.image : 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}`}
                      rounded
                    />
                  </Tooltip>
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
            </div>
          }
        </div>
        <Navbar.Collapse>
          <Link href="/" className="md:text-sm sm:text-lg">
            Home
          </Link>
          <Link href="/products/page/1">Shop</Link>
          <Link href="#">Services</Link>
          <Link href="#">Pricing</Link>
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