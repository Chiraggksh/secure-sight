'use client'
import { useEffect, useState } from "react";
import axios from "axios";

export default function IncidentList() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get("/api/incidents?resolved=false").then((res) => {
      setIncidents(res.data);
    });
  }, []);

  const handleResolve = async (id: number) => {
    setIncidents((prev) => prev.filter((item) => item.id !== id));
    await axios.patch(`/api/incidents/${id}/resolve`);
  };

  return (
    <div className="space-y-4">
      {incidents.map((incident: any) => (
        <div key={incident.id} className="flex gap-4 p-4 border rounded shadow">
          <img src={incident.thumbnailUrl} className="w-24 h-16 object-cover rounded" />
          <div className="flex-1">
            <div className="font-bold text-red-500">{incident.type}</div>
            <div className="text-sm">{incident.camera.location}</div>
            <div className="text-xs text-gray-500">
              {new Date(incident.tsStart).toLocaleTimeString()} - {new Date(incident.tsEnd).toLocaleTimeString()}
            </div>
          </div>
          <button onClick={() => handleResolve(incident.id)} className="text-white bg-green-600 px-3 py-1 rounded">
            Resolve
          </button>
        </div>
      ))}
    </div>
  );
}
