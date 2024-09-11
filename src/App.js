import './App.css';
import Carousel from "./Carousel";

const urls = [
    "https://picsum.photos/id/1/700/500",
    "https://picsum.photos/id/10/700/500",
    "https://picsum.photos/id/20/700/500",
    "https://picsum.photos/id/30/700/500",
    "https://picsum.photos/id/40/700/500",
    "https://picsum.photos/id/50/700/500",
    "https://picsum.photos/id/60/700/500",
    "https://picsum.photos/id/70/700/500",
    "https://picsum.photos/id/80/700/500",
    "https://picsum.photos/id/90/700/500",
    "https://picsum.photos/id/100/700/500",
    "https://picsum.photos/id/110/700/500",
    "https://picsum.photos/id/120/700/500",
    "https://picsum.photos/id/130/700/500",
    "https://picsum.photos/id/140/700/500",
    "https://picsum.photos/id/160/700/500",
    "https://picsum.photos/id/170/700/500",
    "https://picsum.photos/id/180/700/500",
    "https://picsum.photos/id/190/700/500",
    "https://picsum.photos/id/200/700/500",
    "https://picsum.photos/id/210/700/500",
    "https://picsum.photos/id/220/700/500",
    "https://picsum.photos/id/230/700/500",
    "https://picsum.photos/id/240/700/500",
    "https://picsum.photos/id/250/700/500",
    "https://picsum.photos/id/260/700/500",
    "https://picsum.photos/id/270/700/500",
    "https://picsum.photos/id/280/700/500",
    "https://picsum.photos/id/290/700/500",
    "https://picsum.photos/id/300/700/500"
];

function App() {
    return (
        <div className="App">
            <Carousel urls={urls}/>
        </div>
    );
}

export default App;
