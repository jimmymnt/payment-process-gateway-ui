"use client"
import React from 'react';
import Link from "next/link";
import {useAuth} from "@/contexts/auth";
import {Avatar, Dropdown, Navbar, Tooltip} from "flowbite-react";
import ThemeSwitcher from "@/components/Utils/ThemeSwitcher";

const Menu = () => {
  const {isAuthenticated, logout, user} = useAuth();

  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
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
            <ThemeSwitcher/>
            {
              isAuthenticated
                ? <Dropdown
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
                : <>
                  <Link href={'/login'} className="mx-2 text-sm">
                    Login
                  </Link>
                  <Link
                    href={'/register'}
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                  >
                    Sign Up
                  </Link>
                </>
            }
            <Navbar.Toggle/>
          </div>
        </div>
        <Navbar.Collapse>
          <Link href="/">
            Home
          </Link>
          <Link href="/products/page/1">Shop</Link>
          <Link href="#">Services</Link>
          <Link href="#">Pricing</Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Menu;