window.ResourceItemView = Backbone.View.extend({

  events: {
    "click .btn-save": "onSave",
    "click .btn-generate": "onGenerate",
    "keypress .control-group": "onFieldChange"
  },

  initialize: function () {
    this.template = _.template($('#resource-item-template').html());

    var editorView = new EditorView();
    if (typeof this.model !== "undefined") {
      editorView.model = this.model;
    }

    this.editorView = editorView;
  },

  hasModel: function() {
    return (typeof this.model !== "undefined");
  },

  render: function (eventName) {

    var data = this.model ? this.model.toJSON() : {};
    
    $(this.el).html(this.template(data));

    this.$('.resource-code-wrapper').html(this.editorView.render().el);

    var visibility = this.hasModel() ? 'visibility' : 'hidden';
    this.$('.btn-generate').css('visibility', visibility);

    if (typeof data !== "undefined") {
      this.$('.resource-path').val(data.path);
    }
    return this;
  },

  onGenerate: function(e) {
    console.log('generage');
  },

  onSave: function(e) {

    var path = this.$('.resource-path').val();
    var structure = this.editorView.getValue();

    // Validate path
    if (typeof path === "undefined" || path.length === 0) {
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

    // Update or create new resource
    var resource = (typeof this.model !== "undefined") ? this.model : new Resource();

    resource.set('path', path);
    resource.set('structure', structure);

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
