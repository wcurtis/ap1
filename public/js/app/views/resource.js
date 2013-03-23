window.ResourceItemView = Backbone.View.extend({

  events: {
    "click .btn-generate": "onSubmit"
  },

  onSubmit: function(e) {
    console.log('submit');
  },

  initialize: function () {
    this.template = _.template($('#resource-item-template').html());
  },

  render: function (eventName) {
    $(this.el).html(this.template());
    return this;
  }

});
