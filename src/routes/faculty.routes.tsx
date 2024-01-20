import AdmissionSemester from "../pages/faculty/AdmissionSemester";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Admission Semester",
        path: "admission-semester",
        element: <AdmissionSemester />,
      },
    ],
  },
];
