import { FC, PropsWithChildren } from "react";
import Breadcrumbs from "./Breadcrumbs";

const EthLabPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div className="mb-12 p-4 flex items-center justify-center">
        <Breadcrumbs />
      </div>
      <div className="container mx-auto mt-4 mb-20 px-4">{children}</div>
    </div>
  );
};

export default EthLabPage;
