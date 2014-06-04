Thumbs.CollectionView = (function () {

    var CollectionView = Thumbs.View.extend({
        ItemView: null,
        itemViews: {},
        itemContainer: null,

        initialize: function (options) {
            options = options || {};

            if (typeof options.ItemView === 'undefined' && this.ItemView === null) {
                throw new Error('Thumbs.CollectionView requires an ItemView to initialize');
            }

            if (typeof options.collection === 'undefined') {
                throw new Error('Thumbs.CollectionView requires an ItemView to initialize');
            }

            this._super('initialize', arguments);

            this.ItemView = options.ItemView || this.ItemView;
            this.itemContainer = $(options.itemContainer) || this.$el;

            this.listenTo(this.collection, 'add', this.addItem);
            this.listenTo(this.collection, 'remove', this.removeItem);
            this.listenTo(this.collection, 'reset', this.addItems);
        },

        render: function () {
            this._super('render', arguments);
            this.addItems();
            return this;
        },

        remove: function () {
            this.removeItems();
            return this._super('remove', arguments);
        },

        addItem: function (model) {
            var itemView = new this.ItemView({ model: model });
            this.itemViews[itemView.thumbsId] = itemView;
            this.itemContainer.append(itemView.render().$el);
            this.listenTo(model, 'destroy', function(){
                this.removeItem(itemView);
            });
            return itemView;
        },

        addItems: function () {
            this.collection.each(this.addItem, this);
            return this;
        },

        removeItem: function (itemView) {
            itemView.remove();
            return delete this.itemViews[itemView.thumbsId];
        },

        removeItems: function () {
            for (var id in this.itemViews) {
                this.removeItem(this.itemViews[id]);
            }
            return this;
        }
    });

    return CollectionView;
})();