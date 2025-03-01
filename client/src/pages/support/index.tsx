import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

// Mock support tickets data
const supportTickets = [
  {
    id: "1",
    subject: "Login Issue",
    status: "Pending",
  },
  {
    id: "2",
    subject: "Billing Error",
    status: "Resolved",
  },
  {
    id: "3",
    subject: "Feature Request",
    status: "Pending",
  },
  {
    id: "4",
    subject: "Bug Report - Dashboard",
    status: "Resolved",
  },
];

export default function Support() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Support</h1>
        <p className="text-muted-foreground">Manage your support tickets</p>
      </div>

      {/* Support Tickets */}
      <SupportTickets />

      {/* Create New Ticket */}
      <Card className="p-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Need Help?</h3>
        <Button variant="default">Create Ticket</Button>
      </Card>
    </motion.div>
  );
}

function SupportTickets() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaHeadset /> Support Tickets
      </h3>
      <div className="space-y-3">
        {supportTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="font-medium">{ticket.subject}</span>
            <Badge
              variant={ticket.status === "Resolved" ? "default" : "secondary"}
            >
              {ticket.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
