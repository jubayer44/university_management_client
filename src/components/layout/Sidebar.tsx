import { Layout, Menu } from "antd";
import { sidebarGenerator } from "../../utils/sidebarGeneratior";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "./../../redux/features/auth/authSlice";

const { Sider } = Layout;

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  const userRole = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };

  let sidebarItem;

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItem = sidebarGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItem = sidebarGenerator(facultyPaths, userRole.FACULTY);

      break;

    case userRole.STUDENT:
      sidebarItem = sidebarGenerator(studentPaths, userRole.STUDENT);

      break;
    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div />
      <div
        style={{
          padding: "8px",
          margin: "8px",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          font: "3rem",
        }}
      >
        <h1>PH University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItem}
      />
    </Sider>
  );
};

export default Sidebar;
