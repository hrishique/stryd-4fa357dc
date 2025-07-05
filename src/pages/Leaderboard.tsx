import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Trophy, Star, Award, Activity, Users, Clock } from "lucide-react";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<"wins" | "distance" | "rewards">("wins");

  // Mock leaderboard data
  const leaderboards = {
    wins: [
      { rank: 1, name: "FitnessKing", address: "0x1234...5678", value: 45, streak: 8 },
      { rank: 2, name: "RunnerQueen", address: "0x2345...6789", value: 38, streak: 5 },
      { rank: 3, name: "CycleHero", address: "0x3456...7890", value: 32, streak: 12 },
      { rank: 4, name: "SwimChamp", address: "0x4567...8901", value: 28, streak: 3 },
      { rank: 5, name: "YogaMaster", address: "0x5678...9012", value: 25, streak: 7 },
      { rank: 6, name: "HikerPro", address: "0x6789...0123", value: 22, streak: 4 },
      { rank: 7, name: "SpeedDemon", address: "0x7890...1234", value: 19, streak: 2 },
      { rank: 8, name: "IronWill", address: "0x8901...2345", value: 16, streak: 6 }
    ],
    distance: [
      { rank: 1, name: "MarathonMike", address: "0x1111...1111", value: 2850, streak: 15 },
      { rank: 2, name: "UltraRunner", address: "0x2222...2222", value: 2640, streak: 22 },
      { rank: 3, name: "DistanceKing", address: "0x3333...3333", value: 2420, streak: 8 },
      { rank: 4, name: "EnduranceQueen", address: "0x4444...4444", value: 2180, streak: 12 },
      { rank: 5, name: "MileEater", address: "0x5555...5555", value: 1950, streak: 5 },
      { rank: 6, name: "LongHauler", address: "0x6666...6666", value: 1720, streak: 9 },
      { rank: 7, name: "SteadyPacer", address: "0x7777...7777", value: 1580, streak: 3 },
      { rank: 8, name: "ConsistentRunner", address: "0x8888...8888", value: 1350, streak: 11 }
    ],
    rewards: [
      { rank: 1, name: "CryptoAthlete", address: "0xaaaa...aaaa", value: 485.5, streak: 6 },
      { rank: 2, name: "TokenRunner", address: "0xbbbb...bbbb", value: 420.3, streak: 9 },
      { rank: 3, name: "APTCollector", address: "0xcccc...cccc", value: 380.7, streak: 14 },
      { rank: 4, name: "RewardHunter", address: "0xdddd...dddd", value: 325.2, streak: 4 },
      { rank: 5, name: "EarnAndBurn", address: "0xeeee...eeee", value: 298.9, streak: 7 },
      { rank: 6, name: "FitnessMogul", address: "0xffff...ffff", value: 275.1, streak: 13 },
      { rank: 7, name: "ChallengeChamp", address: "0x0000...0000", value: 250.8, streak: 2 },
      { rank: 8, name: "StakeWinner", address: "0x1010...1010", value: 225.6, streak: 8 }
    ]
  };

  const tabs = [
    { key: "wins" as const, label: "Most Wins", icon: Trophy, unit: "wins" },
    { key: "distance" as const, label: "Most Distance", icon: Activity, unit: "km" },
    { key: "rewards" as const, label: "Most Rewards", icon: Star, unit: "APT" }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-primary fill-current" />;
      case 2: return <Award className="w-6 h-6 text-muted-foreground" />;
      case 3: return <Star className="w-6 h-6 text-[#CD7F32]" />;
      default: return <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return "border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10";
      case 2: return "border-muted-foreground/20 bg-gradient-to-r from-muted/20 to-muted/30";
      case 3: return "border-[#CD7F32]/20 bg-gradient-to-r from-[#CD7F32]/5 to-[#CD7F32]/10";
      default: return "border-border";
    }
  };

  const currentLeaderboard = leaderboards[activeTab];

  // Mock user stats
  const userStats = {
    rank: 15,
    totalChallenges: 28,
    winRate: 78,
    currentStreak: 5
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container-stryd section-padding">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-section text-gradient mb-4">Leaderboard</h1>
          <p className="text-lg text-muted-foreground">
            Compete with the best athletes in the STRYD community
          </p>
        </motion.div>

        {/* User Stats */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="card-challenge">
            <h3 className="text-xl font-bold mb-6 text-center">Your Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-gradient">{userStats.rank}</div>
                <div className="text-sm text-muted-foreground">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="text-2xl font-bold text-gradient">{userStats.totalChallenges}</div>
                <div className="text-sm text-muted-foreground">Total Challenges</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-success to-success/80 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gradient">{userStats.winRate}%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-warning to-warning/80 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gradient">{userStats.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-2xl transition-all ${
                  activeTab === tab.key
                    ? "btn-primary"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {currentLeaderboard.map((entry, index) => (
            <motion.div
              key={entry.address}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
            >
              <Card className={`card-primary border-2 ${getRankStyle(entry.rank)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      {getRankIcon(entry.rank)}
                      <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <span className="font-bold text-primary-foreground text-lg">
                          {entry.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-bold text-lg">{entry.name}</div>
                      <div className="text-sm text-muted-foreground">{entry.address}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gradient">
                        {entry.value.toLocaleString()} {tabs.find(t => t.key === activeTab)?.unit}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {entry.streak} day streak
                      </div>
                    </div>
                    
                    {entry.rank <= 3 && (
                      <Badge className="bg-gradient-primary text-primary-foreground">
                        Top {entry.rank}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button variant="outline" className="px-8 py-3 rounded-2xl">
            Load More Athletes
          </Button>
        </motion.div>
      </div>
    </div>
  );
}