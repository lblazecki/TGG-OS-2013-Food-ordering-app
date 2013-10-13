// Models
var RestaurantModel = Backbone.Model.extend({
    idAttribute :   'name'
});

var RestaurantsCollection = Backbone.Collection.extend({
    model       :  RestaurantModel,
    url         :  "/allAvailableChannels"
});

//Views
var RestaurantListView = Backbone.View.extend({
    el: '#content',
    tagName:    'ul',

    initialize: function () {
        this.collection.bind("sync", this.render, this);
    },

    render: function () {
        this.$el.empty();
        _.each(this.collection.models, function (restaurant) {
            this.$el.append(new RestaurantItemView({model: restaurant}).render().el);
        }, this);
        return this;
    }
});


var RestaurantItemView = Backbone.View.extend({
    tagName: "li",
    template: _.template($('#restaurant-list-item').html()),

    render: function () {
        this.$el.empty().html(this.template(this.model.toJSON()));
        return this;
    }
});

var RestaurantOfferView = Backbone.View.extend({
    el: '#content',
    template:   _.template($('#restaurant-details').html()),

    render: function () {
        this.$el.empty().html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click #sendButton'          :   'sendOffer'
    },

    sendOffer: function () {
        var offer = {};
        offer.name = $('#foodName').val();
        offer.price = $('#foodPrice').val();

        //ajax call
        $.ajax({
            contentType :   'application/json',
            type        :   'POST',
            url         :   '/sendOffer',
            data        :   JSON.stringify(offer)
        }).done(function () {
            console.log('poslano');
        });
    }
});

//// Router
var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  :   "restaurantList",
        "restaurant/:name"    :   "restaurantDetails"
    },

    restaurantList: function () {
        this.restaurantsCollection = new RestaurantsCollection();
        this.restaurantListView = new RestaurantListView({collection: this.restaurantsCollection});
        this.restaurantListView.render();
        this.restaurantsCollection.fetch();
    },

    restaurantDetails: function (name) {
        if (this.restaurantsCollection) {
            this.showRestaurantDetails(name);
        } else {
            var self = this;
            this.restaurantsCollection = new RestaurantsCollection();
            this.restaurantsCollection.fetch({
                success: function () {
                    self.showRestaurantDetails(name);
                }
            });
        }
    },

    showRestaurantDetails: function (name) {
        this.restaurantModel = this.restaurantsCollection.get(name);
        this.restaurantView = new RestaurantOfferView({model: this.restaurantModel});
        this.restaurantView.render();
    }
});


var app = new AppRouter();
Backbone.history.start();