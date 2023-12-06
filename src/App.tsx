import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import AddItems from "./pages/AddItems";
import ManageItems from "./pages/ManageItems";
import Layout from "./components/Layout";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AddItems />} />
          <Route path="manage-items"
            element={<ManageItems />}
          />
          <Route path="/item-details" element={<ItemDetails />} />
          <Route path="/edit-item/:index" element={<EditItem />} />
        </Route>
      </Routes>
      <Outlet />
    </BrowserRouter>

  );
}

export default App;
