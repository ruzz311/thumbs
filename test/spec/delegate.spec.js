describe("Thumbs.View event", function () {
    describe("single events", function () {
        var spy = sinon.spy(), View = Thumbs.View.extend({
            template: '<button data-thumbs-delegate="click:testFunc">Test Button</button>',
            render: function () {
                this.$el.html(this.template);
                return this._super('render', arguments);
            },
            testObj: 'hello',
            testFunc: spy
        });
        var view = null;

        beforeEach(function () {
            view = new View();
        });

        afterEach(function () {
            view = null;
            spy.reset();
        });

        it("adds events set in the template to the events object", function () {
            expect(view.events).toEqual({});
            view.render();
            expect(_.keys(view.events).length).toEqual(1);
        });

        it("allows events to be set directly on an element", function () {
            view.render();
            view.$('button').trigger('click');
            expect(spy).toHaveBeenCalledOnce();
        });
    });

    describe("multiple events", function () {
        var spy = sinon.spy(), View = Thumbs.View.extend({
            template: '<button data-thumbs-delegate="click:testFunc focus:testFunc">Test Button</button>',
            render: function () {
                this.$el.html(this.template);
                return this._super('render', arguments);
            },
            testObj: 'hello',
            testFunc: spy
        });
        var view = null;

        beforeEach(function () {
            view = new View();
        });

        afterEach(function () {
            view = null;
            spy.reset();
        });

        it("adds events set in the template to the events object", function () {
            expect(view.events).toEqual({});
            view.render();
            expect(_.keys(view.events).length).toEqual(2);
        });

        it("allows events to be set directly on an element", function () {
            view.render().$el.appendTo('body');
            view.$('button').trigger('click');
            expect(spy).toHaveBeenCalledOnce();
            view.$('button').trigger('focus');
            expect(spy).toHaveBeenCalledTwice();
            view.$el.remove();
        });
    });
});
