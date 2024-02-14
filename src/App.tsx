import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { createBrowserRouter, Outlet } from "react-router-dom";
import store from "../src/App/store";
import { Provider } from "react-redux";
import NotFound from "./pgaes/NotFound";
import GetAllFriends from "./pgaes/GetAllFriends";
import CreateFriend from "./pgaes/CreateFriend";
import SingleMemberFriends from "./pgaes/SingleMemberFriends";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <GetAllFriends />,
      },
      {
        path: "/friends",
        element: <GetAllFriends />,
      },
      {
        path: "/create",
        element: <CreateFriend />,
      },
      {
        path: "/singleMemberFriends",
        element: <SingleMemberFriends />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Navbar />
        <Outlet />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
