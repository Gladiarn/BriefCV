"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i);

    const changeMonth = (monthIndex: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    };

    const changeYear = (year: number) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    };

    const days: (number | null)[] = Array.from({ length: firstDayOfMonth }, () => null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            {/* Controls */}
            <div className="flex items-center justify-center mb-6 gap-2">
                <select
                    value={currentDate.getMonth()}
                    onChange={(e) => changeMonth(parseInt(e.target.value))}
                    className="bg-secondary text-sm font-bold py-1.5 px-3 rounded-lg border border-border outline-none focus:ring-2 focus:ring-primary"
                >
                    {monthNames.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
                <select
                    value={currentDate.getFullYear()}
                    onChange={(e) => changeYear(parseInt(e.target.value))}
                    className="bg-secondary text-sm font-bold py-1.5 px-3 rounded-lg border border-border outline-none focus:ring-2 focus:ring-primary"
                >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>

            {/* Grid Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day} className="flex justify-center items-center h-6">{day}</div>)}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
                {days.map((day, i) => {
                    const isToday = day === new Date().getDate() &&
                                   currentDate.getMonth() === new Date().getMonth() &&
                                   currentDate.getFullYear() === new Date().getFullYear();
                    return (
                        <div
                            key={i}
                            className={`flex items-center justify-center h-8 w-8 text-xs font-bold rounded-lg transition-all
                                ${day ? 'cursor-pointer hover:bg-primary/20 hover:text-primary' : ''}
                                ${isToday ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-foreground'}
                                ${!day ? 'invisible' : ''}`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
