var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENTS = 'change';

var _catelog = [];

for(var i=1; i<9; i++) {
  _catelog.push({
    'id': 'Widget' + i,
    'title': 'Widget #' + i,
    'summary': 'This is an awesome widget!',
    'description': 'Lorem ipsum dolor sit consecteture adipisicing elite.',
    'cost': i,
    'img': 'assets/product.png'
  });
}

var _cartItems = [];

function _removeItem(index) {
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem(index) {
  _cartItems[index].qty++;
}

function _decreaseItem(index) {
  if(_cartItems[index].qty > 1) {
    _cartItems[index].qty--;
  } else {
    _removeItem(index);
  }
}

function _addItem(item) {
  if(!item.inCart) {
    item['qty'] = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  } else {
    _cartItems.forEach(function(cartItem, i) {
      if(cartItem.id === item.id) {
        _increaseItem(i);
      }
    });
  }
}

function _cartTotals() {
  var qty = 0, total = 0;
  _cartItems.forEach(function(cartItem) {
    qty += cartItem.qty;
    total += cartItem.qty * cartItem.cost;
  });

  return {'qty': qty, 'total': total};
}

var AppStore = assign(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENTS);
  },

  addChangeListner: function(callback) {
    this.on(CHANGE_EVENTS, callback);
  },

  removeChangeListner: function(callback) {
    this.removeListener(CHANG_EVENTS, callback);
  },  

  getCart: function() {
    return _cartItems;
  },

  getCatalog: function() {
    return _catelog;
  },

  getCartTotals: function() {
    return _cartTotals;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType) {
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;

      case AppConstants.REMOVE_ITEM:
        _removeItem(payload.action.index);
        break;

      case AppConstants.INCREASE_ITEM:
        _increaseItem(payload.action.index);
        break;

      case AppConstants.DECREASE_ITEM:
        _decreaseItem(payload.action.index);
        break;
    }

    AppStore.emitChange();

    return true;
  })

})

module.exports = AppStore;