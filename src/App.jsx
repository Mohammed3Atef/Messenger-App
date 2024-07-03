import "./App.css";
import List from "./components/List/List";
import Chat from "./components/Chat/Chat";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <div className="w-[90vw] h-[90vh] rounded-xl bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] border border-solid border-[rgba(225,225,255,0.125)] flex ">
      <List />
      <Chat />
      <Detail />
    </div>
  );
}

export default App;
