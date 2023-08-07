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
        base: "!rounded outline-none border border-gray-300 dark:border-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full",
      },
    },
  },

  select: {
    field: {
      select: {
        base: "!rounded",
      },
    },
  },

  navbar: {
    link: {
      base: "hover:underline md:hover:!text-black uppercase",
      active: {
        on: "text-black underline",
      },
    },
  },

  modal: {
    content: {
      base: "rounded relative bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]",
    },
  },

  table: {
    root: {
      shadow:
        "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded -z-10 text-md",
    },
    head: {
      cell: {
        base: "group-first/head:first:rounded-tl-md group-first/head:last:rounded-tr-md bg-gray-100 dark:bg-gray-700 px-6 py-3",
      },
    },
    body: {
      base: "group/row divide-y",
    },
    row: {
      base: "group/row bg-white dark:border-gray-700 dark:bg-gray-800",
    },
  },
};
