import connectToStores from 'fluxible-addons-react/connectToStores';

/**
 * Helper to easily "connect" a component to several Fluxible stores.
 */
function connectToStoresDecorator(stores, callback) {
  return connectToStores(stores, (context, props) => {
    const args = [props, context];

    stores.forEach(function(store) {
      args.unshift(context.getStore(store));
    });

    return callback.apply(null, args);
  });
}

export default connectToStoresDecorator;
