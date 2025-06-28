"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search images by title, description, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardContent>
    </Card>
  );
}
