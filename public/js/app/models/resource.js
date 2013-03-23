
window.Resource = Backbone.Model.extend({

  idAttribute: "_id",

  urlRoot: function(){
    if (true || this.isNew()){
      return "/api/resource";
    } else {
      return "/api/resource" + this.id;
    }
  }
});

// Team collection
window.ResourceCollection = Backbone.Collection.extend({
  model: Team,
  url: '/api/resource'
});
