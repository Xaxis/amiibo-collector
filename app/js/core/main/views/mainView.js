/**
 * Backbone module view template
 *
 * @todo - Add functionality so that you can tap once to add to your COLLECTED list, tap twice to add to your
 * WANT/WISH list, tap three times to uncheck.
 *
 * @todo - Figure out why fontawesome icons aren't loading on mobile browsers.
 *
 * @todo - Add functionality to add/remove all of a group at once.
 *
 * @todo - Add in all animal crossing cards.
 *
 * @todo - Missing "Guardian" in the Legend of Zelda series.
 *
 * @todo - Splatoons boy titles are saying "girl"
 *
 * @todo - Write functionality that enables users to save collection configuration and then
 * reupload configuration later.
 *
 * @todo - Write deployment script.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.sticky',
  'text!core/main/templates/amiibo-group.tpl.html',
  'text!core/main/templates/amiibo-grid-item.tpl.html',
  'text!core/main/templates/message-browser-compat.tpl.html',
  'text!core/main/templates/menu-filter.tpl.html',
  'text!core/main/templates/menu-group.tpl.html',
  'text!core/main/templates/menu-group-group.tpl.html',
  'text!core/main/templates/menu-share.tpl.html',
  'text!core/main/templates/menu-stats.tpl.html',
  'text!core/main/templates/menu-stats-group.tpl.html'
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
        ec: '0',
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
        ec: '1',
        title: "Chibi Robo",
        amiibos: {
          robo: {
            title: "Chibi Robo"
          }
        }
      },

      // Kirby
      kirby: {
        ec: '2',
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
        ec: '3',
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
        ec: '4',
        title: "Mega Man - Legacy Collection",
        amiibos: {
          gold: {
            title: "Mega Man - Gold Edition"
          }
        }
      },

      // Monster hunter
      // monsterhunter: {
      //   ec: '5',
      //   title: "Monster Hunter",
      //   amiibos: {
      //
      //   }
      // },

      // Shovel knight
      shovelknight: {
        ec: '6',
        title: "Shovel Knight",
        amiibos: {
          shovelknight: {
            title: "Shovel Knight"
          }
        }
      },

      // Skylanders
      skylanders: {
        ec: '7',
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
        ec: '8',
        title: "Splatoons",
        amiibos: {
          callie: {
            title: "Callie"
          },
          inklingboy1: {
            title: "Inkling Girl"
          },
          inklingboy2: {
            title: "Inkling Girl"
          },
          inklinggirl1: {
            title: "Inkling Girl"
          },
          inklinggirl2: {
            title: "Inkling Girl"
          },
          inklingsquidgreen: {
            title: "Inkling Squid"
          },
          inklingsquidorange: {
            title: "Inkling Squid"
          },
          marie: {
            title: "Marie"
          }
        }
      },

      // Super smash brothers
      ssb: {
        ec: '9',
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
          metaknight: {
            title: "Meta Knight"
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
        ec: '10',
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
        ec: '11',
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
        ec: '12',
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
      dont_use_local: false,
      is_local: window.localStorage ? true : false,
      loaded: false
    },


    /**
     * Initialize the application.
     */
    initialize: function( route ) {

      // Bind methods
      _.bindAll(this,
        'loadAmiibos',
        'loadAmiibosFromURL',
        'storageDiffUpdate',
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

      // Load the amiibos
      this.loadAmiibos();

      // Examine the route seeing if it's a shared URL
      if (route) {
        if (route.match(/collection=/)) {
          var
            collection_str        = route.replace('collection=', '');
          this.loadAmiibosFromURL(collection_str);
        }
      }
    },


    /**
     * Load collector's collected amiibos.
     */
    loadAmiibos: function() {
      var
        self        = this,
        path        = 'app/assets/images/amiibos/',
        grid        = $('.grid-container');

      // Make sure the grid container is cleared out
      grid.empty();

      // Test to see if we should load from local storage
      if (this.storage_settings.is_local && !this.storage_settings.dont_use_local && !this.loaded) {
        this.loaded = true;
        if (window.localStorage.getItem(this.storage_settings.id)) {
          this.storageDiffUpdate();
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

        // Update meta properties
        group.id = group_name;
        group.size = _.size(group.amiibos);

        // Add group only if it hasn't been set to not load
        if (!group.unchecked) {

          // Add new group container
          grid.append(grid_group);

          // Create new group container
          var ec = 0;
          _.each(group.amiibos, function(amiibo, amiibo_name) {
            var
              amiibo_path        = path + group_name + '-' + amiibo_name + '.png';

            // Update amiibo id
            amiibo.id = amiibo_name;
            amiibo.ec = amiibo.ec || ec;
            ec++;

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
     * Takes an encoded collection URL and loads the corresponding collection to display.
     */
    loadAmiibosFromURL: function( url_str ) {
      var
        groups        = url_str.split('/[^0-9]/');
      // console.log(url_str);
      console.log(groups);
    },


    /**
     * Tests for differences in the collection initialization object and the local storage object, making changes where
     * applicable to the local storage object.
     */
    storageDiffUpdate: function() {
      var
        initObj         = this.amiibos,
        localObj        = JSON.parse(window.localStorage.getItem(this.storage_settings.id));

      // Add new groups to local object
      _.each(_.keys(initObj), function(v) {

        // Add new groups
        if (!(v in localObj)) {
          localObj[v] = initObj[v];
        }

        // Add collection item to the group
        _.each(initObj[v].amiibos, function(item, key) {
          if (!(key in localObj[v].amiibos)) {
            localObj[v].amiibos[key] = initObj[v].amiibos[key];
          }
        });
      });

      // Remove groups to local object
      _.each(_.keys(localObj), function(l) {

        // Remove old collection item from group
        _.each(localObj[l].amiibos, function(item, key) {
          if (!(key in initObj[l].amiibos)) {
            delete localObj[l].amiibos[key];
          }
        });

        // Remove old group
        if (!(l in initObj)) {
          delete localObj[l];
        }
      });

      // Update simple properties like titles that may have changed
      _.each(initObj, function(vObj, key) {
        if (vObj.title != localObj[key].title) {
          localObj[key].title = vObj.title;
        }

        // Iterate over the collection object checking simple things like titles
        _.each(initObj[key].amiibos, function(cObj, id) {
          if (localObj[key].amiibos[id].title != cObj.title) {
            localObj[key].amiibos[id].title = initObj[key].amiibos[id].title;
          }
        });
      });

      // Update the local storage object
      window.localStorage.setItem(this.storage_settings.id, JSON.stringify(localObj));
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

        // Determine percentage
        var group_perc = ((stats[group_name].owned / stats[group_name].total) * 100).toFixed(2);

        // Add a stat group to the container
        stats_container.append(self.templates.menuStatsGroup({
          group_id: group_name,
          group_title: group.title,
          group_total: stats[group_name].total,
          group_owned: stats[group_name].owned,
          group_perc: group_perc
        }));

        // Add the completed class if a group is completed
        if (group_perc >= 100) {
          $('[data-group-id="' + group_name + '"]').addClass('complete');
        }
      });

      // Determine overall percentage
      var overall_perc = ((stats.owned / stats.total) * 100).toFixed(2);

      // Add the overall stat
      stats_container.prepend(self.templates.menuStatsGroup({
        group_id: 'amiibo-total',
        group_title: "Total",
        group_total: stats.total,
        group_owned: stats.owned,
        group_perc: overall_perc
      }));

      // Add the completed class if all groups are completed
      if (overall_perc >= 100) {
        $('[data-group-id="amiibo-total"]').addClass('complete');
      }

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
    filterSortAlphaAsc: function() {

      // Sort the amiibo groups
     this.amiibos =  _.reduce(_.sortBy(this.amiibos, 'id'), function(o, v) {
        o[v.id] = v;
        return o;
      }, {});

      // Sort each amiibo groups amiibos
      _.each(this.amiibos, function(group) {
        group.amiibos = _.reduce(_.sortBy(group.amiibos, 'id'), function(o, v) {
          o[v.id] = v;
          return o;
        }, {});
      });

      // Reload the amiibos
      this.loadAmiibos();
      this.menus.filter.close();
    },


    /**
     * Sort groups alpha descending.
     */
    filterSortAlphaDesc: function() {

      // Sort the amiibo groups
      this.amiibos =  _.reduce(_.sortBy(this.amiibos, 'id').reverse(), function(o, v) {
        o[v.id] = v;
        return o;
      }, {});

      // Sort each amiibo groups amiibos
      _.each(this.amiibos, function(group) {
        group.amiibos = _.reduce(_.sortBy(group.amiibos, 'id').reverse(), function(o, v) {
          o[v.id] = v;
          return o;
        }, {});
      });

      // Reload the amiibos
      this.loadAmiibos();
      this.menus.filter.close();
    },


    /**
     * Sort by total number ascending.
     */
    filterSortTotalAsc: function() {

      // Sort the amiibo groups by
      this.amiibos =  _.reduce(_.sortBy(this.amiibos, 'size'), function(o, v) {
        o[v.id] = v;
        return o;
      }, {});

      // Reload the amiibos
      this.loadAmiibos();
      this.menus.filter.close();
    },


    /**
     * Sort by total number descending.
     */
    filterSortTotalDesc: function(e) {

      // Sort the amiibo groups by
      this.amiibos =  _.reduce(_.sortBy(this.amiibos, 'size').reverse(), function(o, v) {
        o[v.id] = v;
        return o;
      }, {});

      // Reload the amiibos
      this.loadAmiibos();
      this.menus.filter.close();
    },


    /**
     * Toggle and load the share menu
     * Load the share menu with a dynamically generated share URL and collection image.
     */
    toggleShareMenu: function( shared ) {
      var
        url_str         = '#collection=';

      // Add the modal menu
      if (!this.menus.share) {
        this.menus.share = $(this.templates.menuShare()).remodal();
        this.$el.append(this.menus.share);
        $('.url-share-input input').focus(function() {
          this.select();
        });
      }

      // Generate unique URL string
      _.each(this.amiibos, function(group) {
        url_str += 'g' + group.ec;
        _.each(group.amiibos, function(amiibo) {
          if (amiibo.collected) {
            url_str += 'a' + amiibo.ec;
          }
        });
      });

      // Populate the url into the input
      $('.url-share-input input').val(window.location.href.replace('#', '') + url_str);
      
      // Build a shareable image, reference canvas and its drawing context
      var
        canvas          = $('.image-canvas .share-image'),
        c_w             = 0,
        c_h             = 0,
        ctx             = null,
        items_to_draw   = 0,
        max_per_row     = 4,
        max_w           = 0,
        max_h           = 0,
        total_rows      = 1,
        row_w           = 0,
        row_h           = 0,
        items_drawn     = 0,
        rows_drawn      = 0,
        group_title_h   = 50,
        last_row_h      = 0,
        is_collected    = false;

      // Create canvas image size from items that need to be drawn
      _.each(this.amiibos, function(group) {
        var
          inc_row         = true,
          collected       = _.filter(group.amiibos, function(am) {
            return am.collected;
          }).length;

        // Update collected flag
        if (collected) is_collected = true;

        // Proceed if one or more in group is collected
        if (collected) {
          _.each(group.amiibos, function(amiibo, amiibo_name) {
            if (amiibo.collected) {
              var
                img       = $('.grid-item[data-amiibo-name="' + amiibo_name + '"] img')[0];

              // Update current maximum width if it's greater
              if (img.width > max_w) max_w = img.width;

              // Update current maximum height if it's greater
              if (img.height > max_h) max_h = img.height;

              // Increment the total items to draw
              items_to_draw += 1;

              // Increment total rows
              if (!(items_to_draw % max_per_row)) {
                total_rows += 1;
                inc_row = false;
              } else {
                inc_row = true;
              }
            }
          });
          if (!inc_row) total_rows += 1;
        }
      });

      // Proceed when at least one thing has been collected
      if (is_collected) {
        $('.not-collected-message').remove();

        // Update and set dimension values
        // total_rows = total_rows - _.size(this.amiibos);
        row_w = max_w * max_per_row;
        row_h = max_h;
        canvas[0].width = (row_w);
        canvas[0].height = (max_h * total_rows);
        canvas.width(canvas[0].width);
        canvas.height(canvas[0].height);
        c_w = canvas[0].width;
        c_h = canvas[0].height;
        ctx = canvas[0].getContext("2d", {alpha: true});

        // Set the canvas background color
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, c_w, c_h);

        // Draw the amiibos
        _.each(this.amiibos, function(group, group_name) {
          var
            collected       = _.filter(group.amiibos, function(am) {
              return am.collected;
            }).length;

          // Proceed if one or more in group has been collected
          if (collected) {

            // Draw group title text
            ctx.font = "28px Sans-Serif";
            ctx.fillStyle = "black";
            // ctx.fillText(group.title, 20, last_row_h + group_title_h);

            // Iterate over items in group
            _.each(group.amiibos, function(amiibo, amiibo_name) {
              if (amiibo.collected) {
                var
                  img       = $('.grid-item[data-amiibo-name="' + amiibo_name + '"] img')[0],
                  dx        = (max_w * items_drawn),
                  dy        = (max_h * rows_drawn);

                // Increment which item is being drawn in a given row
                items_drawn += 1;

                // Increment row being drawn
                if (items_drawn >= max_per_row) {
                  items_drawn = 0;
                  rows_drawn += 1;
                }

                // Update the height of the last row drawn
                last_row_h = dy + max_h;

                // Draw the image
                ctx.drawImage(img, dx, dy, img.width, img.height);
              }
            });

            // Update number of rows drawn
            if (items_drawn > 0) rows_drawn += 1;
            items_drawn = 0;
          }
        });

        // Convert canvas to image element
        var collection_img = new Image();
        collection_img.src = canvas[0].toDataURL("image/png");
        $('.image-link-wrapper').remove();
        var link_wrapper = $('<a class="image-link-wrapper" href="' + collection_img.src + '" download="AmiiboCollection.png"></a>');
        link_wrapper.html(collection_img);
        canvas.after(link_wrapper);
        canvas.hide();

        // Update the image download link
        $('.image-share-info a').attr('href', collection_img.src);
      }

      // Update with nothing collected message
      else {
        $('.not-collected-message').remove();
        $('.image-canvas').prepend('<div class="not-collected-message">It appears you have not collected anything yet!</div>');
        $('.image-canvas').find('img').remove();
        canvas.hide();
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
