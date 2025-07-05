import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

// Mock wallet connection for demo purposes
// In production, this would integrate with Aptos Wallet Adapter
export const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    // Mock wallet connection
    setIsConnected(true);
    setWalletAddress("0x1234...5678");
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
  };

  if (isConnected) {
    return (
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="bg-success/10 text-success px-3 py-1 rounded-xl text-sm font-medium">
          {walletAddress}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={disconnectWallet}
          className="text-muted-foreground hover:text-foreground"
        >
          Disconnect
        </Button>
      </motion.div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      className="btn-outline group"
    >
      <Wallet className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
      Connect Wallet
    </Button>
  );
};