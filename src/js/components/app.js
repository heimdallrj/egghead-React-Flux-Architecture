var React = require('react');
var Catelog = require('./catalog/app-catalog');
var Cart = require('./cart/app-cart');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Lets Shop</h1>
        <Catelog />
        <h1>Cart</h1>
        <Cart />
      </div>
    );
  }
});

module.exports = App;