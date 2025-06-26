import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { get_items } from "../api/items/Get";
import { delete_item } from "../api/items/Delete";
import { add_item } from "../api/items/Post";
import { select_item } from "../api/items/Select";
import { edit_item } from "../api/items/Put";
import { log_out } from "../api/users/logout";

function Items() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [Id, setId] = useState("");
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [add_display, setAdd_display] = useState(false);
  const [edit_display, setEdit_display] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const Name = location.state?.user_name;

  async function GetItems() {
    try {
      const list = await get_items();
      setItems(list);
      const sum = list.reduce((s, item) => s + item.price * item.quantity, 0);
      setTotal(sum);
    } catch (error) {
      setError(error.message);
    }
  }

  async function SelectItem(id) {
    try {
      const it = await select_item(id);
      setType(it.type);
      setItem(it.item);
      setPrice(it.price);
      setQuantity(it.quantity);
      setId(id);
      setEdit_display(true);
    } catch (error) {
      setError(error.message);
    }
  }

  async function AddItem() {
    try {
      const i = await add_item(type, item, price, quantity);
      GetItems();
      setError("");
      setAdd_display(false);
    } catch (error) {
      setError(error.message);
    }
  }

  async function EditItem() {
    try {
      const it = await edit_item(Id, type, item, price, quantity);
      GetItems();
      setEdit_display(false);
    } catch (error) {
      setError(error.message);
    }
  }

  async function DeleteItem(id) {
    try {
      const res = await delete_item(id);
      GetItems();
    } catch (error) {
      setError(error.message);
    }
  }

  function LogOut() {
    try {
      const res = log_out();
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    GetItems();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="border border-[#353535] shadow-md bg-[#272727] flex flex-col w-[650px] items-center rounded-xs mb-[10px] pt-[10px] pb-[10px]">
          <p className="text-[20px]">USER : {Name}</p>
          <button
            className="border border-neutral-200 bg-neutral-300 text-neutral-900 mt-[14px] w-[80px] mb-[14px] rounded-xs pt-[5px] pb-[5px]"
            onClick={LogOut}
          >
            Logout
          </button>
        </div>
        <div className="border border-[#353535] shadow-md bg-[#272727] flex flex-col w-[650px] items-center rounded-xs">
          <button
            className="text-[20px] mt-[10px] hover:text-lime-500 cursor-pointer"
            onClick={() => {
              setType("");
              setItem("");
              setPrice(0);
              setQuantity(0);
              setAdd_display(true);
            }}
          >
            ITEMS
          </button>
          {error && (
            <p className="text-[14px] mt-[8px] text-red-600">{error}</p>
          )}
          <table className="border border-[#454545] mt-[20px] mb-[20px] shadow-md bg-[#2c2c2c] text-center">
            <tbody>
              <tr className="border-b border-[#454545]">
                <th className="px-4 py-2">TYPE</th>
                <th className="px-4 py-2">ITEM</th>
                <th className="px-4 py-2">PRICE</th>
                <th className="px-4 py-2">QUANTITY</th>
                <th className="px-4 py-2">OPERATION</th>
              </tr>
              {items &&
                items.map((i) => (
                  <tr key={i._id}>
                    <td className="px-4 py-2">{i.type}</td>
                    <td className="px-4 py-2">{i.item}</td>
                    <td className="px-4 py-2">$ {i.price}</td>
                    <td className="px-4 py-2">{i.quantity}</td>
                    <td className="px-4 py-2">
                      <button
                        className="mr-[10px] hover:text-red-600 cursor-pointer"
                        onClick={() => {
                          DeleteItem(i._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="mr-[10px] hover:text-yellow-600 cursor-pointer"
                        onClick={() => {
                          SelectItem(i._id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="border border-[#353535] shadow-md bg-[#272727] flex flex-col w-[650px] items-center rounded-xs mt-[10px] pt-[10px] pb-[10px]">
          <p className="text-[20px]">TOTAL PRICE : $ {total}</p>
        </div>
      </div>
      {add_display && (
        <div className="flex justify-center items-center h-screen z-50 fixed inset-0 backdrop-blur-sm ">
          <div className="border border-[#353535] shadow-md bg-[#272727] flex flex-col w-[350px] items-center border-l-5 rounded-xs">
            <p className="text-[20px] mt-[10px]">ADD ITEM</p>
            {error && (
              <p className="text-[14px] mt-[8px] text-red-600">{error}</p>
            )}
            <input
              type="text"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              placeholder="Enter Type"
              className="border border-[#404040] shadow-md mt-[10px] p-1 w-[253px] placeholder:text-neutral-300 rounded-xs"
            />
            <input
              type="text"
              value={item}
              onChange={(e) => {
                setItem(e.target.value);
              }}
              placeholder="Enter Item"
              className="border border-[#404040] shadow-md mt-[10px] p-1 w-[253px] placeholder:text-neutral-300 rounded-xs"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Enter Price"
              className="border border-[#404040] shadow-md mt-[10px] p-1 w-[253px] placeholder:text-neutral-300 rounded-xs"
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              placeholder="Enter Quantity"
              className="border border-[#404040] shadow-md mt-[10px] p-1 w-[253px] placeholder:text-neutral-300 rounded-xs"
            />

            <div className="space-x-13">
              <button
                className="border border-neutral-200 bg-neutral-300 text-neutral-900 mt-[14px] w-[100px] mb-[14px] rounded-xs"
                onClick={AddItem}
              >
                Submit
              </button>
              <button
                className="border border-neutral-200 bg-neutral-300 text-neutral-900 mt-[14px] w-[100px] mb-[14px] rounded-xs"
                onClick={() => {
                  setAdd_display(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {edit_display && (
        <div className="flex justify-center items-center h-screen z-50 fixed inset-0 backdrop-blur-sm ">
          <div className="border border-[#353535] shadow-md bg-[#272727] flex flex-col w-[350px] items-center border-l-5 rounded-xs">
            <p className="text-[20px] mt-[10px]">EDIT ITEM</p>
            {error && (
              <p className="text-[14px] mt-[8px] text-red-600">{error}</p>
            )}
            <input
              type="text"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              placeholder="Enter Type"
              className="border border-[#404040] shadow-md mt-[10px] p-1 w-[253px] placeholder:text-neutral-300 rounded-xs"
            />
            <input
              type="text"
              value={item}
              onChange={(e) => {
                setItem(e.target.value);
              }}
              placeholder="Enter Item"
              className="border border-[#404040] shadow-md mt-[10px] p-1 w-[253px] placeholder:text-neutral-300 rounded-xs"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Enter Price"
              className="border border-[#404040] shadow-md mt-[10px] p-1 w-[253px] placeholder:text-neutral-300 rounded-xs"
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              placeholder="Enter Quantity"
              className="border border-[#404040] shadow-md mt-[10px] p-1 w-[253px] placeholder:text-neutral-300 rounded-xs"
            />

            <div className="space-x-13">
              <button
                className="border border-neutral-200 bg-neutral-300 text-neutral-900 mt-[14px] w-[100px] mb-[14px] rounded-xs"
                onClick={EditItem}
              >
                Submit
              </button>
              <button
                className="border border-neutral-200 bg-neutral-300 text-neutral-900 mt-[14px] w-[100px] mb-[14px] rounded-xs"
                onClick={() => {
                  setEdit_display(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Items;
