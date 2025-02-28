import { faker } from "@faker-js/faker";

// Generate realistic looking stats
export const generateStats = () => ({
  totalConversations: faker.number.int({ min: 1000, max: 5000 }),
  responseTime: faker.number.float({ min: 0.8, max: 2.5, precision: 0.1 }),
  activeUsers: faker.number.int({ min: 500, max: 2000 }),
  satisfactionRate: faker.number.int({ min: 90, max: 99 })
});

// Generate weekly activity data
export const generateWeeklyActivity = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    date: day,
    conversations: faker.number.int({ min: 30, max: 100 })
  }));
};

export const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Customer Success Lead",
    email: "sarah@example.com",
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "AI Specialist",
    email: "michael@example.com",
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Support Agent",
    email: "emma@example.com",
    avatar: "EW"
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Technical Support",
    email: "james@example.com",
    avatar: "JW"
  }
];

export const integrations = [
  {
    id: "gmail",
    name: "Gmail",
    description: "Send and receive emails directly through the platform",
    connected: true,
    apiUsage: "75%"
  },
  {
    id: "slack",
    name: "Slack",
    description: "Real-time notifications and team collaboration",
    connected: true,
    apiUsage: "92%"
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM integration for customer data synchronization",
    connected: false,
    apiUsage: "0%"
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Process payments and handle refunds automatically",
    connected: true,
    apiUsage: "45%"
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Schedule and manage video meetings",
    connected: false,
    apiUsage: "0%"
  }
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
    timestamp: new Date(Date.now() - 300000)
  },
  {
    id: "2",
    content: "I'd be happy to help you with your subscription. Could you please provide your account email address?",
    sender: "ai",
    timestamp: new Date(Date.now() - 280000)
  },
  {
    id: "3",
    content: "My email is user@example.com",
    sender: "user",
    timestamp: new Date(Date.now() - 260000)
  },
  {
    id: "4",
    content: "I can see your subscription is currently active and set to renew on the 15th of next month. What specific aspect of your subscription would you like help with?",
    sender: "ai",
    timestamp: new Date(Date.now() - 240000)
  }
];