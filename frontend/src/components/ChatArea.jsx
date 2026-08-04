import NavBar from "./NavBar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMessages } from "../redux/messageSlice";
import { getMessages } from "../features/getMessages";

function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  useEffect(() => {
    const displayMessages = async () => {
      if (selectedConversation) {
        const data = await getMessages(selectedConversation?._id);
        dispatch(setMessages(data));
      }
    };
    displayMessages();
  }, [selectedConversation]);
  return (
    <div className="flex-1 flex flex-col">
      <NavBar />
      <MessageList />
      <ChatInput />
    </div>
  );
}

export default ChatArea;
