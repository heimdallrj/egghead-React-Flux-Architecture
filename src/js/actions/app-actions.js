var AppContstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  addItem: function(item) {
    AppDispatcher.handleViewAction({
      actionType: AppContstants.ADD_ITEM,
      item: item
    })
  },
  removeItem: function(index) {
    AppDispatcher.handleViewAction({
      actionType: AppContstants.REMOVE_ITEM,
      index: index
    })
  },
  increaseItem: function(index) {
    AppDispatcher.handleViewAction({
      actionType: AppContstants.INCREASE_ITEM,
      index: index
    })
  },
  decreaseItem: function(index) {
    AppDispatcher.handleViewAction({
      actionType: AppContstants.DECREASE_ITEM,
      index: index
    })
  }
}

module.exports = AppActions;