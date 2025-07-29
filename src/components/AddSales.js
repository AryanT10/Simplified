"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

const AddSale = () => {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Fetch inventory items
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "inventory"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(data);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = items.find((i) => i.id === selectedId);
    if (!item || quantity <= 0 || quantity > item.stock) {
      alert("Invalid sale.");
      return;
    }

    const profit = (item.sellingPrice - item.buyingPrice) * quantity;

    try {
      // Save sale
      await addDoc(collection(db, "sales"), {
        itemId: selectedId,
        itemName: item.itemName,
        quantity,
        sellingPrice: item.sellingPrice,
        buyingPrice: item.buyingPrice,
        totalProfit: profit,
        createdAt: serverTimestamp(),
      });

      // Update stock in inventory
      const itemRef = doc(db, "inventory", selectedId);
      await updateDoc(itemRef, {
        stock: item.stock - quantity,
      });

      alert("Sale recorded!");
      setSelectedId("");
      setQuantity(1);
    } catch (err) {
      console.error("Error adding sale:", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-black">Add Sale</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-4 rounded-xl shadow"
      >
        <select
          className="w-full p-2 border rounded text-black"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          required
        >
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.itemName} (Stock: {item.stock})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          className="w-full p-2 border rounded text-black"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity Sold"
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Record Sale
        </button>
      </form>
    </div>
  );
};

export default AddSale;
