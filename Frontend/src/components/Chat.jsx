import React from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center bg-base-200 mb-24">

      <div className="w-full max-w-3xl h-full bg-violet-200 shadow-xl flex flex-col">

        {/* Header */}
        <div className="bg-blue-300 text-center py-4 text-lg font-semibold">
          Chat
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          <div className="chat chat-start">
            <div className="chat-header">
              Anmol Dubey
              <time className="text-xs opacity-50 ml-2">2 hours ago</time>
            </div>
            <div className="chat-bubble bg-orange-200">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>

          <div className="chat chat-start">
            <div className="chat-header">
              Anmol Dubey
              <time className="text-xs opacity-50 ml-2">2 hour ago</time>
            </div>
            <div className="chat-bubble bg-orange-200">I loved you.</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>

        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2 bg-base-200">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full"
          />

          <button className="btn btn-primary px-6 bg-pink-400">
            Send
          </button>
        </div>

      </div>

    </div>
  );
};

export default Chat;