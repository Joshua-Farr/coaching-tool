import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export function ChatBox() {
  const [message, setMessage] = useState<string>();
  // const [chatLog, setChatLog] = useState<string[]>();

  async function handleSubmit() {
    console.log("Here is the message: ", message);
    //call API
    const response = await callAPI();
    // setChatLog([chatLog, response]);
    return response;
  }

  async function callAPI() {
    console.log("Making API call!");
    console.log("Message to API:", message);
    const data = await axios.post("http://localhost:3030/api", {
      coachMessage: message,
    });

    return data;
  }

  return (
    <Card
      className="flex p-10 border-red-200 items-center flex-col
"
    >
      <h1>Coaching Tool</h1>
      <div className="flex w-full max-w-sm items-center gap-2">
        <div id="chatbox">{message}</div>
        <Input
          type="input"
          placeholder="Say something..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button
          type="submit"
          // variant=""
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </div>
    </Card>
  );
}
