window.EditorView = Backbone.View.extend({

  className: "editor",

  events: {
  },

  initialize: function () {
  },

  render: function (eventName) {
    
    var editor = ace.edit(this.el);
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/json");
    editor.renderer.setShowGutter(true);
    editor.getSession().setTabSize(2);
    editor.getSession().setUseSoftTabs(true);

    var resource = (typeof this.model !== "undefined") ? this.model : new Resource();
    editor.setValue(JSON.stringify(resource.get('structure'), null, 2));

    this.editor = editor;
    window.editor = editor;
    return this;
  },

  getValue: function() {
    return this.editor.getValue();
  }

});
