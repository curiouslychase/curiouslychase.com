"use client";
import { FormattedDate } from "@/components/FormattedDate";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Article } from "@/utils/content/Article";
import { stages } from "@/utils/content/stages";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StageLabel } from "./StageLabel";

export const PostSummaryList = ({
  posts,
  displayFacets,
}: {
  posts: Array<Article>;
  displayFacets?: boolean;
}) => {
  const [stage, setStage] = useState<keyof typeof stages | "all">("all");
  const [selectedPosts, setSelectedPosts] = useState<Array<Article>>(posts);

  useEffect(() => {
    if (stage === "all") {
      setSelectedPosts(posts);
    } else {
      setSelectedPosts(posts.filter((post) => post.stage === stage));
    }
  }, [stage]);

  return (
    <div className="p-0 m-0 flex list-none gap-4 flex-wrap">
      {displayFacets ? (
        <div>
          <Popover>
            <PopoverTrigger
              asChild
              className="flex flex-row gap-2 items-center"
            >
              <Button variant="outline">
                {stage === "all" ? "Filter" : "Filtering"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-3">
                <Label>Stage of Completion</Label>
                <Select
                  value={stage}
                  onValueChange={(value) =>
                    setStage(value as keyof typeof stages)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"all"}>All</SelectItem>
                    {Object.keys(stages).map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stages[stage as keyof typeof stages].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
          <div className="pt-2 text-sm">
            {stage !== "all"
              ? `Showing ${selectedPosts.length} of ${posts.length} total`
              : null}
          </div>
        </div>
      ) : null}
      {selectedPosts
        .sort((a, b) => {
          if (a.stage && !b.stage) return -1;
          if (b.stage && !a.stage) return 1;
          return 0;
        })
        .map((post) => (
          <div
            className={cn(
              "w-full",
              "flex",
              "gap-2",
              "md:items-center",
              "flex-col",
              "md:flex-row",
              "border-b border-magenta-000 md:border-0 pb-4 md:pb-0"
            )}
            key={post.slug}
          >
            <div
              className={cn(
                "mt-auto",
                "flex",
                "gap-2",
                "items-center",
                "flex-row"
              )}
            >
              <small>
                <FormattedDate slug={post.slug} date={post.pubDate} />
              </small>
              {post.stage ? <StageLabel stage={post.stage} /> : null}
            </div>
            <Link
              href={`/posts/${post.slug}/`}
              className="flex flex-col h-full hover:text-purple-500 dark:hover:text-purple-200 transition-all duration-300 hover:transition-all"
            >
              <div>
                <div className={cn("text-base mt-0")}>{post.title}</div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};
