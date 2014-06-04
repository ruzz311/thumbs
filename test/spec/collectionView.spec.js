
describe("Thumbs.CollectionView", function () {

    var View = Thumbs.View.extend({
        template: null,
        initialize: function (options) {
            this._super("initialize", arguments);
            if (this.template) {
                this.template = _.template(this.template);
            }
        },
        _getData: function () {
            var data = this.collection ? data = this.collection.toJSON() : {};
            return data;
        },
        // default render functionality is to set the el html to the
        // compiled template run with the model data
        // override if that's not what's needed
        render: function () {
            if (this.template) {
                this.$el.html(this.template(this._getData()));
            }
            this._super("render", arguments);
            return this;
        }
    });

    var TestCollection = thumbs.Model.extend({model: thumbs.Model});
    var TestView = View.extend({
        template: '<div id="parentView"></div>'
    });
    var TestCollectionView = View.extend({
        template: '<ul id="collectionView"></ul>'
    });
    var TestItemView = View.extend({
        template: '<li class="item-view"></li>'
    });

    describe("Item Views", function () {

        beforeEach(function () {
            this.collection = new TestCollection([
                { "id": 0, "name": "Medina Hayden" },
                { "id": 1, "name": "Callahan Day" },
                { "id": 2, "name": "Gallegos Hudson" },
                { "id": 3, "name": "Juanita Donovan" },
                { "id": 4, "name": "Robertson Burks" }
            ]);
            this.view = new TestView({ collection: this.collection });
        });
    });
});

