import Dashboard from "../views/Dashboard/Dashboard";
import UserProfile from "../views/UserProfile/UserProfile";
import TableList from "../views/TableList/TableList";
import Typography from "../views/Typography/Typography";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  
  {
    path: "/table",
    name: "Processed Data",
    icon: "pe-7s-note2",
    component: TableList
  },
  {
    path: "/typography",
    name: "Raw Data",
    icon: "pe-7s-news-paper",
    component: Typography
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
