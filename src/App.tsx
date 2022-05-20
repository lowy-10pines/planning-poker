import './App.css';
import RoomMetadataView from './components/RoomMetadataView';
import ParticipantsView from './components/ParticipantsView';
import ResultView from './components/ResultView';
import { CardOptionsView } from './components/CardOptionsView';


function App() {
  return (
    <main>
      <div className="topContainer">
        <RoomMetadataView />
        <ParticipantsView />
        <ResultView />
      </div>
      <CardOptionsView />
      <footer>From 10🌲 with 💖</footer>
    </main>
  );
}

export default App;
