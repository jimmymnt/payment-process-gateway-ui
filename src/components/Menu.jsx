"use client"
import React from 'react';
import Link from "next/link";
import {useAuth} from "@/contexts/auth";
import {useTheme} from "next-themes";
import {Avatar, Dropdown, Navbar, Tooltip} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

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
          <span className="self-center whitespace-nowrap text-md font-semibold dark:text-white">PIM SHOP</span>
        </Link>
        <div className="flex md:order-2">
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handleSetTheme}
                    className="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg p-2 inline-flex items-center dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              {
                currentTheme === 'dark' ?
                  <FontAwesomeIcon icon={faSun} className="w-5 h-5"/>
                  :
                  <FontAwesomeIcon icon={faMoon} className="w-5 h-5"/>
              }
            </button>
            {
              isAuthenticated
              &&
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
            }
            <Navbar.Toggle/>
          </div>
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