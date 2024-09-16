"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

interface ProjectEntriesProps {
  projects: Project[];
}

export default function ProjectEntries({ projects }: ProjectEntriesProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow overflow-y-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Upcoming <span className="text-primary">Projects</span>
          </h1>
          <p className="text-md sm:text-lg text-center text-muted-foreground mb-8">
            Explore the latest projects in our initiative
          </p>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((post) => (
              <ProjectCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const ProjectCard: React.FC<{ post: Project }> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      style={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)`,
        borderTop: `4px solid hsl(142 76% 36%)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Pencil
          className={`h-12 w-12 transition-transform duration-300 ${
            isHovered ? "animate-bounce-three-times" : ""
          }`}
        />
        <div
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: `rgba(142, 76, 36, 0.1)`,
            color: `hsl(142 76% 36%)`,
          }}
        >
          New
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-bold mb-2">{post.title}</CardTitle>
        <CardDescription className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {post.description}
        </CardDescription>
        <button
          className="w-full text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            background: `hsl(142 76% 36%)`,
            boxShadow: `0 4px 14px 0 rgba(142, 76, 36, 0.35)`,
          }}
        >
          Learn More
        </button>
      </CardContent>
    </Card>
  );
};
