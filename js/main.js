$(document).ready(function(){
    var BaseView = Backbone.View.extend({
        initialize: function(){},
        init: function(){},
        events: {},
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        renderContent: function(){
            $("#content").append(this.render().el);
        }
    });
    var Page1View = BaseView.extend({
        template: _.template($("#template-page1").html()),
        tagName: 'div',
        className: 'p1c',
        initialize: function(){},
        events: {},
        init: function(){
            this.renderContent();
        },
        render: function(){
            this.$el.html(this.template({nav: 'xxx'}));
            return this;
        },
    });
    var Page2View = BaseView.extend({
        template: _.template($("#template-page2").html()),
        tagName: 'div',
        className: 'p2c',
        initialize: function(){},
        events: {},
        init: function(){
            this.renderContent();
        },
        render: function(){
            this.$el.html(this.template({nav: 'xxx'}));
            return this;
        },
    });
    var AppView = BaseView.extend({
        el: $(document),
        initialize: function(){
            this.router = new Router;
        },
        events: {
            'click a[data-primary]': 'primary'
        },
        primary: function(e) {
            e.preventDefault();
            var href = $(e.currentTarget).attr('href');
            this.router.navigate(href, {
                trigger: true
            });
        },
    });
    var Router = Backbone.Router.extend({
        routes: {
            'page1': 'page1',
            'page2': 'page2',
        },
        page1: function(){
            page1View.init();
        },
        page2: function(){
            page2View.init();
        },
    });
    var appView = new AppView;
    var page1View = new Page1View;
    var page2View = new Page2View;
    Backbone.history.start({
        pushState: true
    });
});