import { CustomFlowbiteTheme } from "flowbite-react";

export const ethlabTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      info: "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
      gray: "hover:text-gray-900 dark:hover:text-gray-100 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
    },
    pill: {
      off: "rounded",
      on: "rounded-full",
    },
  },

  textInput: {
    field: {
      input: {
        base: "!rounded outline-none border border-gray-300 dark:border-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      },
    },
  },
};
