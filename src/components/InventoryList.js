"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const InventoryList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "inventory"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold mb-2 text-black">Inventory</h2>
      <div className="bg-white shadow rounded-md">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="p-2">Item</th>
              <th className="p-2">Buy</th>
              <th className="p-2">Sell</th>
              <th className="p-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t text-sm">
                <td className="p-2">{item.itemName}</td>
                <td className="p-2">${item.buyingPrice}</td>
                <td className="p-2">${item.sellingPrice}</td>
                <td className="p-2">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <p className="p-4 text-sm text-gray-500 text-center">No items yet.</p>
        )}
      </div>
    </div>
  );
};

export default InventoryList;
