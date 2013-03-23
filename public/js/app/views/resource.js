window.ResourceItemView = Backbone.View.extend({

  events: {
  },

  initialize: function () {
    this.template = _.template($('#resource-item-template').html());
  },

  render: function (eventName) {
    $(this.el).html(this.template());
    return this;
  }

});
