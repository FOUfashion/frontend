import Fluxible from 'fluxible';
import AppStore from './stores/AppStore';

export default new Fluxible({
  stores: [
    AppStore
  ]
});
