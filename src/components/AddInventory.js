import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AddInventory = () => {
  const [item, setItem] = useState({
    itemName: "",
    buyingPrice: "",
    sellingPrice: "",
    stock: "",
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "inventory"), {
        ...item,
        buyingPrice: Number(item.buyingPrice),
        sellingPrice: Number(item.sellingPrice),
        stock: Number(item.stock),
        createdAt: serverTimestamp(),
      });
      alert("Item added!");
      setItem({ itemName: "", buyingPrice: "", sellingPrice: "", stock: "" });
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl text-black font-bold mb-4">Add Inventory Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full text-black p-2 border rounded"
          name="itemName"
          placeholder="Item Name"
          value={item.itemName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 text-black border rounded"
          name="buyingPrice"
          placeholder="Buying Price"
          type="number"
          value={item.buyingPrice}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 text-black border rounded"
          name="sellingPrice"
          placeholder="Selling Price"
          type="number"
          value={item.sellingPrice}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 text-black border rounded"
          name="stock"
          placeholder="Stock"
          type="number"
          value={item.stock}
          onChange={handleChange}
          required
        />
        <button className="w-full bg-black text-white py-2 rounded">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddInventory;
