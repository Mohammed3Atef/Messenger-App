import { useState } from "react";

export default function ChatList() {
  const [addMode, SetAddMode] = useState(false);
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex items-center gap-5 p-5">
        <div className="flex-1 bg-[rgba(17,25,40,0.5)] flex items-center gap-5 rounded-xl p-2.5">
          <img src="/public/search.png" alt="search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-0	border-0	flex-1"
          />
        </div>
        <img
          src={addMode ? "/public/minus.png" : "/public/plus.png"}
          alt=""
          className="w-9 h-9 bg-[rgba(17,25,40,0.5)] p-2.5 rounded-md cursor-pointer"
          onClick={() => SetAddMode((open) => !open)}
        />
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-b-[#dddddd35]">
        <img
          src="/public/mo.jpg"
          alt="avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Mo Atef</span>
          <p className="text-sm font-light">Hello from the other side </p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-b-[#dddddd35]">
        <img
          src="/public/mo.jpg"
          alt="avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Mo Atef</span>
          <p className="text-sm font-light">Hello from the other side </p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-b-[#dddddd35]">
        <img
          src="/public/mo.jpg"
          alt="avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Mo Atef</span>
          <p className="text-sm font-light">Hello from the other side </p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-b-[#dddddd35]">
        <img
          src="/public/mo.jpg"
          alt="avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Mo Atef</span>
          <p className="text-sm font-light">Hello from the other side </p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-b-[#dddddd35]">
        <img
          src="/public/mo.jpg"
          alt="avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Mo Atef</span>
          <p className="text-sm font-light">Hello from the other side </p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-b-[#dddddd35]">
        <img
          src="/public/mo.jpg"
          alt="avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[10px]">
          <span className="font-medium">Mo Atef</span>
          <p className="text-sm font-light">Hello from the other side </p>
        </div>
      </div>
    </div>
  );
}
