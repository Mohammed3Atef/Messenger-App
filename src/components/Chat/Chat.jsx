import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export default function Chat() {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  const handelEmoji = (e) => {
    setTextMessage((text) => text + e.emoji);
    setOpenEmoji(false);
  };
  console.log(textMessage);
  return (
    <div className="flex-[2] border-x border-x-[#dddddd35] h-full flex flex-col">
      <div className="p-5 flex items-center justify-between border-b border-b-[#dddddd35]">
        <div className="flex items-center gap-5">
          <img
            src="/public/mo.jpg"
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-[5px] 	">
            <span className="text-xl font-bold">Mo Atef</span>
            <p className="text-sm font-light text-[#a5a5a5]">
              Lorem ipsum dolor, sit amet.
            </p>
          </div>
        </div>
        <div className="flex gap-5 ">
          <img
            src="/public/phone.png"
            alt="phone"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src="/public/video.png"
            alt="video"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src="/public/info.png"
            alt="info"
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
      <div className="p-5 flex-1 overflow-auto flex flex-col gap-5">
        <div className="max-w-[70%] flex gap-5">
          <img
            src="/public/mo.jpg"
            alt="avatar"
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-[5px]">
            <p className=" p-5 bg-[rgba(17,25,40,0.3)] rounded-[10px] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              asperiores veritatis velit modi laudantium autem, minima
              exercitationem excepturi non molestias ab, doloremque animi
              facilis commodi dicta molestiae delectus aut ut!
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div className="max-w-[70%]  self-end">
          <div className="gap-[5px] flex flex-col">
            <p className="bg-[#5283fe] p-5 rounded-[10px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              asperiores veritatis velit modi laudantium autem, minima
              exercitationem excepturi non molestias ab, doloremque animi
              facilis commodi dicta molestiae delectus aut ut!
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div className="max-w-[70%] flex gap-5">
          <img
            src="/public/mo.jpg"
            alt="avatar"
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-[5px]">
            <p className=" p-5 bg-[rgba(17,25,40,0.3)] rounded-[10px] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              asperiores veritatis velit modi laudantium autem, minima
              exercitationem excepturi non molestias ab, doloremque animi
              facilis commodi dicta molestiae delectus aut ut!
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div className="max-w-[70%]  self-end">
          <div className="gap-[5px] flex flex-col">
            <p className="bg-[#5283fe] p-5 rounded-[10px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              asperiores veritatis velit modi laudantium autem, minima
              exercitationem excepturi non molestias ab, doloremque animi
              facilis commodi dicta molestiae delectus aut ut!
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div className="max-w-[70%] flex gap-5">
          <img
            src="/public/mo.jpg"
            alt="avatar"
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-[5px]">
            <p className=" p-5 bg-[rgba(17,25,40,0.3)] rounded-[10px] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              asperiores veritatis velit modi laudantium autem, minima
              exercitationem excepturi non molestias ab, doloremque animi
              facilis commodi dicta molestiae delectus aut ut!
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div className="max-w-[70%]  self-end">
          <div className="gap-[5px] flex flex-col">
            <p className="bg-[#5283fe] p-5 rounded-[10px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              asperiores veritatis velit modi laudantium autem, minima
              exercitationem excepturi non molestias ab, doloremque animi
              facilis commodi dicta molestiae delectus aut ut!
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div className="max-w-[70%] flex gap-5">
          <img
            src="/public/mo.jpg"
            alt="avatar"
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-[5px]">
            <p className=" p-5 bg-[rgba(17,25,40,0.3)] rounded-[10px] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              asperiores veritatis velit modi laudantium autem, minima
              exercitationem excepturi non molestias ab, doloremque animi
              facilis commodi dicta molestiae delectus aut ut!
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
        <div className="max-w-[70%]  self-end">
          <div className="gap-[5px] flex flex-col">
            <img
              src="/public/mo.jpg"
              alt=""
              className="w-full h-[300px] rounded-[10px] object-cover "
            />
            <p className="bg-[#5283fe] p-5 rounded-[10px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              asperiores veritatis velit modi laudantium autem, minima
              exercitationem excepturi non molestias ab, doloremque animi
              facilis commodi dicta molestiae delectus aut ut!
            </p>
            <span className="text-[13px]">1 min ago</span>
          </div>
        </div>
      </div>
      <div className="p-5 mt-auto flex items-center justify-between gap-5 border-t border-t-[#dddddd35]">
        <div className="flex gap-5">
          <img
            src="/public/img.png"
            alt="img"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src="/public/camera.png"
            alt="camera"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src="/public/mic.png"
            alt="mic"
            className="w-5 h-5 cursor-pointer"
          />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-[rgba(17,25,40,0.5)] border-0 outline-0 p-5 rounded-[10px] text-base "
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
        />
        <div className="relative">
          <img
            src="/public/emoji.png"
            alt="emoji"
            className="w-5 h-5 cursor-pointer"
            onClick={() => setOpenEmoji((open) => !open)}
          />
          <div className="absolute left-0 bottom-[50px]">
            <EmojiPicker open={openEmoji} onEmojiClick={handelEmoji} />
          </div>
        </div>
        <button className="bg-[#5183fe] px-5 py-2.5 border-0 rounded-[5px] cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
}
