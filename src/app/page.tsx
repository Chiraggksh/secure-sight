import Navbar from "./components/Navbar";
import IncidentPlayer from "./components/IncidentPlayer";
import IncidentList from "./components/IncidentList";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <IncidentPlayer />
        <IncidentList />
      </div>
    </div>
  );
}
