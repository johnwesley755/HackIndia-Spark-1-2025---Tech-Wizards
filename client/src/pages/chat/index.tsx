import { motion } from "framer-motion";
import ChatInterface from "@/components/chat/ChatInterface";

export default function Chat() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="text-3xl font-bold">Chat</h1>
        <p className="text-muted-foreground">
          Test and monitor AI conversations
        </p>
      </div>

      <ChatInterface />
    </motion.div>
  );
}
