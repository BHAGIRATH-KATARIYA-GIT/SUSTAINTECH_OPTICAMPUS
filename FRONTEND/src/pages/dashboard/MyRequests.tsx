import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

const mockRequests = [
  {
    id: 1,
    title: "Annual Tech Fest",
    date: "12 Feb 2026",
    status: "approved",
  },
  {
    id: 2,
    title: "AI Workshop",
    date: "18 Feb 2026",
    status: "pending",
  },
  {
    id: 3,
    title: "Coding Contest",
    date: "20 Feb 2026",
    status: "rejected",
  },
  {
    id: 4,
    title: "Robotics Club Meet",
    date: "02 Jan 2026",
    status: "approved",
  },
];

const statusConfig: any = {
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    class: "text-success bg-success/10",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    class: "text-warning bg-warning/10",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    class: "text-destructive bg-destructive/10",
  },
};

const MyRequestshistory = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleRequests = showAll
    ? mockRequests
    : mockRequests.slice(0, 3);

  return (
    <DashboardLayout userRole="student" userName="Arun">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">
            My Requests
          </h1>
          <p className="text-muted-foreground">
            Track all event requests you’ve submitted for approval
          </p>
        </div>

        {mockRequests.length > 2 && (
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All Requests"}
          </Button>
        )}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {visibleRequests.map((req, index) => {
          const StatusIcon = statusConfig[req.status].icon;

          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between hover:shadow-elegant transition-all"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {req.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Requested on {req.date}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${statusConfig[req.status].class}`}
                >
                  <StatusIcon className="w-4 h-4" />
                  {statusConfig[req.status].label}
                </div>

                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default MyRequestshistory;
