import Fluxible from 'fluxible';
import AppStore from './stores/AppStore';

const app = new Fluxible({
  stores: [
    AppStore
  ]
});

app.ctx = app.createContext();

export default app;
