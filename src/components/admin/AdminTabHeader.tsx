import { LayoutGrid, List, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminTabHeaderProps {
  title: string;
  onSearch: (query: string) => void;
  onAdd?: () => void;
  view: "table" | "grid";
  onViewChange: (view: "table" | "grid") => void;
}

export const AdminTabHeader = ({
  title,
  onSearch,
  onAdd,
  view,
  onViewChange,
}: AdminTabHeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <h1 className="text-3xl font-black tracking-tighter">{title}</h1>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onViewChange(view === "table" ? "grid" : "table")}
        >
          {view === "table" ? (
            <LayoutGrid className="h-4 w-4" />
          ) : (
            <List className="h-4 w-4" />
          )}
        </Button>
        {onAdd && (
          <Button onClick={onAdd} className="gap-2">
            <Plus className="h-4 w-4" /> Add
          </Button>
        )}
      </div>
    </header>
  );
};
