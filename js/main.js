define('js/main', function(require, exports){
    // var $ = require('jquery');
    // var _ = require('underscore');
    // var Backbone = require('backbone');
    // debugger;
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
        },
        removeView: function() {
            this.undelegateEvents();
            this.remove();
        },
    });
    var Page1View = BaseView.extend({
        template: _.template($("#template-page1").html()),
        tagName: 'div',
        className: 'p1c',
        initialize: function(){},
        events: {},
        init: function(){
            this.renderContent();
            require.async(['plugins/sweetalert/js/sweetalert.min'], function(){
                alert('import sweetalert');
            });
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
        views: [],
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
        setViews: function(views){
            if(typeof views != 'object'){
                return;
            }
            this.views = [];
            var me = this;
            $.each(views, function(index, view){
                me.views.push(view);
            });
        },
        removeViews: function(){
            $.each(this.views, function(index, view){
                view.removeView();
            });
        },
    });
    var Router = Backbone.Router.extend({
        routes: {
            'page1': 'page1',
            'page2': 'page2',
        },
        page1: function(){
            appView.removeViews();
            page1View.init();
            appView.setViews([page1View]);
        },
        page2: function(){
            appView.removeViews();
            page2View.init();
            appView.setViews([page2View]);
        },
    });
    var appView = new AppView;
    var page1View = new Page1View;
    var page2View = new Page2View;
    //定义全局变量App
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        initialize: function() {
            Backbone.history.start({
                pushState: true
            });
        }
    };

    exports.run = App.initialize;
})