var DataStore = angular.module('app.data.store', ['js-data']);

module.exports = DataStore.name;

DataStore
  .provider('DataStore', function (DSProvider){
    return DSProvider;
  })
  .config(function (DataStoreProvider, DSHttpAdapterProvider){
    DSHttpAdapterProvider.defaults = {
      deserialize: function (config, response){
        if(config.class == 'GoogleImage'){
          return response.data.responseData.results;
        }
        return data;
      }
    };
    DataStoreProvider.defaults.basePath = 'some.endpoint/';
  })
  .run(function (DataStore, DSHttpAdapter){
    DataStore.registerAdapter('http', DSHttpAdapter, { default: true });
  });
