var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AddToCart = require('./app-addtocart.js');

function getCatelog() {
  return {items: AppStore.getCatalog()};
}

var Catalog = React.createClass({
  getInitialState: function() {
    return getCatelog();
  },

  render: function() {
    var items = this.state.items.map(function(item) {
      return (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>{item.cost} USD</td>
          <td><AddToCart item={item} /></td>
        </tr>
      );
    });

    return (
      <table className="table table-hover">
        {items}
      </table>
    );
  }
});

module.exports = Catalog;