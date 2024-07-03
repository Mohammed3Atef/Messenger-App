export default function Detail() {
  return (
    <div className="flex-1">
      <div className="px-5 py-[30px] flex flex-col items-center gap-5 border-b border-b-[#dddddd35]">
        <img
          src="/public/mo.jpg"
          alt="avatar"
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <h2>Mo Atef</h2>
        <p>Lorem ipsum dolor sit amet..</p>
      </div>
      <div className="p-5 flex flex-col gap-2.5">
        <div className="">
          <div className="flex items-center justify-between">
            <span>Chat Settings</span>
            <img
              src="/public/arrowUp.png"
              alt="setting"
              className="w-[30px] h-[30px] bg-[rgba(17,25,40,0.4)] p-2.5 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span>Privacy % help</span>
            <img
              src="/public/arrowUp.png"
              alt="setting"
              className="w-[30px] h-[30px] bg-[rgba(17,25,40,0.4)] p-2.5 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span>Shared photos</span>
            <img
              src="/public/arrowDown.png"
              alt="setting"
              className="w-[30px] h-[30px] bg-[rgba(17,25,40,0.4)] p-2.5 rounded-full cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-5 mb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <img
                  src="/public/mo.jpg"
                  alt=""
                  className="w-[40px] h-[40px] rounded-[5px] object-cover"
                />
                <span className="text-sm text-[lightgray] font-light">
                  Mohammed.png
                </span>
              </div>
              <img
                src="/public/download.png"
                alt="download"
                className="w-[30px] h-[30px] bg-[rgba(17,25,40,0.4)] p-2.5 rounded-full cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <img
                  src="/public/mo.jpg"
                  alt=""
                  className="w-[40px] h-[40px] rounded-[5px] object-cover"
                />
                <span className="text-sm text-[lightgray] font-light">
                  Mohammed.png
                </span>
              </div>
              <img
                src="/public/download.png"
                alt="download"
                className="w-[30px] h-[30px] bg-[rgba(17,25,40,0.4)] p-2.5 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span>shared Files</span>
            <img
              src="/public/arrowUp.png"
              alt="setting"
              className="w-[30px] h-[30px] bg-[rgba(17,25,40,0.4)] p-2.5 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <button className="py-2.5 px-5 bg-[rgba(230,74,105,0.55)] text-white border-0 rounded-[5px] cursor-pointer duration-[0.3s] hover:bg-[rgba(220,20,60,0.796)]">
          Block User
        </button>
      </div>
    </div>
  );
}
