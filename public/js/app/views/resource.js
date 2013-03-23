window.ResourceItemView = Backbone.View.extend({

  events: {
    "click .btn-generate": "onSubmit",
    "keypress .control-group": "onFieldChange"
  },

  onSubmit: function(e) {
    console.log('submit');

    var path = this.$('.resource-path').val();
    var structure = this.$('.resource-structure').val();

    // Validate path
    if (!path) {
      this.$('.control-resource-path').addClass('error');
      return;
    }

    // Validate structure
    try {
      structure = JSON.parse(structure);
    } catch (e) {
      this.$('.control-resource-structure').addClass('error');
      return;
    }

    var resource = new Resource({
      'path': path,
      'structure': structure
    });

    resource.save();
  },

  onFieldChange: function(e) {
    this.$('.control-group').removeClass('error');
  },

  initialize: function () {
    this.template = _.template($('#resource-item-template').html());
  },

  render: function (eventName) {
    $(this.el).html(this.template());
    return this;
  }

});
