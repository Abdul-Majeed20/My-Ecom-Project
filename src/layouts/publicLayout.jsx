import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-1 mt-20">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
