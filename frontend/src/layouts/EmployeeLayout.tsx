import React from "react";
import EmployeeMenu from "../components/employee/Menu";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Menu riêng của nhân viên */}
      <EmployeeMenu />

      <main className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
