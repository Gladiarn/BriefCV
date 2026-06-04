import React from 'react';

export default function TimeRangeFilter({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
    >
      <option value="7d">Last 7 Days</option>
      <option value="30d">Last 30 Days</option>
      <option value="1y">Last Year</option>
    </select>
  );
}
