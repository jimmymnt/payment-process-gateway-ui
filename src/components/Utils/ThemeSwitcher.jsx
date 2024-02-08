"use client"
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "next-themes";
import {Button, Tooltip} from "flowbite-react";

const ThemeSwitcher = () => {
  const {systemTheme, theme, setTheme} = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleSetTheme = (event) => {
    event.preventDefault();
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  return (
    <Tooltip content={`Toggle dark theme`}>
      <button
        onClick={handleSetTheme}
        className="text-gray-500 bg-gray-100 md:py-2.5 px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg inline-flex items-center dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600">
        {
          currentTheme === 'dark' ?
            <FontAwesomeIcon icon={faSun} className="w-5 h-5"/>
            :
            <FontAwesomeIcon icon={faMoon} className="w-5 h-5"/>
        }
      </button>
    </Tooltip>
  );
};

export default ThemeSwitcher;