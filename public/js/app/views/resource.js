window.ResourceItemView = Backbone.View.extend({

  events: {
    "click .btn-generate": "onSubmit",
    "keypress .control-group": "onFieldChange"
  },

  initialize: function () {
    this.template = _.template($('#resource-item-template').html());
  },

  render: function (eventName) {

    var data = this.model ? this.model.toJSON() : {};
    
    $(this.el).html(this.template(data));

    if (typeof data !== "undefined") {
      this.$('.resource-path').val(data.path);
    }
    return this;
  },

  onSubmit: function(e) {

    var path = this.$('.resource-path').val();
    var structure = this.$('.resource-structure').val();

    // Validate path
    if (!path) {
      console.log(path);
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

    resource.save({}, { 
      success: function() {
        document.location.href = '#/resources/' + resource.id;
      }, 
      error: function() {
        console.error('Failed to save resource');
      }
    });
  },

  onFieldChange: function(e) {
    this.$('.control-group').removeClass('error');
  }

});
