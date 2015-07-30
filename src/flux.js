import Fluxible from 'fluxible';
import AppStore from './stores/AppStore';

const app = new Fluxible({
  stores: [
    AppStore
  ]
});

// FIXME: This is a workaround because on SSR the context doesn't
// propagate from FluxibleComponent on to e.g. TopBar component
app.ctx = app.createContext();

export default app;
