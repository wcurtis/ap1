
window.Resource = Backbone.Model.extend({

  idAttribute: "_id",

  urlRoot: function(){
    if (true || this.isNew()){
      return "/api/resources";
    } else {
      return "/api/resources" + this.id;
    }
  }
});

window.ResourceCollection = Backbone.Collection.extend({
  model: Resource,
  url: '/api/resources'
});
