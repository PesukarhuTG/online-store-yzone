import Loader from '../modules/load';

class App {
    loader: Loader;

    constructor() {
        this.loader = new Loader();
    }

    public start(): void {
        this.loader.load();
    }
}

export default App;
