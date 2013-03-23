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

  routes:{
    "":"index"
  },

  setup: function(callback) {
    callback();
  },

  index: function() {

    var self = this;

    var resourceItemView = new ResourceItemView();
    self.showView('#container', resourceItemView);
  },

  showView:function (selector, view) {
      if (this.currentView) {
          this.currentView.close();
      }
      $(selector).html(view.render().el);
      this.currentView = view;
      return view;
  }
});

$(function () {
  app = new AppRouter();
  Backbone.history.start();
});
