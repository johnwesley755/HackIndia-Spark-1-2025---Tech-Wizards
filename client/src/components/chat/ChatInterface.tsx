import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaPaperPlane,
  FaSpinner,
  FaPhone,
  FaTimes,
  FaFileUpload,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Howl } from "howler";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  fileUrl?: string;
}

const agents = [
  { id: "passport", name: "Customer Support", icon: <FaRobot /> },
  { id: "tax", name: "Insurance Claims Adjuster", icon: <FaRobot /> },
  { id: "banking", name: "Tech Support", icon: <FaRobot /> },
  { id: "insurance", name: "Revenue Recovery", icon: <FaRobot /> },
  { id: "education", name: "Educational Services", icon: <FaRobot /> },
  { id: "healthcare", name: "Healthcare Guidance", icon: <FaRobot /> },
  { id: "legal", name: "Legal Advice", icon: <FaRobot /> },
  { id: "transport", name: "Transport Services", icon: <FaRobot /> },
];

const aiResponses: { [key: string]: string[] } = {
  passport: [
    "How can I assist you with customer support?",
    "Any account issues?",
  ],
  tax: [
    "Let's discuss your insurance claims.",
    "Need details on insurance processing?",
  ],
  banking: [
    "Having trouble with transactions?",
    "I can assist with banking queries.",
  ],
  insurance: [
    "Need help with revenue recovery?",
    "Let's discuss lost revenue strategies.",
  ],
  education: [
    "Looking for study resources?",
    "What subjects do you need help with?",
  ],
  healthcare: [
    "Let's discuss healthcare options.",
    "Do you have any medical queries?",
  ],
  legal: [
    "Do you need legal advice?",
    "Tell me your legal concerns, and I'll help.",
  ],
  transport: [
    "Looking for transportation services?",
    "Let me help with travel needs!",
  ],
};

// Sound notification
const messageSound = new Howl({ src: ["/message.mp3"] });

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(agents[0].id);
  const [isTyping, setIsTyping] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages[selectedAgent]]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedAgent]: [...(prev[selectedAgent] || []), userMessage],
    }));

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse =
        aiResponses[selectedAgent][
          Math.floor(Math.random() * aiResponses[selectedAgent].length)
        ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedAgent]: [...(prev[selectedAgent] || []), aiMessage],
      }));

      setIsTyping(false);
      messageSound.play();
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileMessage: Message = {
      id: Date.now().toString(),
      content: `Uploaded: ${file.name}`,
      sender: "user",
      timestamp: new Date(),
      fileUrl: URL.createObjectURL(file),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedAgent]: [...(prev[selectedAgent] || []), fileMessage],
    }));
  };

  const handleCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
    }, 10000); // Simulate call duration
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-800 bg-black p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Services</h2>
        {agents.map((agent) => (
          <motion.button
            key={agent.id}
            onClick={() => setSelectedAgent(agent.id)}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all hover:bg-gray-900 ${
              selectedAgent === agent.id ? "bg-gray-800 font-semibold" : ""
            }`}
          >
            {agent.icon}
            {agent.name}
          </motion.button>
        ))}
      </div>

      {/* Chat Section */}
      <Card className="flex flex-col flex-1 bg-black border border-gray-800 shadow-lg rounded-xl">
        <div className="p-4 border-b border-gray-800 bg-black text-lg font-bold text-center">
          {agents.find((a) => a.id === selectedAgent)?.name}
        </div>

        {/* Chat Container with Background Image */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{
            backgroundImage: `url('/chat-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <AnimatePresence>
            {(messages[selectedAgent] || []).map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-black text-gray-400">
                      {message.sender === "user" ? "U" : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      message.sender === "user"
                        ? "bg-blue-700 text-white"
                        : "bg-gray-800 text-gray-300"
                    }`}
                  >
                    {message.fileUrl ? (
                      <a
                        href={message.fileUrl}
                        download
                        className="underline text-blue-400"
                      >
                        {message.content}
                      </a>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-800 bg-black flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-black text-white border border-gray-700 px-4 py-2"
          />
          <Button onClick={handleSend} className="bg-blue-700">
            <FaPaperPlane />
          </Button>
          <Button onClick={handleCall} className="bg-green-700">
            <FaPhone />
          </Button>
        </div>
      </Card>
    </div>
  );
}
