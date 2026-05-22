import { Button } from "@/shared/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import { Skeleton } from "@/shared/ui/skeleton";
import { Spinner } from "@/shared/ui/spinner";
import { EmptyState } from "@/shared/ui/empty-state";

function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard UI System
        </h1>

        <p className="mt-2 text-muted-foreground">
          Testing reusable production components.
        </p>
      </div>

      {/* Skeletons */}

      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-32 w-full" />

        <Skeleton className="h-32 w-full" />

        <Skeleton className="h-32 w-full" />
      </div>

      {/* Spinner */}

      <Card>
        <CardHeader>
          <CardTitle>Loading States</CardTitle>

          <CardDescription>Reusable spinner component.</CardDescription>
        </CardHeader>

        <CardContent>
          <Spinner className="h-8 w-8 text-primary" />
        </CardContent>
      </Card>

      {/* Empty State */}

      <EmptyState
        title="No courses enrolled"
        description="Start learning by enrolling in your first course."
        action={<Button>Browse Courses</Button>}
      />
    </div>
  );
}

export default StudentDashboard;
