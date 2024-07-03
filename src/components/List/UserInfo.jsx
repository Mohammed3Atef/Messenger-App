export default function UserInfo() {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center gap-5">
        <img
          src="/public/mo.jpg"
          alt="user image"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <h2 className="">Mohammed Atef</h2>
      </div>
      <div className="flex gap-5">
        <img
          src="/public/more.png"
          alt="more.."
          className="w-5 h-5 cursor-pointer"
        />
        <img
          src="/public/video.png"
          alt="video"
          className="w-5 h-5 cursor-pointer"
        />
        <img
          src="/public/edit.png"
          alt="edit"
          className="w-5 h-5 cursor-pointer"
        />
      </div>
    </div>
  );
}
