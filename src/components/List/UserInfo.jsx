import { useUserStore } from "../../library/userStore";
import edit from "../../assets/imgs/edit.jpg";
import more from "../../assets/imgs/more.jpg";
import video from "../../assets/imgs/video.jpg";

export default function UserInfo() {
  const { currentUser } = useUserStore();

  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center gap-5">
        <img
          src={currentUser.avatar || "/public/avatar.jpg"}
          alt="user image"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="flex gap-5">
        <img src={more} alt="more.." className="w-5 h-5 cursor-pointer" />
        <img src={video} alt="video" className="w-5 h-5 cursor-pointer" />
        <img src={edit} alt="edit" className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}
