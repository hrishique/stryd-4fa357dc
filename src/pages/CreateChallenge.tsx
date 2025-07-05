import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateChallenge() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    opponent: "",
    metric: "",
    target: "",
    startDate: "",
    endDate: "",
    stake: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock challenge creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const metrics = [
    { value: "distance", label: "Distance (km)" },
    { value: "time", label: "Duration (minutes)" },
    { value: "pace", label: "Average Pace (min/km)" },
    { value: "elevation", label: "Elevation Gain (m)" }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container-stryd section-padding">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-section text-gradient mb-4">Create New Challenge</h1>
            <p className="text-lg text-muted-foreground">
              Challenge a friend and stake APT tokens to motivate each other
            </p>
          </div>

          {/* Form */}
          <Card className="card-primary">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Challenge Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Challenge Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Challenge Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Weekly 10K Challenge"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add any additional rules or motivation..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="rounded-xl min-h-[100px]"
                  />
                </div>
              </div>

              {/* Opponent & Metric */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="opponent">Opponent Wallet Address</Label>
                  <Input
                    id="opponent"
                    placeholder="0x1234..."
                    value={formData.opponent}
                    onChange={(e) => handleInputChange("opponent", e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metric">Challenge Metric</Label>
                  <Select onValueChange={(value) => handleInputChange("metric", value)} required>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      {metrics.map((metric) => (
                        <SelectItem key={metric.value} value={metric.value}>
                          {metric.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Target & Dates */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="target">Target Value</Label>
                  <Input
                    id="target"
                    type="number"
                    placeholder="10"
                    value={formData.target}
                    onChange={(e) => handleInputChange("target", e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="rounded-xl"
                      required
                    />
                    <Calendar className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <div className="relative">
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      className="rounded-xl"
                      required
                    />
                    <Calendar className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Stake Amount */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Stake Amount</h3>
                <div className="space-y-2">
                  <Label htmlFor="stake">APT Tokens to Stake</Label>
                  <Input
                    id="stake"
                    type="number"
                    step="0.1"
                    placeholder="5.0"
                    value={formData.stake}
                    onChange={(e) => handleInputChange("stake", e.target.value)}
                    className="rounded-xl"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Both participants will stake this amount. Winner takes all!
                  </p>
                </div>
              </div>

              {/* Summary Card */}
              <motion.div
                className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h4 className="font-bold mb-4">Challenge Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Prize Pool:</span>
                    <div className="font-bold text-primary">
                      {formData.stake ? `${parseFloat(formData.stake) * 2} APT` : "0 APT"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Your Stake:</span>
                    <div className="font-bold text-secondary">
                      {formData.stake ? `${formData.stake} APT` : "0 APT"}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : null}
                  {isSubmitting ? "Creating Challenge..." : "Create Challenge"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}