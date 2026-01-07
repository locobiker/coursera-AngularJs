(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyShoppingListController', ToBuyShoppingListController)
.controller('BoughtShoppingListController', BoughtShoppingListController)
.provider('ShoppingList', ShoppingListProvider)
.config(Config);

// Provides default list of things to buy
Config.$inject = ['ShoppingListProvider'];
function Config(ShoppingListProvider) {
    ShoppingListProvider.defaults.toBuyItems = [
      {
        name: "Hot Dog",
        quantity: 5
      },
      {
        name: "Pizza",
        quantity: 2
      },
      {
        name: "Beer",
        quantity: 3
      },
      {
        name: "Steak",
        quantity: 2
      },
      {
        name: "Apples",
        quantity: 10
      }
    ];
}

// Controller that contains access functions for the service.
// Since the controller is a ViewModel and the service is the model,
// service functions are not accessible until you expose them through the 
//controller.
ToBuyShoppingListController.$inject = ['ShoppingList'];
function ToBuyShoppingListController(ShoppingList) {
  var list = this;
  list.items = ShoppingList.getToBuyItems();

  list.moveToBought = function (index) {
    ShoppingList.moveItemToBought(index);
  };
}

// The assignment requirements said to make two controllers,
// the only different is which list it is exposing, simplifies 
// the list item retrieval.
BoughtShoppingListController.$inject = ['ShoppingList'];
function BoughtShoppingListController(ShoppingList) {
  var list = this;
  list.items = ShoppingList.getBoughtItems();
}

// Contains two arrays, one ToBuy and one Bought
// Provides access functions for form
function ShoppingListService(toBuyItems) {
  var service = this;

  // List of shopping items
  var boughtItemList = [];

  service.moveItemToBought = function (itemIndex) {
    var item = toBuyItems.splice(itemIndex, 1)[0];
    boughtItemList.push(item);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItemList;
  };
}

// Provider that creates ShoppingList Service.
function ShoppingListProvider() {
  var provider = this;

  provider.defaults = {
    toBuyItems: []
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.toBuyItems);

    return shoppingList;
  };
}

})();