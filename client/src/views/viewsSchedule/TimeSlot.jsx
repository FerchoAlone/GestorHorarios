import React from 'react';

export function TimeSlot({ time, activity }) {
    return (
        <div className="border p-2">
            <strong>{time}</strong>
            <div>{activity}</div>
        </div>
    );
}