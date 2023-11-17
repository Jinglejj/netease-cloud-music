import { BasicLayout } from "../Layout/BasicLayout";
import { createBrowserRouter } from "react-router-dom";
import Demo from "../pages/demo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "demo",
        element: <Demo />,
      },
    ],
  },
]);

export default router;
