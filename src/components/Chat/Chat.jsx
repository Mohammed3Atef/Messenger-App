import EmojiPicker from "emoji-picker-react";
import {
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../library/firebase";
import { useChatStore } from "../../library/chatStore";
import { useUserStore } from "../../library/userStore";
import upload from "../../library/upload";

export default function Chat() {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [chat, setChat] = useState();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setTextMessage((text) => text + e.emoji);
    setOpenEmoji(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (textMessage === "") return;

    try {
      let imgUrl = null;
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      const newMessage = {
        senderId: currentUser.id,
        text: textMessage,
        createdAt: new Date(),
        ...(imgUrl && { img: imgUrl }),
      };

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion(newMessage),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = textMessage;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }

    setImg({ file: null, url: "" });
    setTextMessage("");
  };

  return (
    <div className="flex-[2] border-x border-x-[#dddddd35] h-full flex flex-col">
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-b-[#dddddd35]">
        {/* User Info */}
        <div className="flex items-center gap-5">
          <img
            src="/public/mo.jpg"
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-[5px]">
            <span className="text-xl font-bold">Mo Atef</span>
            <p className="text-sm font-light text-[#a5a5a5]">
              Lorem ipsum dolor, sit amet.
            </p>
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-5">
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

      {/* Messages */}
      <div className="p-5 flex-1 overflow-auto flex flex-col gap-5">
        {chat?.messages?.map((message) => (
          <div key={message?.createdAt}>
            {message.senderId !== currentUser?.id ? (
              <div className="max-w-[70%] flex gap-5 self-start">
                <img
                  src={message.img || "/public/mo.jpg"}
                  alt="avatar"
                  className="w-[30px] h-[30px] rounded-full object-cover"
                />
                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="p-5 bg-[rgba(17,25,40,0.3)] rounded-[10px]">
                    {message.text}
                  </p>
                  <span className="text-[13px]">
                    {new Date(
                      message.createdAt.seconds * 1000
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="max-w-[70%] self-end flex gap-5">
                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="bg-[#5283fe] p-5 rounded-[10px]">
                    {message.text}
                  </p>
                  <span className="text-[13px]">
                    {new Date(
                      message.createdAt.seconds * 1000
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
        {img.url && (
          <div className="max-w-[70%] self-end">
            <div className="gap-[5px] flex flex-col">
              <img
                src={img.url}
                alt="Uploaded image"
                className="rounded-[10px]"
              />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>

      {/* Footer */}
      <div className="p-5 mt-auto flex items-center justify-between gap-5 border-t border-t-[#dddddd35]">
        {/* Media Icons */}
        <div className="flex gap-5">
          <label htmlFor="file">
            <img
              src="/public/img.png"
              alt="img"
              className="w-5 h-5 cursor-pointer"
            />
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            onChange={handleImg}
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
        {/* Text Input */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-[rgba(17,25,40,0.5)] border-0 outline-0 p-5 rounded-[10px] text-base"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
        />
        {/* Emoji Picker */}
        <div className="relative">
          <img
            src="/public/emoji.png"
            alt="emoji"
            className="w-5 h-5 cursor-pointer"
            onClick={() => setOpenEmoji((open) => !open)}
          />
          {openEmoji && (
            <div className="absolute left-0 bottom-[50px]">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        {/* Send Button */}
        <button
          onClick={handleSend}
          className="bg-[#5183fe] px-5 py-2.5 border-0 rounded-[5px] cursor-pointer duration-[0.3s] hover:bg-[#0653b7]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
