import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FatArrowRight } from "@mynaui/icons-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";

interface Message {
  sender: string;
  message: string;
}

export function ChatBox() {
  const [message, setMessage] = useState<Message>();
  const [chatLog, setChatLog] = useState<Message[]>([]);

  async function handleSubmit() {
    console.log("Here is the message: ", message?.message);
    const response = await callAPI();
    if (message !== undefined) {
      updateChatLog(response);
    }
  }

  async function callAPI() {
    console.log("Making API call!");
    console.log("Message to API:", message);
    const data = await axios.post("http://localhost:3030/api", {
      coachMessage: message,
    });

    return data.data;
  }

  function updateChatLog(message: Message) {
    console.log("updating chat log to :", message);
    setChatLog((prev) => [...prev, message]);
    console.log(chatLog);
  }

  return (
    <Card className="flex p-10 border-red-200 items-center flex-col">
      <h1>Coaching Tool</h1>
      <div className="flex w-full max-w-sm items-center gap-2 flex-col">
        <div className="chatbox display flex flex-col">
          {chatLog?.map((chat, id) => {
            return (
              <div
                key={id}
                className={`${
                  chat.sender === "coach"
                    ? "bg-blue-500 mb-2 p-3 text-right rounded-md font-semibold text-white min-w-min"
                    : "bg-purple-500 mb-2 p-3 text-left rounded-md font-semibold text-white min-w-min"
                }`}
              >
                {chat.message}
              </div>
            );
          })}
        </div>
        <div>
          <Input
            id="input"
            type="input"
            placeholder="Say something..."
            onChange={(e) => {
              setMessage({
                sender: "coach",
                message: e.target.value,
              });
            }}
          />
          <Button
            type="submit"
            // variant=""
            onClick={() => {
              if (message) {
                console.log("here is the message!", message);
                updateChatLog(message);
                console.log("CHAT LOG UPDATE CALLED");
                // document?.getElementById("input")?.innerText = "";
              }
              handleSubmit();
            }}
          >
            <FatArrowRight />
          </Button>
        </div>
      </div>
    </Card>
  );
}
