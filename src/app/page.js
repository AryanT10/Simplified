"use client";
import InventoryList from "@/components/InventoryList";
import AddInventory from "../components/AddInventory";
import AddSale from "@/components/AddSales";

export default function Home() {
  return (
    <main className="min-h-screen text-black bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Store Dashboard</h1>
      <AddInventory />
      <InventoryList />
      <AddSale />
    </main>
  );
}
