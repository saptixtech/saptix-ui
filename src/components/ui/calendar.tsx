import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft as IconChevronLeft, ChevronRight as IconChevronRight } from 'lucide-react';

export interface CalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
}

export function Calendar({ className, selected = new Date(), onSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(selected));

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });

  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const isToday = (d: number) => {
    const today = new Date();
    return today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
  };

  const isSelected = (d: number) => {
    return selected.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year;
  };

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className={cn("p-4 rounded-2xl bg-card border border-border shadow-xl w-72 text-foreground/90", className)}>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="size-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <IconChevronLeft className="size-4" />
        </button>
        <span className="text-xs font-bold text-white">
          {monthName} {year}
        </span>
        <button
          onClick={nextMonth}
          className="size-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <IconChevronRight className="size-4" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground/80 mb-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="size-8" />
        ))}
        {Array.from({ length: totalDays }).map((_, i) => {
          const dayNum = i + 1;
          const selectedDay = isSelected(dayNum);
          const today = isToday(dayNum);

          return (
            <button
              key={dayNum}
              onClick={() => onSelect?.(new Date(year, month, dayNum))}
              className={cn(
                "size-8 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer",
                selectedDay
                  ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md shadow-[var(--primary-glow)]"
                  : today
                  ? "border border-[var(--primary)]/50 text-[var(--primary)] font-bold"
                  : "text-foreground/80 hover:bg-secondary hover:text-foreground"
              )}
            >
              {dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}
