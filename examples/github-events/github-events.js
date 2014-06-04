// An example using thumbs.CollectionView created by
// [Russell Madsen](http://github.com/ruzz311). This demo fetches an
// event log from a github entity

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function () {
    var githublog,
        feedUrl = 'https://github.com/C2FO.json',
        icons = {};

    // Github Event Model
    // ------------------

    var Model = thumbs.Model.extend({

        // we will use the created_at timestamp because
        // the github event log does not have ids
        idAttribute: 'created_at',

        // convert the date to a timestamp for better collection sorting
        parse: function (data) {
            data.created_at = (new Date(data.created_at)).getTime();
            return data;
        }

    });

    // Github Events Collection
    // ------------------------

    // The collection of github events is backed by github.com
    // server.
    var Collection = thumbs.Collection.extend({

        // Reference to this collection's model.
        model: Model,

        url: function() { return feedUrl; },

        // Events are sorted by their created timestamp.
        comparator: function (model) {
            return model.get('created_at');
        }

    });

    // Events Item View
    // ----------------

    // The DOM element for the GithubEvent model.
    var EventViewItem = thumbs.TemplateView.extend({

        template: _.template($("#item-template").html()),

        formatter: function (d) {
            return new Date(d).toString();
        },

        icon: function (d) {
            if (typeof icons[d] !== 'undefined') {
                return icons[d];
            }
            return d;
        }

    });

    // Events Collection View
    // ----------------------

    // the view that corresponds to the GithubEvents Collection
    var EventViewCollection = thumbs.CollectionView.extend({});

    // The Application
    // ---------------

    // Our overall **AppView** is the top-level piece of UI.
    var AppView = thumbs.View.extend({

        EventsList: EventViewCollection,
        EventView:  EventViewItem,

        initialize: function () {
            this._super("initialize", arguments);
        }

    });

    // Create main app view and render.
    var app = window.app = new AppView({ el: "#GithubLog", collection: new Collection }).render();

    app.collection.fetch({ dataType: 'jsonp' });

});