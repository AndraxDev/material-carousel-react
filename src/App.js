import './App.css';
import Carousel from "./Carousel";

const urls = [
    "https://picsum.photos/id/1/500/500",
    "https://picsum.photos/id/10/500/500",
    "https://picsum.photos/id/20/500/500",
    "https://picsum.photos/id/30/500/500",
    "https://picsum.photos/id/40/500/500",
    "https://picsum.photos/id/50/500/500",
    "https://picsum.photos/id/60/500/500",
    "https://picsum.photos/id/70/500/500",
    "https://picsum.photos/id/80/500/500",
    "https://picsum.photos/id/90/500/500"
];

function App() {
    return (
        <div className="App">
            <Carousel urls={urls}/>
        </div>
    );
}

export default App;
