import { Box, CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routers";

function App() {
  return (
    <Box id="music-container">
      <CssBaseline />
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
