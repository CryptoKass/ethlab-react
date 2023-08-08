import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  let crumbs = new URL(window.location.href).pathname.split("/");

  let links: string[] = [];
  for (let i = 0; i < crumbs.length; i++) {
    links.push(crumbs.slice(0, i + 1).join("/"));
  }

  crumbs = crumbs.map((crumb) => {
    if (crumb === "") return "Home";
    if (crumb.startsWith("0x")) return crumb.slice(0, 6) + "...";
    return crumb.charAt(0).toUpperCase() + crumb.slice(1);
  });

  return (
    <>
      <Breadcrumb className="opacity-75 hover:opacity-100">
        {crumbs.map((crumb, i) => (
          <Breadcrumb.Item>
            <Link to={`${i > 0 ? links[i] : "/"}`}>{crumb}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
