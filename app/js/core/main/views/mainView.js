/**
 * Backbone module view template
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.sticky',
  'text!../templates/amiibo-group.tpl.html',
  'text!../templates/amiibo-grid-item.tpl.html',
  'text!../templates/message-browser-compat.tpl.html',
  'text!../templates/menu-filter.tpl.html',
  'text!../templates/menu-group.tpl.html',
  'text!../templates/menu-group-group.tpl.html',
  'text!../templates/menu-share.tpl.html',
  'text!../templates/menu-stats.tpl.html',
  'text!../templates/menu-stats-group.tpl.html'
], function(
  $,
  _,
  Backbone,
  Sticky,
  amiiboGroupTpl,
  amiiboGridItemTpl,
  messageBrowserCompatTpl,
  menuFilterTpl,
  menuGroupTpl,
  menuGroupGroupTpl,
  menuShareTpl,
  menuStatsTpl,
  menuStatsGroupTpl
) {
  var _ModuleView = Backbone.View.extend({
    el: $('body'),

    templates: {
      amiiboGroup: _.template(amiiboGroupTpl),
      amiiboGridItem: _.template(amiiboGridItemTpl),
      messageBrowserCompat: _.template(messageBrowserCompatTpl),
      menuFilter: _.template(menuFilterTpl),
      menuGroup: _.template(menuGroupTpl),
      menuGroupGroup: _.template(menuGroupGroupTpl),
      menuShare: _.template(menuShareTpl),
      menuStats: _.template(menuStatsTpl),
      menuStatsGroup: _.template(menuStatsGroupTpl)
    },

    events: {
      'click .control-stats': 'toggleStatsMenu',
      'click .control-group': 'toggleGroupMenu',
      'click .control-filter': 'toggleFilterMenu',
      'click .control[data-control-id="sort-alpha-asc"]': 'filterSortAlphaAsc',
      'click .control[data-control-id="sort-alpha-desc"]': 'filterSortAlphaDesc',
      'click .control[data-control-id="sort-total-asc"]': 'filterSortTotalAsc',
      'click .control[data-control-id="sort-total-desc"]': 'filterSortTotalDesc',
      'click .control-share': 'toggleShareMenu',
      'click .grid-item': 'toggleSelectedAmiibo'
    },

    // Stores references to loaded menus
    menus: {},

    amiibos: {

      // Animal Crossing
      animalcrossing: {
        title: "Animal Crossing",
        amiibos: {
          blathers: {
            title: "Blathers"
          },
          celeste: {
            title: "Celeste"
          },
          cyrus: {
            title: "Cyrus"
          },
          digby: {
            title: "Digby"
          },
          isabellewinteroutfit: {
            title: "Isabelle (winter outfit)"
          },
          kappn: {
            title: "Kappn"
          },
          kicks: {
            title: "Kicks"
          },
          kk: {
            title: "K.K."
          },
          lottie: {
            title: "Lottie"
          },
          mabel: {
            title: "Mabel"
          },
          reese: {
            title: "Reese"
          },
          reseti: {
            title: "Reseti"
          },
          rover: {
            title: "Rover"
          },
          timmytommy: {
            title: "Timmy & Tommy"
          },
          tomnook: {
            title: "Tom Nook"
          }
        }
      },

      // Chibi robo
      chibi: {
        title: "Chibi Robo",
        amiibos: {
          robo: {
            title: "Chibi Robo"
          }
        }
      },

      // Kirby - @todo - Where are the rest of the kirbys?
      kirby: {
        title: "Kirby",
        amiibos: {
          kingdedede: {
            title: "King Dedede"
          },
          kirby: {
            title: "Kirby"
          },
          metaknight: {
            title: "Meta Knight"
          },
          waddledee: {
            title: "Waddle Dee"
          }
        }
      },

      // Legend of zelda
      loz: {
        title: "Legend of Zelda",
        amiibos: {
          anniversarylink: {
            title: "Link - 30th Anniversary"
          },
          linkarcher: {
            title: "Link - Archer"
          },
          linkrider: {
            title: "Link - Rider"
          },
          ocarinalink: {
            title: "Link - Ocarina of Time"
          },
          toonlink: {
            title: "Toon Link - The Wind Waker"
          },
          wolflink: {
            title: "Wolf Link"
          },
          zelda: {
            title: "Zelda - The Wind Waker"
          }
        }
      },

      // Mega man
      megaman: {
        title: "Mega Man - Legacy Collection",
        amiibos: {
          gold: {
            title: "Mega Man - Gold Edition"
          }
        }
      },

      // Monster hunter
      // monsterhunter: {
      //   title: "Monster Hunter",
      //   amiibos: {
      //
      //   }
      // },

      // Shovel knight
      shovelknight: {
        title: "Shovel Knight",
        amiibos: {
          shovelknight: {
            title: "Shovel Knight"
          }
        }
      },

      // Skylanders
      skylanders: {
        title: "Skylanders Superchargers",
        amiibos: {
          hammerslambowser: {
            title: "Hammer Slam Bowser"
          },
          superchargeddonkeykong: {
            title: "Super Charged Donkey Kong"
          }
        }
      },

      // Splatoons
      splatoons: {
        title: "Splatoons",
        amiibos: {
          callie: {
            title: "Callie"
          },
          inklingboy1: {
            title: "Inkling Girl 1"
          },
          inklingboy2: {
            title: "Inkling Girl 2"
          },
          inklinggirl1: {
            title: "Inkling Girl 1"
          },
          inklinggirl2: {
            title: "Inkling Girl 2"
          },
          inklingsquidgreen: {
            title: "Inkling Squid (Green)"
          },
          inklingsquidorange: {
            title: "Inkling Squid (Orange)"
          },
          marie: {
            title: "Marie"
          }
        }
      },

      // Super smash brothers
      ssb: {
        title: "Super Smash Brothers",
        amiibos: {
          bowser: {
            title: "Bowser"
          },
          bowserjr: {
            title: "Bowser Jr."
          },
          captainfalcon: {
            title: "Captain Falcon"
          },
          charizard: {
            title: "Charizard"
          },
          darkpit: {
            title: "Dark Pit"
          },
          diddykong: {
            title: "Diddy Kong"
          },
          donkeykong: {
            title: "Donkey Kong"
          },
          drmario: {
            title: "Dr. Mario"
          },
          duckhunt: {
            title: "Duck Hunt Dog"
          },
          falco: {
            title: "Falco"
          },
          famicomrob: {
            title: "Famicom Rob"
          },
          fox: {
            title: "Fox"
          },
          gamewatch: {
            title: "Mr. Game & Watch"
          },
          ganondorf: {
            title: "Ganondorf"
          },
          greninja: {
            title: "Greninja"
          },
          ike: {
            title: "Ike"
          },
          jigglypuff: {
            title: "Jiggly Puff"
          },
          kingdedede: {
            title: "King Dedede"
          },
          kirby: {
            title: "Kirby"
          },
          link: {
            title: "Link"
          },
          littlemac: {
            title: "Little Mac"
          },
          lucario: {
            title: "Lucario"
          },
          lucas: {
            title: "Lucas"
          },
          lucina: {
            title: "Lucina"
          },
          luigi: {
            title: "Luigi"
          },
          mario: {
            title: "Mario"
          },
          marth: {
            title: "Marth"
          },
          megaman: {
            title: "Mega Man"
          },
          mewtwo: {
            title: "Mewtwo"
          },
          miibrawler: {
            title: "Mii Brawler"
          },
          miigunner: {
            title: "Mii Gunner"
          },
          miiswordfighter: {
            title: "Mii Sword Fighter"
          },
          ness: {
            title: "Ness"
          },
          olimar: {
            title: "Olimar"
          },
          pacman: {
            title: "Pac Man"
          },
          palutena: {
            title: "Palutena"
          },
          peach: {
            title: "Peach"
          },
          pikachu: {
            title: "Pikachu"
          },
          pit: {
            title: "Pit"
          },
          rob: {
            title: "Rob"
          },
          robin: {
            title: "Robin"
          },
          rosalina: {
            title: "Rosalina"
          },
          roy: {
            title: "Roy"
          },
          ryu: {
            title: "Ryu"
          },
          samus: {
            title: "Samus"
          },
          sheik: {
            title: "Sheik"
          },
          shulk: {
            title: "Shulk"
          },
          sonic: {
            title: "Sonic"
          },
          toonlink: {
            title: "Toon Link"
          },
          villager: {
            title: "Villager"
          },
          wario: {
            title: "Wario"
          },
          wiifittrainer: {
            title: "Wii Fit Trainer"
          },
          yoshi: {
            title: "Yoshi"
          },
          zelda: {
            title: "Zelda"
          },
          zerosuitsamus: {
            title: "Zero Suit Samus"
          }
        }
      },

      // Super Mario
      supermario: {
        title: "Super Mario",
        amiibos: {
          boo: {
            title: "Boo"
          },
          bowser: {
            title: "Bowser"
          },
          daisy: {
            title: "Daisy"
          },
          diddykong: {
            title: "Diddy Kong"
          },
          donkeykong: {
            title: "Donkey Kong"
          },
          goldmario: {
            title: "Gold Mario"
          },
          luigi: {
            title: "Luigi"
          },
          mario: {
            title: "Mario"
          },
          peach: {
            title: "Peach"
          },
          rosalina: {
            title: "Rosalina"
          },
          silvermario: {
            title: "Silver Mario"
          },
          toad: {
            title: "Toad"
          },
          waluigi: {
            title: "Waluigi"
          },
          wario: {
            title: "Wario"
          },
          yoshi: {
            title: "Yoshi"
          }
        }
      },

      // Super Mario Bros. 30th
      supermario30th: {
        title: "Super Mario Bros. 30th",
        amiibos: {
          classiccolor: {
            title: "30th Anniversary Mario - Classic Color"
          },
          moderncolor: {
            title: "30th Anniversary Mario - Modern Color"
          }
        }
      },

      // Yoshi
      yoshi: {
        title: "Yoshi",
        amiibos: {
          blueyarnyoshi: {
            title: "Blue Yarn Yoshi"
          },
          greenyarnyoshi: {
            title: "Green Yarn Yoshi"
          },
          megayarnyoshi: {
            title: "Mega Yarn Yoshi"
          },
          pinkyarnyoshi: {
            title: "Pink Yarn Yoshi"
          },
          poochy: {
            title: "Poochy"
          }
        }
      }
    },


    // Local Storage configuration
    storage_settings: {
      id: "amiibo-collection",
      dont_use_local: true,
      is_local: window.localStorage ? true : false
    },


    /**
     * Initialize the application.
     */
    initialize: function() {

      // Bind methods
      _.bindAll(this,
        'loadAmiibos',
        'toggleStatsMenu',
        'toggleGroupMenu',
        'toggleFilterMenu',
        'filterSortAlphaAsc',
        'filterSortAlphaDesc',
        'filterSortTotalAsc',
        'filterSortTotalDesc',
        'toggleShareMenu',
        'toggleSelectedAmiibo'
      );
      
      // Initialize sticky navigation
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
      
      // Trigger not supported message if user browser doesn't support localStorage
      if (!this.storage_settings.is_local) {
        var modal = $(this.templates.messageBrowserCompat({
          app_name: "Amiibo Collector"
        })).remodal();
        this.$el.append(modal);
        modal.open();
      }

      // Load the menus
      // ...

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

      // Make sure the grid container is cleared out
      grid.empty();

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

        // Add group only if it hasn't been set to not load
        if (!group.unchecked) {

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
              amiibo_title: amiibo.title || '',
              amiibo_class: ((amiibo.collected) ? 'collected' : '')
            }));
          });
        }
      });
    },


    /**
     * Toggle and populate the stats menu.
     */
    toggleStatsMenu: function() {
      var
        self                = this,
        stats_container     = null,
        stats               = {
          total: 0,
          owned: 0
        };

      // Add the modal menu
      if (!this.menus.stats) {
        this.menus.stats = $(this.templates.menuStats()).remodal();
        this.$el.append(this.menus.stats);
      }

      // Reference the stats container
      stats_container = $('.stats-container');

      // Clear previous stats
      stats_container.empty();

      // Populate the statistics object
      _.each(this.amiibos, function(group, group_name) {
        stats[group_name] = {
          total: _.size(group.amiibos),
          owned: _.size(_.filter(group.amiibos, function(amiibo) {
            return amiibo.collected;
          }))
        };

        // Update overall totals
        stats.total += stats[group_name].total;
        stats.owned += stats[group_name].owned;

        // Add a stat group to the container
        stats_container.append(self.templates.menuStatsGroup({
          group_name: group.title,
          group_total: stats[group_name].total,
          group_owned: stats[group_name].owned,
          group_perc: ((stats[group_name].owned / stats[group_name].total) * 100).toFixed(2)
        }));
      });

      // Add the overall stat
      stats_container.prepend(self.templates.menuStatsGroup({
        group_name: "Total",
        group_total: stats.total,
        group_owned: stats.owned,
        group_perc: ((stats.owned / stats.total) * 100).toFixed(2)
      }));

      // Toggle menu open/closed
      this.menus.stats.open();
    },


    /**
     * Toggle and load the group menu.
     */
    toggleGroupMenu: function() {
      var
        self                = this,
        groups_container    = null;

      // Add the modal menu
      if (!this.menus.group) {
        this.menus.group = $(this.templates.menuGroup()).remodal();
        this.$el.append(this.menus.group);
      }

      // Reference the group container
      groups_container = $('.groups-container');

      // Proceed to load menu if it hasn't already been loaded
      if (!groups_container.children().length) {
        _.each(this.amiibos, function(group, group_name) {

          // Add the group controls
          groups_container.append(self.templates.menuGroupGroup({
            group_name: group_name,
            group_title: group.title,
            checked: group.unchecked ? '' : 'checked'
          }));
        });

        // Attach event handler to inputs
        $('.group-input input').on('click', function(e) {
          var
            target        = $(e.currentTarget),
            group_name    = target.data('id'),
            checked       = target.is(':checked') ? false : true;

          // Update whether the group is selected
          self.amiibos[group_name].unchecked = checked;

          // Update the local storage object
          if (self.storage_settings.is_local && !self.storage_settings.dont_use_local) {
            window.localStorage.setItem(self.storage_settings.id, JSON.stringify(self.amiibos));
          }

          // Reload the amiibos
          self.loadAmiibos();
        });

        // Attach event handler to titles
        $('.group-title').on('click', function(e) {
          var
            target        = $(e.currentTarget),
            target_id     = target.data('id');

          // Iterate through groups
          _.each(self.amiibos, function(group, group_name) {
            var
              input       = $('input[data-id="' + group_name + '"]');
            if (target_id != group_name) {
              self.amiibos[group_name].unchecked = true;
              input.prop('checked', false);
              self.loadAmiibos();
            } else {
              self.amiibos[group_name].unchecked = false;
              input.prop('checked', true);
            }
          });

          // Close the modal
          self.menus.group.close();
        });
      }

      // Toggle menu open/closed
      this.menus.group.open();
    },


    /**
     * Toggle and load the filter menu
     */
    toggleFilterMenu: function() {
      if (!this.menus.filter) {
        this.menus.filter = $(this.templates.menuFilter()).remodal();
        this.$el.append(this.menus.filter);
      }

      // Toggle menu open/closed
      this.menus.filter.open();
    },

    /**
     * Sort groups alpha ascending.
     */
    filterSortAlphaAsc: function(e) {
      this.amiibos = _.sortBy(this.amiibos);
      console.log(this.amiibos);
      this.loadAmiibos();
    },


    /**
     * Sort groups alpha descending.
     */
    filterSortAlphaDesc: function(e) {
      var
        self                = this,
        amiibos             = {};

      // Sort
      amiibos = _.sortBy(this.amiibos);
      console.log(amiibos);
    },


    /**
     * Sort by total number ascending.
     */
    filterSortTotalAsc: function(e) {
      console.log(e);
    },


    /**
     * Sort by total number descending.
     */
    filterSortTotalDesc: function(e) {
      console.log(e);
    },


    /**
     * Toggle and load the share menu
     */
    toggleShareMenu: function() {
      if (!this.menus.share) {
        this.menus.share = $(this.templates.menuShare()).remodal();
        this.$el.append(this.menus.share);
      }

      // Toggle menu open/closed
      this.menus.share.open();
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
