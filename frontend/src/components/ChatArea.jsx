import NavBar from "./NavBar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setArtifacts, setMessages } from "../redux/messageSlice";
import { getMessages } from "../features/getMessages";

function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  useEffect(() => {
    const displayMessages = async () => {
      if (selectedConversation) {
        if (selectedConversation.title == "New Chat") return;
        const data = await getMessages(selectedConversation?._id);
        dispatch(setMessages(data));
        const latestArtifactMessage = [...data]
          .reverse()
          .find((msg) => msg.artifacts && msg.artifacts.length > 0);
        dispatch(setArtifacts(latestArtifactMessage?.artifacts || []));
      }
    };
    displayMessages();
  }, [selectedConversation?._id]);
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <NavBar />
      <MessageList />
      <ChatInput />
    </div>
  );
}

export default ChatArea;
