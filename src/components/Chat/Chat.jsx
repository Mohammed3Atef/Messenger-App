import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../library/firebase";
import { useChatStore } from "../../library/chatStore";
import { useUserStore } from "../../library/userStore";
import upload from "../../library/upload";
export default function Chat() {
  const [chat, setChat] = useState({ messages: [] }); // Initialize with an empty array for messages
  const [openEmoji, setOpenEmoji] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages.length]); // Use chat.messages.length for dependency

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat({ messages: res.data().messages || [] }); // Ensure messages array is initialized
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
        url: URL.createObjectURL(e.target.files[0]), // Store URL locally for display
      });
    }
  };

  const handleSend = async () => {
    if (textMessage === "" && !img.url) return;

    if (isCurrentUserBlocked) {
      console.log("You are blocked and cannot send messages.");
      return;
    }

    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file); // Upload image and get URL from upload function
      }

      // Send message including image URL if uploaded, but only store locally if not blocked
      const newMessage = {
        senderId: currentUser.id,
        textMessage,
        createdAt: new Date(),
        ...(imgUrl && { img: imgUrl }), // Include img URL if uploaded
      };

      if (!isReceiverBlocked) {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion(newMessage),
        });
      }

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
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setImg({ file: null, url: "" }); // Clear image state after sending
      setTextMessage(""); // Clear text message state after sending
    }
  };

  return (
    <div className="flex-2 border-x border-x-[#dddddd35] h-full flex flex-col">
      <div className="p-5 flex items-center justify-between border-b border-b-[#dddddd35]">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || "/public/avatar.jpg"}
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-5">
            <span className="text-xl font-bold">{user?.username}</span>
            <p className="text-sm font-light text-[#a5a5a5]">
              {user?.status || "Online"}
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <img
            src="/public/phone.jpg"
            alt="phone"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src="/public/video.jpg"
            alt="video"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src="/public/info.jpg"
            alt="info"
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>

      <div className="p-5 flex-1 overflow-auto flex flex-col gap-5">
        {chat.messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.senderId === currentUser.id
                ? "self-end max-w-[70%] flex gap-5"
                : "self-start max-w-[70%] flex gap-5"
            }`}
          >
            {message.senderId !== currentUser?.id ? (
              <>
                <img
                  src={message.img || "/public/mo.jpg"}
                  alt="avatar"
                  className="w-[30px] h-[30px] rounded-full object-cover"
                />
                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="p-5 bg-[rgba(17,25,40,0.3)] rounded-[10px]">
                    {message.textMessage}
                  </p>
                  <span className="text-[13px]">
                    {new Date(
                      message.createdAt.seconds * 1000
                    ).toLocaleString()}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col gap-[5px]">
                {message.img && (
                  <img
                    src={message.img}
                    alt="Uploaded image"
                    className="rounded-[10px] max-w-[100%]"
                  />
                )}
                <p className="bg-[#5183fe] p-5 rounded-[10px]">
                  {message.textMessage}
                </p>
                <span className="text-[13px]">
                  {new Date(message.createdAt.seconds * 1000).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      <div className="p-5 mt-auto flex items-center justify-between gap-5 border-t border-t-[#dddddd35]">
        <div className="flex gap-5">
          <label htmlFor="file">
            <img
              src="/public/img.jpg"
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
            src="/public/camera.jpg"
            alt="camera"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src="/public/mic.jpg"
            alt="mic"
            className="w-5 h-5 cursor-pointer"
          />
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          className="flex-1 bg-[rgba(17,25,40,0.5)] border-0 outline-0 p-5 rounded-[10px] text-base disabled:cursor-not-allowed"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="relative">
          <img
            src="/public/emoji.jpg"
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
        <button
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          onClick={handleSend}
          className="bg-[#5183fe] px-5 py-2.5 border-0 rounded-[5px] cursor-pointer duration-[0.3s] hover:bg-[#0653b7] disabled:bg-[#5182feb4] disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
