import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";

// Mock Strava connection for demo purposes
// In production, this would integrate with Strava OAuth
export const StravaConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [stravaUser, setStravaUser] = useState("");

  const connectStrava = async () => {
    // Mock Strava connection
    setIsConnected(true);
    setStravaUser("athlete_123");
  };

  const disconnectStrava = () => {
    setIsConnected(false);
    setStravaUser("");
  };

  if (isConnected) {
    return (
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="bg-[#FC4C02]/10 text-[#FC4C02] px-3 py-1 rounded-xl text-sm font-medium flex items-center">
          <Activity className="w-3 h-3 mr-1" />
          {stravaUser}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={disconnectStrava}
          className="text-muted-foreground hover:text-foreground"
        >
          Disconnect
        </Button>
      </motion.div>
    );
  }

  return (
    <Button
      onClick={connectStrava}
      className="bg-[#FC4C02] hover:bg-[#E04402] text-white border-0 rounded-2xl px-4 py-2 font-semibold transition-all hover:scale-105"
    >
      <Activity className="w-4 h-4 mr-2" />
      Connect Strava
    </Button>
  );
};