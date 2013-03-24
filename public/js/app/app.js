Backbone.View.prototype.close = function () {
  console.log('Closing view ' + this);
  if (this.beforeClose) {
      this.beforeClose();
  }
  this.remove();
  this.unbind();
};

var AppRouter = Backbone.Router.extend({

  initialize:function () {
    return this.bind('all', this._trackPageview);
  },

  setup: function(callback) {
    callback();
  },

  showView:function (selector, view) {
    if (this.currentView) {
        this.currentView.close();
    }
    $(selector).html(view.render().el);
    this.currentView = view;
    return view;
  },

  routes:{
    "":"index",
    "resources": "listResources",
    "resources/new": "newResource",
    "resources/:id": "showResource"
  },

  index: function() {
    return this.newResource();
  },

  newResource: function() {
    var self = this;
    var resourceItemView = new ResourceItemView();
    self.showView('#container', resourceItemView);
  },

  showResource: function(id) {
    var self = this;

    var resource = new Resource();
    resource.id = id;

    resource.fetch({success: function() {
      var resourceItemView = new ResourceItemView({model: resource});
      self.showView('#container', resourceItemView);
    }});
  }

});

$(function () {
  app = new AppRouter();
  Backbone.history.start();
});
