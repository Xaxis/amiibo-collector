/**
 * Backbone module view template
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.sticky',
  '../collections/_moduleCollection',
  'text!../templates/amiibo-group.tpl.html',
  'text!../templates/amiibo-grid-item.tpl.html'
], function(
  $,
  _,
  Backbone,
  Sticky,
  _ModuleCollection,
  amiiboGroupTpl,
  amiiboGridItemTpl
) {
  var _ModuleView = Backbone.View.extend({
    el: $('body'),

    templates: {
      amiiboGroup: _.template(amiiboGroupTpl),
      amiiboGridItem: _.template(amiiboGridItemTpl)
    },

    events: {
      'click .grid-item': 'toggleSelectedAmiibo'
    },

    amiibos: {

      // Animal Crossing
      animalcrossing: {
        title: "Animal Crossing",
        amiibos: {
          'blathers': {},
          'celeste': {},
          'cyrus': {},
          'digby': {},
          'isabellewinteroutfit': {},
          'kappn': {},
          'kicks': {},
          'kk': {},
          'lottie': {},
          'mabel': {},
          'reese': {},
          'reseti': {},
          'rover': {},
          'timmytommy': {},
          'tomnook': {}
        }
      },

      // Kirby - @todo - Where are the rest of the kirbys?
      kirby: {
        title: "Kirby",
        amiibos: {
          'kingdedede': {},
          'waddledee': {}
        }
      },

      // Super smash brothers
      ssb: {
        title: "Super Smash Brothers",
        amiibos: {
          bowser: {},
          bowserjr: {},
          captainfalcon: {},
          charizard: {},
          darkpit: {},
          diddykong: {},
          donkeykong: {},
          drmario: {},
          duckhunt: {},
          falco: {},
          famicomrob: {},
          fox: {},
          gamewatch: {},
          ganondorf: {},
          greninja: {},
          ike: {},
          jigglypuff: {},
          kingdedede: {},
          kirby: {},
          link: {},
          littlemac: {},
          lucario: {},
          lucas: {},
          lucina: {},
          luigi: {},
          mario: {},
          marth: {},
          megaman: {},
          metaknight: {},
          mewtwo: {},
          miibrawler: {},
          miigunner: {},
          miiswordfighter: {},
          ness: {},
          olimar: {},
          pacman: {},
          palutena: {},
          peach: {},
          pikachu: {},
          pit: {},
          rob: {},
          robin: {},
          rosalina: {},
          roy: {},
          ryu: {},
          samus: {},
          sheik: {},
          shulk: {},
          sonic: {},
          toonlink: {},
          villager: {},
          wario: {},
          wiifittrainer: {},
          yoshi: {},
          zelda: {},
          zerosuitsamus: {}
        }
      },

      // Super Mario
      supermario: {
        title: "Super Mario",
        amiibos: {
          boo: {},
          bowser: {},
          daisy: {},
          diddykong: {},
          donkeykong: {},
          goldmario: {},
          luigi: {},
          mario: {},
          peach: {},
          rosalina: {},
          silvermario: {},
          toad: {},
          waluigi: {},
          wario: {},
          yoshi: {}
        }
      },

      // Yoshi
      yoshi: {
        title: "Yoshi",
        amiibos: {
          blueyarnyoshi: {},
          greenyarnyoshi: {},
          megayarnyoshi: {},
          pinkyarnyoshi: {},
          poochi: {}
        }
      }
    },


    // Local Storage configuration
    storage_settings: {
      id: "amiibo-collection",
      dont_use_local: false,
      is_local: window.localStorage ? true : false
    },


    /**
     * Initialize the application.
     */
    initialize: function() {
      var
        _this             = this;

      // Bind methods
      _.bindAll(this,
        'loadAmiibos',
        'toggleSelectedAmiibo'
      );
      
      // Initialize sticky navigation
      // Initialize main navigation as sticky
      $('.controls').sticky({
        start: 'top',
        end: 'top',
        smooth: true,
        stack: true,
        onStick: function(elm) {
          $(elm).addClass('stuck');
        },
        onUnstick: function(elm) {
          $(elm).removeClass('stuck');
        }
      });

      // Initialize model collection
      this.collection = new _ModuleCollection();

      // Load the amiibos
      this.loadAmiibos();
    },


    /**
     * Load collector's collected amiibos.
     */
    loadAmiibos: function() {
      var
        self        = this,
        path        = 'assets/images/amiibos/',
        grid        = $('.grid-container');

      // Test to see if we should load from local storage
      if (this.storage_settings.is_local && !this.storage_settings.dont_use_local) {
        if (window.localStorage.getItem(this.storage_settings.id)) {
          this.amiibos = JSON.parse(window.localStorage.getItem(this.storage_settings.id));
        }
      }

      // Iterate over amiibos
      _.each(this.amiibos, function(group, group_name) {
        var
          grid_group        = self.templates.amiiboGroup({
            group_name: group_name,
            group_title: group.title
          });

        // Add new group container
        grid.append(grid_group);

        // Create new group container
        _.each(group.amiibos, function(amiibo, amiibo_name) {
          var
            amiibo_path        = path + group_name + '-' + amiibo_name + '.png';

          // Create new grid object
          grid.find('.' + group_name + ' .group').append(self.templates.amiiboGridItem({
            amiibo_name: amiibo_name,
            amiibo_path: amiibo_path,
            amiibo_title: '',
            amiibo_class: ((amiibo.collected) ? 'collected' : '')
          }));
        });
      });
    },


    /**
     * Toggle whether or not an amiibo has been collected.
     */
    toggleSelectedAmiibo: function(e) {
      var
        target        = $(e.currentTarget),
        amiibo_group  = target.closest('.amiibo-grid').data('group-name'),
        amiibo_name   = target.data('amiibo-name');

      // Toggle the UI
      target.toggleClass('collected');

      // Update the collection object
      if (target.hasClass('collected')) {
        this.amiibos[amiibo_group].amiibos[amiibo_name].collected = true;
      } else {
        this.amiibos[amiibo_group].amiibos[amiibo_name].collected = false;
      }
      
      // Update the local storage object
      if (this.storage_settings.is_local && !this.storage_settings.dont_use_local) {
        window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.amiibos));
      }
    }

  });

  return _ModuleView;
});
