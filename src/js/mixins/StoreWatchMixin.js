var React = require('react');
var AppStore = require('../stores/app-store');

var StorWatchMixin = function(cb) {
  return {
    getInitialState: function() {
      return cb();
    },

    componentWillMount: function() {
      AppStore.addChangeListner(this._onChange);
    },

    componentWillUnmount: function() {
      AppStore.removeChangeListner(this._onChange);
    },

    _onChange: function() {
      this.setState(cb());
    }
  }
}

module.exports = StorWatchMixin;