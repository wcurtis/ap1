window.ResourceItemView = Backbone.View.extend({

  events: {
    "click .btn-generate": "onSubmit"
  },

  onSubmit: function(e) {
    console.log('submit');

    var path = this.$('.resource-path').val();
    var structure = JSON.parse(this.$('.resource-structure').val());

    var resource = new Resource({
      'path': path,
      'structure': structure
    });

    resource.save();
  },

  initialize: function () {
    this.template = _.template($('#resource-item-template').html());
  },

  render: function (eventName) {
    $(this.el).html(this.template());
    return this;
  }

});
