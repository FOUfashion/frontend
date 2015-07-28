import Fluxible from 'fluxible';
import router from './router';

import AppStore from './stores/AppStore';

export default new Fluxible({
  component: router,
  stores: [
    AppStore
  ]
});
