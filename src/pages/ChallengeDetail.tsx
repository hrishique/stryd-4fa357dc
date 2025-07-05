import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Users, Activity, Star, Target } from "lucide-react";

export default function ChallengeDetail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<any>(null);

  // Mock data - in production this would come from API
  useEffect(() => {
    const mockChallenge = {
      id: parseInt(id || "1"),
      title: "10K Weekly Challenge",
      description: "Let's see who can cover more distance this week!",
      metric: "distance",
      target: 10,
      stake: 5,
      totalPrize: 10,
      startDate: "2024-01-15",
      endDate: "2024-01-22",
      status: "active",
      participants: [
        {
          id: "user",
          name: "You",
          address: "0x1234...5678",
          progress: 7.2,
          activities: [
            { date: "2024-01-15", distance: 3.2, type: "run" },
            { date: "2024-01-16", distance: 2.5, type: "run" },
            { date: "2024-01-17", distance: 1.5, type: "walk" }
          ]
        },
        {
          id: "opponent",
          name: "athlete_456",
          address: "0x9876...4321",
          progress: 5.8,
          activities: [
            { date: "2024-01-15", distance: 2.8, type: "run" },
            { date: "2024-01-16", distance: 3.0, type: "run" }
          ]
        }
      ]
    };
    setChallenge(mockChallenge);
  }, [id]);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full spin-animation mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading challenge...</p>
        </div>
      </div>
    );
  }

  const user = challenge.participants[0];
  const opponent = challenge.participants[1];
  const isWinning = user.progress > opponent.progress;
  const daysLeft = Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container-stryd section-padding">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-section text-gradient mb-2">{challenge.title}</h1>
              <p className="text-muted-foreground">{challenge.description}</p>
            </div>
            <Badge className={isWinning ? "text-success bg-success/10" : "text-warning bg-warning/10"}>
              {isWinning ? "Winning" : "Behind"}
            </Badge>
          </div>

          {/* Challenge Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="card-primary text-center">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold">{challenge.target} km</div>
              <div className="text-sm text-muted-foreground">Target</div>
            </Card>
            <Card className="card-primary text-center">
              <Trophy className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="text-lg font-bold">{challenge.totalPrize} APT</div>
              <div className="text-sm text-muted-foreground">Prize Pool</div>
            </Card>
            <Card className="card-primary text-center">
              <Clock className="w-6 h-6 text-warning mx-auto mb-2" />
              <div className="text-lg font-bold">{daysLeft}</div>
              <div className="text-sm text-muted-foreground">Days Left</div>
            </Card>
            <Card className="card-primary text-center">
              <Users className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-lg font-bold">1v1</div>
              <div className="text-sm text-muted-foreground">Challenge</div>
            </Card>
          </div>
        </motion.div>

        {/* Progress Comparison */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Progress Comparison</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {challenge.participants.map((participant: any, index: number) => (
              <Card key={participant.id} className="card-challenge">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      index === 0 ? "bg-gradient-primary" : "bg-gradient-secondary"
                    }`}>
                      <span className="font-bold text-white">
                        {participant.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold">{participant.name}</div>
                      <div className="text-sm text-muted-foreground">{participant.address}</div>
                    </div>
                  </div>
                  {index === 0 && participant.progress > opponent.progress && (
                    <Star className="w-5 h-5 text-primary fill-current" />
                  )}
                  {index === 1 && participant.progress > user.progress && (
                    <Star className="w-5 h-5 text-primary fill-current" />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="font-bold text-lg">
                      {participant.progress.toFixed(1)} / {challenge.target} km
                    </span>
                  </div>
                  
                  <div className="progress-primary">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(participant.progress / challenge.target) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    />
                  </div>

                  <div className="text-center">
                    <span className="text-2xl font-bold text-gradient">
                      {((participant.progress / challenge.target) * 100).toFixed(1)}%
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">completed</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Recent Activities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {challenge.participants.map((participant: any, index: number) => (
              <Card key={participant.id} className="card-primary">
                <h3 className="font-bold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  {participant.name}'s Activities
                </h3>
                <div className="space-y-3">
                  {participant.activities.map((activity: any, activityIndex: number) => (
                    <div key={activityIndex} className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
                      <div>
                        <div className="font-medium">{activity.distance} km</div>
                        <div className="text-sm text-muted-foreground capitalize">{activity.type}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.date}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex space-x-4">
            <Button variant="outline">
              Share Challenge
            </Button>
            <Button className="btn-primary">
              View on Strava
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}