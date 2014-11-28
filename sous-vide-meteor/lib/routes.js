Router.configure({
  layoutTemplate: 'Layout'
});

Router.onBeforeAction(function () {
  this.render('Header', { to: 'header' });
  this.render('Footer', { to: 'footer' });
  this.next();
});

Router.onBeforeAction(function() {
  if (! Meteor.userId() ) {
    this.render('SignIn');
  } else {
    this.next();
  }
}, {except: ['home', 'cooking']});

Router.onBeforeAction(function () {
  if (Meteor.loggingIn()) {
    this.layout('Loading');
  } else {
    this.next();
  }
});

Router.route('/', function () {
  this.render('Home');
}, {
  name: 'home'
});

Router.route('/settings', function () {
  this.render('Settings');
}, {
  name: 'settings'
});

Router.route('/profile', function () {
  this.render('Profile');
}, {
  name: 'profile'
});

Router.route('/favorites', function () {
  this.render('Favorites');
}, {
  name: 'favorites',

  subscriptions: function () {
    if (Meteor.user())
      return [Meteor.subscribe("userData"), Meteor.subscribe("favoriteRecipes")];
    else
      return [];
  },
  data: function () {
    return {
      favoriteRecipes: Recipes.find()
    };
  }
});

Router.route('/search', function () {
  this.render('Search');
}, {
  name: 'search'
});

Router.route('/signin', function () {
  this.render('SignIn');
}, {
  name: 'signin'
});

Router.route('/cooking', function () {
  var self = this;
  this.layout('Cooking');
}, {
  name: 'cooking.view'
});

Router.route('/cooking/:temp/:time', function () {
  var self = this;
  this.layout('Cooking', {
    data: function () {
      return {
        temp: self.params.temp,
        time: self.params.time
      };
    }
  });
}, {
  name: 'cooking'
});


Router.route('/save-recipe/:temp/:time', function () {
  var self = this;
  this.render('SaveRecipe', {
    data: function () {
      return {
        temp: self.params.temp,
        time: self.params.time
      };
    }
  });

  this.render('Header', {
    to: 'header',
    data: function () {
      return {
        renderBackButton: true
      };
    }});
}, {
  name: 'save-recipe'
});