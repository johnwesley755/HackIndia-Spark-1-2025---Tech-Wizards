import { faker } from "@faker-js/faker";

// Generate realistic-looking stats
export const generateStats = () => ({
  totalConversations: faker.number.int({ min: 1000, max: 5000 }),
  responseTime: faker.number.float({ min: 0.8, max: 2.5, fractionDigits: 1 }),
  activeUsers: faker.number.int({ min: 500, max: 2000 }),
  satisfactionRate: faker.number.int({ min: 90, max: 99 }),
  newUsers: faker.number.int({ min: 50, max: 300 }),
  messagesSent: faker.number.int({ min: 5000, max: 20000 }),
  retentionRate: faker.number.float({ min: 60, max: 95, fractionDigits: 1 }),
  peakTraffic: faker.number.int({ min: 1000, max: 7000 }),
});
type SummaryType = "positive" | "negative";

interface SummaryItem {
  title: string;
  value: string;
  change: string;
  type: SummaryType;
}

export const summaryData: SummaryItem[] = [
  { title: "Total Users", value: "15,230", change: "+8%", type: "positive" },
  { title: "Revenue", value: "$125,900", change: "+12%", type: "positive" },
  { title: "Active Chats", value: "4,567", change: "-3%", type: "negative" },
];

export const reportsData = [
  {
    id: 1,
    name: "Monthly Sales Report",
    date: "Feb 25, 2025",
    status: "Completed",
  },
  { id: 2, name: "User Engagement", date: "Feb 20, 2025", status: "Pending" },
  {
    id: 3,
    name: "Revenue Insights",
    date: "Feb 18, 2025",
    status: "Completed",
  },
];

// Generate weekly activity data
export const generateWeeklyActivity = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    date: day,
    conversations: faker.number.int({ min: 30, max: 100 }),
    activeUsers: faker.number.int({ min: 200, max: 1000 }),
    messagesSent: faker.number.int({ min: 1000, max: 5000 }),
  }));
};

// Team members data
export const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Customer Success Lead",
    email: "sarah@example.com",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "AI Specialist",
    email: "michael@example.com",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Support Agent",
    email: "emma@example.com",
    avatar: "EW",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Technical Support",
    email: "james@example.com",
    avatar: "JW",
  },
  {
    id: 5,
    name: "Olivia Brown",
    role: "Product Manager",
    email: "olivia@example.com",
    avatar: "OB",
  },
];

// Integration services
export const integrations = [
  {
    id: "gmail",
    name: "Gmail",
    description: "Send and receive emails directly through the platform",
    connected: true,
    apiUsage: `${faker.number.int({ min: 50, max: 90 })}%`,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Real-time notifications and team collaboration",
    connected: true,
    apiUsage: `${faker.number.int({ min: 70, max: 95 })}%`,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM integration for customer data synchronization",
    connected: false,
    apiUsage: "0%",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Process payments and handle refunds automatically",
    connected: true,
    apiUsage: `${faker.number.int({ min: 30, max: 60 })}%`,
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Schedule and manage video meetings",
    connected: false,
    apiUsage: "0%",
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Customer support ticketing and issue tracking",
    connected: true,
    apiUsage: `${faker.number.int({ min: 40, max: 80 })}%`,
  },
];

// Mock conversation data
export type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export const mockConversation: Message[] = [
  {
    id: "1",
    content: "Hi, I need help with my subscription",
    sender: "user",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "2",
    content:
      "I'd be happy to help you with your subscription. Could you please provide your account email address?",
    sender: "ai",
    timestamp: new Date(Date.now() - 280000),
  },
  {
    id: "3",
    content: "My email is user@example.com",
    sender: "user",
    timestamp: new Date(Date.now() - 260000),
  },
  {
    id: "4",
    content:
      "I can see your subscription is currently active and set to renew on the 15th of next month. What specific aspect of your subscription would you like help with?",
    sender: "ai",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: "5",
    content: "I want to upgrade my plan to premium",
    sender: "user",
    timestamp: new Date(Date.now() - 220000),
  },
  {
    id: "6",
    content:
      "Sure! I can upgrade your plan. The Premium plan includes advanced features. Would you like me to proceed?",
    sender: "ai",
    timestamp: new Date(Date.now() - 200000),
  },
  {
    id: "7",
    content: "Yes, please proceed with the upgrade.",
    sender: "user",
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: "8",
    content:
      "Your plan has been successfully upgraded to Premium. You will be charged on your next billing cycle.",
    sender: "ai",
    timestamp: new Date(Date.now() - 160000),
  },
];

// Generate top agents
export const generateTopAgents = () => [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Support Lead",
    rating: faker.number.float({ min: 4.5, max: 5.0, fractionDigits: 1 }),
    responseTime: faker.number.float({ min: 1.0, max: 3.0, fractionDigits: 1 }),
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Support",
    rating: faker.number.float({ min: 4.3, max: 5.0, fractionDigits: 1 }),
    responseTime: faker.number.float({ min: 1.2, max: 2.8, fractionDigits: 1 }),
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "AI Trainer",
    rating: faker.number.float({ min: 4.2, max: 4.9, fractionDigits: 1 }),
    responseTime: faker.number.float({ min: 1.5, max: 3.5, fractionDigits: 1 }),
  },
];

// Fetch system health status
export const fetchSystemHealth = () => ({
  api: Math.random() > 0.1,
  database: Math.random() > 0.05,
});

// Generate recent support tickets
export const generateRecentTickets = () => [
  { id: 1, subject: "Login Issue", user: "John Doe", status: "Open" },
  {
    id: 2,
    subject: "Billing Query",
    user: "Jane Smith",
    status: "In Progress",
  },
  { id: 3, subject: "Feature Request", user: "Mike Ross", status: "Resolved" },
];

// Export all mock data functions
export const generateSimpleWeeklyActivity = () => [
  { date: "Mon", conversations: faker.number.int({ min: 30, max: 100 }) },
  { date: "Tue", conversations: faker.number.int({ min: 40, max: 120 }) },
  { date: "Wed", conversations: faker.number.int({ min: 50, max: 130 }) },
  { date: "Thu", conversations: faker.number.int({ min: 60, max: 140 }) },
  { date: "Fri", conversations: faker.number.int({ min: 70, max: 150 }) },
  { date: "Sat", conversations: faker.number.int({ min: 80, max: 160 }) },
  { date: "Sun", conversations: faker.number.int({ min: 90, max: 170 }) },
];
