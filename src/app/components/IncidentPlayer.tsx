'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function IncidentPlayer() {
  const [incidents, setIncidents] = useState([]);
  const [scrubberX, setScrubberX] = useState(0);

  useEffect(() => {
    axios.get('/api/incidents?resolved=false').then((res) => {
      setIncidents(res.data);
    });
  }, []);

  const width = 720; // width of the timeline
  const totalSeconds = 24 * 60 * 60; // 24 hours

  const getXPosition = (timestamp: string) => {
    const date = new Date(timestamp);
    const seconds =
      date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
    return (seconds / totalSeconds) * width;
  };

  const handleDrag = (e: React.MouseEvent<SVGCircleElement>) => {
    const svg = e.currentTarget.ownerSVGElement!;
    const rect = svg.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(width, x));
    setScrubberX(x);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <img
        src="/static/video-placeholder.gif"
        className="w-full h-[300px] object-cover rounded"
        alt="Video Frame"
      />

      {/* Timeline SVG */}
      <svg width={width} height="60" className="mt-4 bg-gray-100 rounded">
        {/* Ruler */}
        <line x1="0" y1="30" x2={width} y2="30" stroke="black" strokeWidth="2" />
        
        {/* Hour ticks */}
        {Array.from({ length: 25 }).map((_, i) => (
          <line
            key={i}
            x1={(i / 24) * width}
            y1="25"
            x2={(i / 24) * width}
            y2="35"
            stroke="gray"
            strokeWidth="1"
          />
        ))}

        {/* Incident Markers */}
        {incidents.map((incident, idx) => (
          <circle
            key={idx}
            cx={getXPosition(incident.tsStart)}
            cy="30"
            r="4"
            fill="red"
          />
        ))}

        {/* Scrubber */}
        <circle
          cx={scrubberX}
          cy="30"
          r="6"
          fill="blue"
          onMouseDown={(e) => {
            const move = (ev: MouseEvent) => handleDrag(ev as any);
            const up = () => {
              document.removeEventListener('mousemove', move);
              document.removeEventListener('mouseup', up);
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
          }}
        />
      </svg>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-2">
        <img src="/images/thumb1.jpg" className="w-20 h-12 rounded" />
        <img src="/images/thumb2.jpg" className="w-20 h-12 rounded" />
      </div>
    </div>
  );
}
