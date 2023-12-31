import { CustomFlowbiteTheme } from "flowbite-react";
import type { editor } from "monaco-editor/esm/vs/editor/editor.api";

export const ethlabTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      info: "bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 border border-gray-800 dark:border-gray-100",
      gray: "hover:text-gray-800 dark:hover:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
    },
    pill: {
      off: "rounded flex items-center justify-center",
      on: "rounded-full flex items-center justify-center",
    },
  },

  badge: {
    root: {
      color: {
        info: "bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900",
        gray: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
      },
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
        base: "w-full h-full cursor-pointer disabled:cursor-default",
      },
    },
  },

  navbar: {
    link: {
      base: "hover:underline md:hover:!text-black md:hover:dark:!text-white uppercase p-4 md:px-0",
      active: {
        on: "text-black dark:text-white !underline",
      },
    },
    root: {
      inner: {
        base: "flex items-center justify-between flex-wrap md:flex-nowrap",
      },
    },
    collapse: {
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium w-full overflow-x-scroll",
    },
  },

  modal: {
    content: {
      base: "rounded relative bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]",
    },
  },

  table: {
    root: {
      shadow: "absolute w-full h-full top-0 left-0 rounded -z-10 text-md",
      wrapper:
        "relative w-full overflow-x-scroll pt-[200px] mt-[-200px] pointer-events-none",
      /* overflow-x-scroll also hides any tooltip that extends above,
        so need to pad the top, this can block point events to above elements so 
        we need 'pointer-events-none'.*/
      base: "pointer-events-auto w-full",
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

export const ethlabMonacoTheme: editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#1f2937",
  },
};
