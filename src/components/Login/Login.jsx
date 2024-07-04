import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../../library/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../library/upload";

export default function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    // VALIDATE INPUTS
    if (!username || !email || !password)
      return toast.warn("Please enter inputs!");
    if (!avatar.file) return toast.warn("Please upload an avatar!");

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return toast.warn("Select another username");
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
      toast.success("Account created! You can login now!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center gap-[100px]">
      <div className="flex-1 flex flex-col items-center gap-5">
        <h2>Welcome back,</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-5 border-0 outline-0 bg-[rgba(17,25,40,0.6)] text-white rounded-[5px]"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-5 border-0 outline-0 bg-[rgba(17,25,40,0.6)] text-white rounded-[5px]"
          />
          <button
            disabled={loading}
            className="w-full p-5 border-0 bg-[#1f8efa] rounded-[5px] cursor-pointer font-medium disabled:cursor-not-allowed disabled:bg-[#1f8ff19c]"
          >
            {loading ? "Loading" : "Sign In"}
          </button>
        </form>
      </div>
      <div className="h-[80%] w-[2px] bg-[#dddddd35]"></div>
      <div className="flex-1 flex flex-col items-center gap-5">
        <h2>Create an Account</h2>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center gap-5"
        >
          <label
            htmlFor="file"
            className="w-full flex items-center justify-between cursor-pointer underline"
          >
            <img
              src={avatar.url || "/public/avatar.jpg"}
              alt="avatar"
              className="w-[50px] h-[50px] rounded-[10px] object-cover opacity-60"
            />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="p-5 border-0 outline-0 bg-[rgba(17,25,40,0.6)] text-white rounded-[5px]"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-5 border-0 outline-0 bg-[rgba(17,25,40,0.6)] text-white rounded-[5px]"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-5 border-0 outline-0 bg-[rgba(17,25,40,0.6)] text-white rounded-[5px]"
          />
          <button
            disabled={loading}
            className="w-full p-5 border-0 bg-[#1f8efa] rounded-[5px] cursor-pointer font-medium disabled:cursor-not-allowed disabled:bg-[#1f8ff19c]"
          >
            {loading ? "Loading" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
