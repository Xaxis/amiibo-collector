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
      monsterhunter: {
        title: "Monster Hunter",
        amiibos: {

        }
      },

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
console.log(amiibo);
          // Create new grid object
          grid.find('.' + group_name + ' .group').append(self.templates.amiiboGridItem({
            amiibo_name: amiibo_name,
            amiibo_path: amiibo_path,
            amiibo_title: amiibo.title || '',
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
