import React from "react";

const ActivityCalendar = ({
  data,
}: {
  data: { date: string; count: number }[];
}) => {
  // Generate last 90 days
  const days = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    days.push(date.toISOString().slice(0, 10));
  }

  const getColor = (count: number) => {
    if (count === 0) return "bg-secondary";
    if (count < 2) return "bg-pink-200";
    if (count < 5) return "bg-pink-400";
    return "bg-pink-600";
  };

  return (
    <div className="flex flex-wrap gap-1">
      {days.map((date) => {
        const activity = data.find((d) => d.date === date);
        const count = activity ? activity.count : 0;
        return (
          <div
            key={date}
            className={`w-3 h-3 rounded-sm ${getColor(count)}`}
            title={`${date}: ${count} logins`}
          />
        );
      })}
    </div>
  );
};

export default ActivityCalendar;
