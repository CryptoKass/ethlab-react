export default [
  { type: "mute", content: `// \`src/router.tsx\`` },
  { type: "mute", content: `// ...` },
  { type: "focus", content: `import MyPage from "@/pages/MyPage"; // ←` },
  { content: `\nexport const router = createBrowserRouter([` },
  { type: "mute", content: `\t// ...` },
  { content: `\t{ path: "/", element: <HomePage /> },` },
  { content: `\t{ path: "*", element: <NotFoundPage /> },` },
  {
    type: "focus",
    content: `\t{ path: "/my-page", component: MyPage } // ←`,
  },
  { content: `]);` },
];
