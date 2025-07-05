import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Plus, Trophy, Clock, Users, Activity, Star } from "lucide-react";

export default function Dashboard() {
  // Mock data - in production this would come from API
  const userStats = {
    totalChallenges: 12,
    challengesWon: 8,
    totalRewards: 250.5,
    currentStreak: 5
  };

  const activeChallenges = [
    {
      id: 1,
      title: "10K Weekly Challenge",
      opponent: "athlete_456",
      metric: "distance",
      target: 10,
      progress: 7.2,
      timeLeft: "2 days",
      stake: 5,
      status: "active"
    },
    {
      id: 2,
      title: "100 Minutes Cardio",
      opponent: "runner_789",
      metric: "time",
      target: 100,
      progress: 85,
      timeLeft: "5 days",
      stake: 10,
      status: "winning"
    },
    {
      id: 3,
      title: "5K Speed Run",
      opponent: "cyclist_123",
      metric: "pace",
      target: 25,
      progress: 23.5,
      timeLeft: "1 day",
      stake: 15,
      status: "losing"
    }
  ];

  const recentAchievements = [
    {
      title: "Marathon Master",
      description: "Completed 5 marathon challenges",
      date: "2 days ago",
      reward: 50
    },
    {
      title: "Speed Demon",
      description: "Achieved personal best in 5K",
      date: "1 week ago",
      reward: 25
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "winning": return "text-success bg-success/10";
      case "losing": return "text-destructive bg-destructive/10";
      default: return "text-primary bg-primary/10";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container-stryd section-padding">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-section text-gradient mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Track your challenges and earnings</p>
          </div>
          <Link to="/create">
            <Button className="btn-primary">
              <Plus className="w-5 h-5 mr-2" />
              Create Challenge
            </Button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Challenges", value: userStats.totalChallenges, icon: Trophy },
            { label: "Challenges Won", value: userStats.challengesWon, icon: Star },
            { label: "Total Rewards", value: `${userStats.totalRewards} APT`, icon: Activity },
            { label: "Current Streak", value: `${userStats.currentStreak} days`, icon: Clock }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-primary text-center">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Challenges */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Active Challenges</h2>
              <div className="space-y-6">
                {activeChallenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="card-challenge">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>vs {challenge.opponent}</span>
                            <span>•</span>
                            <span>{challenge.stake} APT staked</span>
                            <span>•</span>
                            <span>{challenge.timeLeft} left</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(challenge.status)}>
                          {challenge.status}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span className="font-medium">
                            {challenge.progress}/{challenge.target} {challenge.metric === "distance" ? "km" : challenge.metric === "time" ? "min" : "min/km"}
                          </span>
                        </div>
                        <div className="progress-primary">
                          <motion.div
                            className="progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">1v1 Challenge</span>
                        </div>
                        <Link to={`/challenge/${challenge.id}`}>
                          <Button variant="outline" size="sm">View Details</Button>
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Achievements */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Recent Achievements</h2>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="card-primary">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                          <Trophy className="w-5 h-5 text-secondary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{achievement.date}</span>
                            <span className="text-sm font-bold text-primary">+{achievement.reward} APT</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}