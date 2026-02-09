import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { userName } from "./StudentDashboard";
import { 
  ScanLine, 
  Wrench, 
  Lightbulb, 
  Droplets, 
  Wind,
  Plug,
  Camera,
  CheckCircle2,
  Leaf,
  QrCode
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const issueTypes = [
  { id: "light", label: "Lighting Issue", icon: Lightbulb },
  { id: "ac", label: "AC Problem", icon: Wind },
  { id: "water", label: "Water Leak", icon: Droplets },
  { id: "electrical", label: "Electrical", icon: Plug },
  { id: "other", label: "Other", icon: Wrench },
];

const MaintenanceReportPage = () => {
  const [step, setStep] = useState<"scan" | "form" | "success">("scan");
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Room A-201");

  const handleScan = () => {
    // Simulate QR scan
    setLocation("Room A-201");
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <DashboardLayout userRole="student" userName={userName}>
      <div className="max-w-2xl mx-auto">
        {step === "scan" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-6">
                <ScanLine className="w-10 h-10 text-warning" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">Snap & Fix</h2>
              <p className="text-muted-foreground mb-8">
                Scan the QR code in the room or washroom to report an issue quickly.
              </p>

              {/* QR Scanner placeholder */}
              <div className="relative bg-muted rounded-2xl aspect-square max-w-xs mx-auto mb-6 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-4 border-2 border-dashed border-primary/40 rounded-xl" />
                <motion.div
                  className="absolute h-0.5 bg-primary/50 left-4 right-4"
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <QrCode className="w-16 h-16 text-muted-foreground" />
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Point your camera at the QR code
              </p>

              <Button variant="hero" size="lg" onClick={handleScan} className="w-full">
                <Camera className="mr-2 w-5 h-5" />
                Open Camera
              </Button>

              <div className="mt-6 pt-6 border-t border-border">
                <Button variant="outline" onClick={() => setStep("form")}>
                  Enter Location Manually
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location Detected</p>
                  <p className="font-semibold">{location}</p>
                </div>
              </div>

              <h2 className="font-display text-2xl font-bold mb-2">Report an Issue</h2>
              <p className="text-muted-foreground mb-6">
                Select the type of issue and provide details.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label>Issue Type</Label>
                  <RadioGroup
                    value={selectedIssue}
                    onValueChange={setSelectedIssue}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    {issueTypes.map((issue) => (
                      <Label
                        key={issue.id}
                        htmlFor={issue.id}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedIssue === issue.id
                            ? "border-warning bg-warning/5"
                            : "border-border hover:border-warning/30"
                        }`}
                      >
                        <RadioGroupItem value={issue.id} id={issue.id} className="sr-only" />
                        <issue.icon className={`w-6 h-6 ${selectedIssue === issue.id ? "text-warning" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-medium text-center ${selectedIssue === issue.id ? "text-warning" : ""}`}>
                          {issue.label}
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional details about the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep("scan")}>
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    variant="accent" 
                    size="lg" 
                    className="flex-1"
                    disabled={!selectedIssue}
                  >
                    Submit Report
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">Issue Reported!</h2>
              <p className="text-muted-foreground mb-6">
                The maintenance team has been notified and will address the issue shortly.
              </p>

              <div className="bg-muted rounded-xl p-4 mb-6 text-left">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Ticket ID</span>
                  <span className="text-sm font-mono font-medium">#MT-2024-0156</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm font-medium">{location}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Issue Type</span>
                  <span className="text-sm font-medium capitalize">{selectedIssue || "AC Problem"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm font-medium text-warning">Open</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-primary mb-6 p-4 bg-primary/5 rounded-xl">
                <Leaf className="w-5 h-5" />
                <span className="text-sm font-medium">+10 Green Points earned for reporting!</span>
              </div>

              {/* QR Code for tracking */}
              <div className="bg-white p-4 rounded-xl inline-block mb-6">
                <QRCodeSVG 
                  value="https://opticampus.app/ticket/MT-2024-0156" 
                  size={120}
                  level="M"
                />
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Scan to track your ticket status
              </p>

              <Button variant="hero" size="lg" onClick={() => setStep("scan")} className="w-full">
                Report Another Issue
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MaintenanceReportPage;
