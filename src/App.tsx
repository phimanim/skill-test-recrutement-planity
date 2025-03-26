import React from "react";
import eventData from "./data/data.json";
import { RawEvent } from "./types";
import { processEvents } from "./utils/eventProcessing";
import "./Calendar.css";
const getEventTop = (minutes: number) => {
  return (minutes / 720) * 100;
};

const getEventHeight = (duration: number) => {
  return (duration / 720) * 100;
};

const App: React.FC = () => {
  const events = processEvents(eventData as RawEvent[]);

  return (
    <div className="calendar-container">
      {events.map((event) => (
        <div
          key={event.id}
          className="event-card"
          style={{
            top: `${getEventTop(event.startMinutes)}vh`,
            height: `${getEventHeight(event.duration)}vh`,
            left: `${event.left}%`,
            width: `${event.width}%`,
          }}
        >
          {event.id}
        </div>
      ))}
    </div>
  );
};

export default App;
