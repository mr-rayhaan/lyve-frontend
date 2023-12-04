import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import AddItems from "./pages/AddItems";
import ManageItems from "./pages/ManageItems";
import Layout from "./components/Layout";
import ItemDetails from "./pages/ItemDetails";


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
        </Route>
      </Routes>
      <Outlet />
    </BrowserRouter>

  );
}

export default App;
