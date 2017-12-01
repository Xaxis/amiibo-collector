/**
 * Meat and potatoes of this app.
 *
 * @todo - Write deployment script.
 *
 * @todo - Add user accounts, server storage of collections??
 *
 * @todo - Refactor app to include custom collection functionality??
 *
 * @todo - Create message/template for when no groups are being displayed.
 *
 * @todo - Add sort by regions filter??
 *
 * @todo - Create filter to allow users to not show/load pictures?
 *
 * @todo - Create a bug reporting app/menu so people can email me problems/bugs, with captcha.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.sticky',
  'jquery.lazyload',
  'text!core/main/templates/collection-group.tpl.html',
  'text!core/main/templates/collection-group-item.tpl.html',
  'text!core/main/templates/message-browser-compat.tpl.html',
  'text!core/main/templates/menu-item-settings.tpl.html',
  'text!core/main/templates/menu-item-settings-subitem.tpl.html',
  'text!core/main/templates/menu-sort.tpl.html',
  'text!core/main/templates/menu-group.tpl.html',
  'text!core/main/templates/menu-group-group.tpl.html',
  'text!core/main/templates/menu-tools.tpl.html',
  'text!core/main/templates/menu-stats.tpl.html',
  'text!core/main/templates/menu-stats-group.tpl.html'
], function(
  $,
  _,
  Backbone,
  Sticky,
  LazyLoad,
  collectionGroupTpl,
  collectionGroupItemTpl,
  messageBrowserCompatTpl,
  menuItemSettingsTpl,
  menuItemSettingsSubitemTpl,
  menuSortTpl,
  menuGroupTpl,
  menuGroupGroupTpl,
  menuToolsTpl,
  menuStatsTpl,
  menuStatsGroupTpl
) {
  var Main = Backbone.View.extend({
    el: $('body'),

    templates: {
      collectionGroup: _.template(collectionGroupTpl),
      collectionGroupItem: _.template(collectionGroupItemTpl),
      messageBrowserCompat: _.template(messageBrowserCompatTpl),
      menuItemSettings: _.template(menuItemSettingsTpl),
      menuItemSettingsSubitem: _.template(menuItemSettingsSubitemTpl),
      menuSort: _.template(menuSortTpl),
      menuGroup: _.template(menuGroupTpl),
      menuGroupGroup: _.template(menuGroupGroupTpl),
      menuTools: _.template(menuToolsTpl),
      menuStats: _.template(menuStatsTpl),
      menuStatsGroup: _.template(menuStatsGroupTpl)
    },

    events: {

      // @todo - Possibly refactor stats menu into own view
      'click .control-stats': 'toggleStatsMenu',

      // @todo - Possibly refactor group menu into own view
      'click .control-group': 'toggleGroupMenu',
      'click .menu-group .toggle-group-expando': 'groupMenuToggleGroupOpenClosed',
      'click .menu-group .toggle-all-collected': 'groupMenuToggleAllCollected',
      'click .menu-group .toggle-on-off': 'groupMenuToggleGroupOnOff',
      'click .menu-group .group-title': 'groupMenuJumpToGroup',

      // @todo - Possibly refactor sort menu into own view
      'click .control-sort': 'toggleSortMenu',
      'click .control[data-control-id="sort-alpha-asc"]': 'handleSort',
      'click .control[data-control-id="sort-alpha-desc"]': 'handleSort',
      'click .control[data-control-id="sort-total-asc"]': 'handleSort',
      'click .control[data-control-id="sort-total-desc"]': 'handleSort',
      'click .control[data-control-id="sort-numeric-asc"]': 'handleSort',
      'click .control[data-control-id="sort-numeric-desc"]': 'handleSort',

      // @todo - Refactor tools menu into own view
      'click .control-tools': 'toggleToolsMenu',
      'click .menu-tools .control-generate-json-config .button': 'generateJSONConfig',
      'click .menu-tools .control-upload-json-config .button': 'uploadJSONConfig',
      'click .menu-tools .control-collection-reset .button': 'handleCollectionRestart',

      // @todo - Possibly refactor group controls into own view
      'click .collection-group h2 .group-expando-toggle': 'groupToggleOpenClosed',
      'click .collection-group h2 .group-select-toggle': 'groupToggleCollected',
      'click .collection-group h2 .group-toggle-on-off': 'groupToggleOnOff',
      'click .collection-group h2 .group-more': 'groupToggleMoreMenuOpenClosed',
      'click .collection-group h2 .group-sort-alpha-asc': 'groupHandleSort',
      'click .collection-group h2 .group-sort-alpha-desc': 'groupHandleSort',
      'click .collection-group h2 .group-sort-numeric-asc': 'groupHandleSort',
      'click .collection-group h2 .group-sort-numeric-desc': 'groupHandleSort',

      // @todo - Possibly refactor item controls/menu into own view
      'click .collection-group-item': 'toggleSelectedItem',
      'click .collection-group-item .collection-group-item-title .button': 'toggleItemSettingsMenu',
      'click .menu-item-settings .controls-item-add': 'itemSettingsAddSubitem',
      'click .menu-item-settings .controls-item-up': 'itemSettingsUpSubitem',
      'click .menu-item-settings .controls-item-favorite': 'itemSettingsFavoriteSubitem',
      'click .menu-item-settings .controls-item-remove': 'itemSettingsRemoveSubitem',
      'click .menu-item-settings .controls-item-favorite-selected': 'itemSettingsFavoriteSubitem',
      'change .menu-item-settings .controls-item-status select': 'itemSettingsSubitemStatusUpdate',
      'change .menu-item-settings .controls-item-condition select': 'itemSettingsSubitemConditionUpdate',
      'click .menu-item-settings .controls-item-note .button': 'itemSettingsSubitemNoteToggle',
      'click .menu-item-settings .controls-item-note .notepad': 'itemSettingsSubitemNoteToggle',

      // @todo - Refactor below global events into own file or view
      'click .back-to-top': 'scrollViewportBackToTop'
    },

    // Stores references to loaded menus
    menus: {},

    // Collection initialization object
    collection: {

      // Animal crossing cards (Series 1)
      animcalcrossingcards_series1: {
        title: "AC Cards - Series 1",
        weight: 2,
        collection: {
          1: {
            title: "Isabelle"
          },
          2: {
            title: "Tom Nook"
          },
          3: {
            title: "DJ KK"
          },
          4: {
            title: "Sable"
          },
          5: {
            title: "Kapp'n"
          },
          6: {
            title: "Resetti"
          },
          7: {
            title: "Joan"
          },
          8: {
            title: "Timmy"
          },
          9: {
            title: "Digby"
          },
          10: {
            title: "Pascal"
          },
          11: {
            title: "Harriet"
          },
          12: {
            title: "Redd"
          },
          13: {
            title: "Saharah"
          },
          14: {
            title: "Luna"
          },
          15: {
            title: "Tortimer"
          },
          16: {
            title: "Lyle"
          },
          17: {
            title: "Lottie"
          },
          18: {
            title: "Bob"
          },
          19: {
            title: "Fauna"
          },
          20: {
            title: "Curt"
          },
          21: {
            title: "Portia"
          },
          22: {
            title: "Leonardo"
          },
          23: {
            title: "Cheri"
          },
          24: {
            title: "Kyle"
          },
          25: {
            title: "Al"
          },
          26: {
            title: "Renee"
          },
          27: {
            title: "Lopez"
          },
          28: {
            title: "Jambette"
          },
          29: {
            title: "Rasher"
          },
          30: {
            title: "Tiffany"
          },
          31: {
            title: "Sheldon"
          },
          32: {
            title: "Bluebear"
          },
          33: {
            title: "Bill"
          },
          34: {
            title: "Kiki"
          },
          35: {
            title: "Deli"
          },
          36: {
            title: "Alli"
          },
          37: {
            title: "Kabuki"
          },
          38: {
            title: "Patty"
          },
          39: {
            title: "Jitters"
          },
          40: {
            title: "Gigi"
          },
          41: {
            title: "Quillson"
          },
          42: {
            title: "Marcie"
          },
          43: {
            title: "Puck"
          },
          44: {
            title: "Shari"
          },
          45: {
            title: "Octavian"
          },
          46: {
            title: "Winnie"
          },
          47: {
            title: "Knox"
          },
          48: {
            title: "Sterling"
          },
          49: {
            title: "Bonbon"
          },
          50: {
            title: "Punchy"
          },
          51: {
            title: "Opal"
          },
          52: {
            title: "Poppy"
          },
          53: {
            title: "Limberg"
          },
          54: {
            title: "Deena"
          },
          55: {
            title: "Snake"
          },
          56: {
            title: "Bangle"
          },
          57: {
            title: "Phil"
          },
          58: {
            title: "Monique"
          },
          59: {
            title: "Nate"
          },
          60: {
            title: "Samson"
          },
          61: {
            title: "Tutu"
          },
          62: {
            title: "T-Bone"
          },
          63: {
            title: "Mint"
          },
          64: {
            title: "Pudge"
          },
          65: {
            title: "Midge"
          },
          66: {
            title: "Gruff"
          },
          67: {
            title: "Flurry"
          },
          68: {
            title: "Clyde"
          },
          69: {
            title: "Bella"
          },
          70: {
            title: "Biff"
          },
          71: {
            title: "Yuka"
          },
          72: {
            title: "Lionel"
          },
          73: {
            title: "Flo"
          },
          74: {
            title: "Cobb"
          },
          75: {
            title: "Amelia"
          },
          76: {
            title: "Jeremiah"
          },
          77: {
            title: "Cherry"
          },
          78: {
            title: "Roscoe"
          },
          79: {
            title: "Truffles"
          },
          80: {
            title: "Eugene"
          },
          81: {
            title: "Eunice"
          },
          82: {
            title: "Goose"
          },
          83: {
            title: "Annalisa"
          },
          84: {
            title: "Benjamin"
          },
          85: {
            title: "Pancetti"
          },
          86: {
            title: "Chief"
          },
          87: {
            title: "Bunnie"
          },
          88: {
            title: "Clay"
          },
          89: {
            title: "Diana"
          },
          90: {
            title: "Axel"
          },
          91: {
            title: "Muffy"
          },
          92: {
            title: "Henry"
          },
          93: {
            title: "Bertha"
          },
          94: {
            title: "Cyrano"
          },
          95: {
            title: "Peanut"
          },
          96: {
            title: "Cole"
          },
          97: {
            title: "Willow"
          },
          98: {
            title: "Roald"
          },
          99: {
            title: "Molly"
          },
          100: {
            title: "Walker"
          }
        }
      },

      // Animal crossing cards (Series 2)
      animcalcrossingcards_series2: {
        title: "AC Cards - Series 2",
        weight: 2,
        collection: {
          1: {
            title: "K.K."
          },
          2: {
            title: "Reese"
          },
          3: {
            title: "Kicks"
          },
          4: {
            title: "Labelle"
          },
          5: {
            title: "Copper"
          },
          6: {
            title: "Booker"
          },
          7: {
            title: "Katie"
          },
          8: {
            title: "Tommy"
          },
          9: {
            title: "Porter"
          },
          10: {
            title: "Leila"
          },
          11: {
            title: "Shrunk"
          },
          12: {
            title: "Don"
          },
          13: {
            title: "Isabelle"
          },
          14: {
            title: "Blanca"
          },
          15: {
            title: "Nat"
          },
          16: {
            title: "Chip"
          },
          17: {
            title: "Jack"
          },
          18: {
            title: "Poncho"
          },
          19: {
            title: "Felicity"
          },
          20: {
            title: "Ozzie"
          },
          21: {
            title: "Tia"
          },
          22: {
            title: "Lucha"
          },
          23: {
            title: "Fuchsia"
          },
          24: {
            title: "Harry"
          },
          25: {
            title: "Gwen"
          },
          26: {
            title: "Coach"
          },
          27: {
            title: "Kitt"
          },
          28: {
            title: "Tom"
          },
          29: {
            title: "Tipper"
          },
          30: {
            title: "Prince"
          },
          31: {
            title: "Pate"
          },
          32: {
            title: "Vladimir"
          },
          33: {
            title: "Savannah"
          },
          34: {
            title: "Kid"
          },
          35: {
            title: "Phoebe"
          },
          36: {
            title: "Egbert"
          },
          37: {
            title: "Cookie"
          },
          38: {
            title: "Sly"
          },
          39: {
            title: "Blaire"
          },
          40: {
            title: "Avery"
          },
          41: {
            title: "Nana"
          },
          42: {
            title: "Peck"
          },
          43: {
            title: "Olivia"
          },
          44: {
            title: "Cesar"
          },
          45: {
            title: "Carmen"
          },
          46: {
            title: "Rodney"
          },
          47: {
            title: "Scoot"
          },
          48: {
            title: "Whitney"
          },
          49: {
            title: "Broccolo"
          },
          50: {
            title: "Coco"
          },
          51: {
            title: "Groucho"
          },
          52: {
            title: "Wendy"
          },
          53: {
            title: "Alfonso"
          },
          54: {
            title: "Rhonda"
          },
          55: {
            title: "Butch"
          },
          56: {
            title: "Gabi"
          },
          57: {
            title: "Moose"
          },
          58: {
            title: "Timbra"
          },
          59: {
            title: "Zell"
          },
          60: {
            title: "Pekoe"
          },
          61: {
            title: "Teddy"
          },
          62: {
            title: "Mathilda"
          },
          63: {
            title: "Ed"
          },
          64: {
            title: "Bianca"
          },
          65: {
            title: "Filbert"
          },
          66: {
            title: "Kitty"
          },
          67: {
            title: "Beau"
          },
          68: {
            title: "Nan"
          },
          69: {
            title: "Bud"
          },
          70: {
            title: "Ruby"
          },
          71: {
            title: "Benedict"
          },
          72: {
            title: "Agnes"
          },
          73: {
            title: "Julian"
          },
          74: {
            title: "Bettina"
          },
          75: {
            title: "Jay"
          },
          76: {
            title: "Sprinkle"
          },
          77: {
            title: "Flip"
          },
          78: {
            title: "Hugh"
          },
          79: {
            title: "Hopper"
          },
          80: {
            title: "Pecan"
          },
          81: {
            title: "Drake"
          },
          82: {
            title: "Alice"
          },
          83: {
            title: "Camofrog"
          },
          84: {
            title: "Anicotti"
          },
          85: {
            title: "Chops"
          },
          86: {
            title: "Charlise"
          },
          87: {
            title: "Vic"
          },
          88: {
            title: "Ankha"
          },
          89: {
            title: "Drift"
          },
          90: {
            title: "Vesta"
          },
          91: {
            title: "Marcel"
          },
          92: {
            title: "Pango"
          },
          93: {
            title: "Keaton"
          },
          94: {
            title: "Gladys"
          },
          95: {
            title: "Hamphrey"
          },
          96: {
            title: "Freya"
          },
          97: {
            title: "Kid Cat"
          },
          98: {
            title: "Agent S"
          },
          99: {
            title: "Big Top"
          },
          100: {
            title: "Rocket"
          }
        }
      },

      // Animal crossing cards (Series 3)
      animcalcrossingcards_series3: {
        title: "AC Cards - Series 3",
        weight: 2,
        collection: {
          1: {
            title: "Rover"
          },
          2: {
            title: "Blathers"
          },
          3: {
            title: "Tom Nook"
          },
          4: {
            title: "Pelly"
          },
          5: {
            title: "Phyllis"
          },
          6: {
            title: "Pete"
          },
          7: {
            title: "Mabel"
          },
          8: {
            title: "Leif"
          },
          9: {
            title: "Wendell"
          },
          10: {
            title: "Cyrus"
          },
          11: {
            title: "Grams"
          },
          12: {
            title: "Timmy"
          },
          13: {
            title: "Digby"
          },
          14: {
            title: "Don"
          },
          15: {
            title: "Isabelle"
          },
          16: {
            title: "Franklin"
          },
          17: {
            title: "Jingle"
          },
          18: {
            title: "Lily"
          },
          19: {
            title: "Anchovy"
          },
          20: {
            title: "Tabby"
          },
          21: {
            title: "Kody"
          },
          22: {
            title: "Miranda"
          },
          23: {
            title: "Del"
          },
          24: {
            title: "Paula"
          },
          25: {
            title: "Ken"
          },
          26: {
            title: "Mitzi"
          },
          27: {
            title: "Rodeo"
          },
          28: {
            title: "Bubbles"
          },
          29: {
            title: "Cousteau"
          },
          30: {
            title: "Velma"
          },
          31: {
            title: "Elvis"
          },
          32: {
            title: "Canberra"
          },
          33: {
            title: "Colton"
          },
          34: {
            title: "Marina"
          },
          35: {
            title: "Spork"
          },
          36: {
            title: "Freckles"
          },
          37: {
            title: "Bam"
          },
          38: {
            title: "Friga"
          },
          39: {
            title: "Ricky"
          },
          40: {
            title: "Deirdre"
          },
          41: {
            title: "Hans"
          },
          42: {
            title: "Chevre"
          },
          43: {
            title: "Drago"
          },
          44: {
            title: "Tangy"
          },
          45: {
            title: "Mac"
          },
          46: {
            title: "Eloise"
          },
          47: {
            title: "Wart Jr."
          },
          48: {
            title: "Hazel"
          },
          49: {
            title: "Beardo"
          },
          50: {
            title: "Ava"
          },
          51: {
            title: "Chester"
          },
          52: {
            title: "Merry"
          },
          53: {
            title: "Genji"
          },
          54: {
            title: "Greta"
          },
          55: {
            title: "Wolfgang"
          },
          56: {
            title: "Diva"
          },
          57: {
            title: "Klaus"
          },
          58: {
            title: "Daisy"
          },
          59: {
            title: "Stinky"
          },
          60: {
            title: "Tammi"
          },
          61: {
            title: "Tucker"
          },
          62: {
            title: "Blanche"
          },
          63: {
            title: "Gaston"
          },
          64: {
            title: "Marshal"
          },
          65: {
            title: "Gala"
          },
          66: {
            title: "Joey"
          },
          67: {
            title: "Pippy"
          },
          68: {
            title: "Buck"
          },
          69: {
            title: "Bree"
          },
          70: {
            title: "Rooney"
          },
          71: {
            title: "Curlos"
          },
          72: {
            title: "Skye"
          },
          73: {
            title: "Moe"
          },
          74: {
            title: "Flora"
          },
          75: {
            title: "Hamlet"
          },
          76: {
            title: "Astrid"
          },
          77: {
            title: "Monty"
          },
          78: {
            title: "Dora"
          },
          79: {
            title: "Biskit"
          },
          80: {
            title: "Victoria"
          },
          81: {
            title: "Lyman"
          },
          82: {
            title: "Violet"
          },
          83: {
            title: "Frank"
          },
          84: {
            title: "Chadder"
          },
          85: {
            title: "Merengue"
          },
          86: {
            title: "Cube"
          },
          87: {
            title: "Claudia"
          },
          88: {
            title: "Curly"
          },
          89: {
            title: "Boomer"
          },
          90: {
            title: "Caroline"
          },
          91: {
            title: "Sparro"
          },
          92: {
            title: "Baabara"
          },
          93: {
            title: "Rolf"
          },
          94: {
            title: "Maple"
          },
          95: {
            title: "Antonio"
          },
          96: {
            title: "Soleil"
          },
          97: {
            title: "Apollo"
          },
          98: {
            title: "Derwin"
          },
          99: {
            title: "Francine"
          },
          100: {
            title: "Chrissy"
          }
        }
      },

      // Animal crossing cards (Series 4)
      animcalcrossingcards_series4: {
        title: "AC Cards - Series 4",
        weight: 2,
        collection: {
          1: {
            title: "Isabelle"
          },
          2: {
            title: "Brewster"
          },
          3: {
            title: "Katrina"
          },
          4: {
            title: "Phineas"
          },
          5: {
            title: "Celeste"
          },
          6: {
            title: "Tommy"
          },
          7: {
            title: "Gracie"
          },
          8: {
            title: "Leilani"
          },
          9: {
            title: "Resetti"
          },
          10: {
            title: "Timmy"
          },
          11: {
            title: "Lottie"
          },
          12: {
            title: "Shrunk"
          },
          13: {
            title: "Pave"
          },
          14: {
            title: "Gulliver"
          },
          15: {
            title: "Redd"
          },
          16: {
            title: "Zipper"
          },
          17: {
            title: "Goldie"
          },
          18: {
            title: "Stitches"
          },
          19: {
            title: "Pinky"
          },
          20: {
            title: "Mott"
          },
          21: {
            title: "Mallary"
          },
          22: {
            title: "Rocco"
          },
          23: {
            title: "Katt"
          },
          24: {
            title: "Graham"
          },
          25: {
            title: "Peaches"
          },
          26: {
            title: "Dizzy"
          },
          27: {
            title: "Penelope"
          },
          28: {
            title: "Boone"
          },
          29: {
            title: "Broffina"
          },
          30: {
            title: "Croque"
          },
          31: {
            title: "Pashmina"
          },
          32: {
            title: "Shep"
          },
          33: {
            title: "Lolly"
          },
          34: {
            title: "Erik"
          },
          35: {
            title: "Dotty"
          },
          36: {
            title: "Pierce"
          },
          37: {
            title: "Queenie"
          },
          38: {
            title: "Fang"
          },
          39: {
            title: "Frita"
          },
          40: {
            title: "Tex"
          },
          41: {
            title: "Melba"
          },
          42: {
            title: "Bones"
          },
          43: {
            title: "Anabelle"
          },
          44: {
            title: "Rudy"
          },
          45: {
            title: "Naomi"
          },
          46: {
            title: "Peewee"
          },
          47: {
            title: "Tammy"
          },
          48: {
            title: "Olaf"
          },
          49: {
            title: "Lucy"
          },
          50: {
            title: "Elmer"
          },
          51: {
            title: "Puddles"
          },
          52: {
            title: "Rory"
          },
          53: {
            title: "Elise"
          },
          54: {
            title: "Walt"
          },
          55: {
            title: "Mira"
          },
          56: {
            title: "Pietro"
          },
          57: {
            title: "Aurora"
          },
          58: {
            title: "Papi"
          },
          59: {
            title: "Apple"
          },
          60: {
            title: "Rod"
          },
          61: {
            title: "Purrl"
          },
          62: {
            title: "Static"
          },
          63: {
            title: "Celia"
          },
          64: {
            title: "Zucker"
          },
          65: {
            title: "Peggy"
          },
          66: {
            title: "Ribbot"
          },
          67: {
            title: "Annalise"
          },
          68: {
            title: "Chow"
          },
          69: {
            title: "Sylvia"
          },
          70: {
            title: "Jacques"
          },
          71: {
            title: "Sally"
          },
          72: {
            title: "Doc"
          },
          73: {
            title: "Pompom"
          },
          74: {
            title: "Tank"
          },
          75: {
            title: "Becky"
          },
          76: {
            title: "Rizzo"
          },
          77: {
            title: "Sydney"
          },
          78: {
            title: "Barold"
          },
          79: {
            title: "Nibbles"
          },
          80: {
            title: "Kevin"
          },
          81: {
            title: "Gloria"
          },
          82: {
            title: "Lobo"
          },
          83: {
            title: "Hippeux"
          },
          84: {
            title: "Margie"
          },
          85: {
            title: "Lucky"
          },
          86: {
            title: "Rosie"
          },
          87: {
            title: "Rowan"
          },
          88: {
            title: "Maelle"
          },
          89: {
            title: "Bruce"
          },
          90: {
            title: "O'Hare"
          },
          91: {
            title: "Gayle"
          },
          92: {
            title: "Cranston"
          },
          93: {
            title: "Frobert"
          },
          94: {
            title: "Grizzly"
          },
          95: {
            title: "Cally"
          },
          96: {
            title: "Simon"
          },
          97: {
            title: "Iggly"
          },
          98: {
            title: "Angus"
          },
          99: {
            title: "Twiggy"
          },
          100: {
            title: "Robin"
          }
        }
      },

      // Animal crossing cards (Welcome Amiibo)
      animcalcrossingcards_welcome1: {
        title: "AC Cards - Welcome Amiibo",
        weight: 2,
        collection: {
          1: {
            title: "Vivian"
          },
          2: {
            title: "Hopkins"
          },
          3: {
            title: "June"
          },
          4: {
            title: "Piper"
          },
          5: {
            title: "Paolo"
          },
          6: {
            title: "Hornsby"
          },
          7: {
            title: "Stella"
          },
          8: {
            title: "Tybalt"
          },
          9: {
            title: "Huck"
          },
          10: {
            title: "Sylvana"
          },
          11: {
            title: "Boris"
          },
          12: {
            title: "Wade"
          },
          13: {
            title: "Carrie"
          },
          14: {
            title: "Ketchup"
          },
          15: {
            title: "Rex"
          },
          16: {
            title: "Stu"
          },
          17: {
            title: "Ursala"
          },
          18: {
            title: "Jacob"
          },
          19: {
            title: "Maddie"
          },
          20: {
            title: "Billy"
          },
          21: {
            title: "Boyd"
          },
          22: {
            title: "Bitty"
          },
          23: {
            title: "Maggie"
          },
          24: {
            title: "Murphy"
          },
          25: {
            title: "Plucky"
          },
          26: {
            title: "Sandy"
          },
          27: {
            title: "Claude"
          },
          28: {
            title: "Raddle"
          },
          29: {
            title: "Julia"
          },
          30: {
            title: "Louie"
          },
          31: {
            title: "Bea"
          },
          32: {
            title: "Admiral"
          },
          33: {
            title: "Ellie"
          },
          34: {
            title: "Boots"
          },
          35: {
            title: "Weber"
          },
          36: {
            title: "Candi"
          },
          37: {
            title: "Leopold"
          },
          38: {
            title: "Spike"
          },
          39: {
            title: "Cashmere"
          },
          40: {
            title: "Tad"
          },
          41: {
            title: "Norma"
          },
          42: {
            title: "Gonzo"
          },
          43: {
            title: "Sprocket"
          },
          44: {
            title: "Snooty"
          },
          45: {
            title: "Olive"
          },
          46: {
            title: "Dobie"
          },
          47: {
            title: "Buzz"
          },
          48: {
            title: "Cleo"
          },
          49: {
            title: "Ike"
          },
          50: {
            title: "Tasha"
          }
        }
      },

      // Animal crossing cards (Hello Kitty)
      animcalcrossingcards_hellotkitty: {
        title: "AC Cards - Hello Kitty",
        weight: 2,
        collection: {
          1: {
            title: "Rilla"
          },
          2: {
            title: "Marty"
          },
          3: {
            title: "Etoile"
          },
          4: {
            title: "Chai"
          },
          5: {
            title: "Chelsea"
          },
          6: {
            title: "Toby"
          }
        }
      },

      // Animal crossing
      animalcrossing: {
        title: "Animal Crossing",
        weight: 0,
        collection: {
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
          isabellesummeroutfit: {
            title: "Isabelle (summer outfit)"
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

      // Amiibo bundles
      bundles: {
        title: "Amiibo Bundles",
        weight: 1,
        collection: {
          animalcrossing: {
            title: "Animal Crossing: Amiibo Festival"
          },
          captaintoad: {
            title: "Captain Toad: Treasure Tracker"
          },
          chibirobo: {
            title: "Chibi-Robo! Zip Lash"
          },
          goldmegaman: {
            title: "Mega Man: Legacy Collection"
          },
          mariopartybowser: {
            title: "Mario Party 10 (Bowser)"
          },
          mariopartymario: {
            title: "Mario Party 10 (Mario)"
          },
          mariopartypeach: {
            title: "Mario Party 10 (Peach)"
          },
          twilightprincess: {
            title: "Zelda: Twilight Princess HD"
          },
          yoshipoochy: {
            title: "Yoshi & Poochy's Wooly World"
          },
          yoshiswollyworldblue: {
            title: "Yoshi's Wolly World (Blue)"
          },
          yoshiswollyworldgreen: {
            title: "Yoshi's Wolly World (Green)"
          },
          yoshiswollyworldpink: {
            title: "Yoshi's Wolly World (Pink)"
          }
        }
      },

      // Chibi robo
      chibi: {
        title: "Chibi Robo",
        weight: 0,
        collection: {
          robo: {
            title: "Chibi Robo"
          }
        }
      },

      // Fire emblem
      fireemblem: {
        title: "Fire Emblem",
        weight: 0,
        collection: {
          alm: {
            title: "Alm"
          },
          celica: {
            title: "Celica"
          },
          chrome: {
            title: "Chrome"
          },
          tiki: {
            title: "Tiki"
          }
        }
      },

      // Kirby
      kirby: {
        title: "Kirby",
        weight: 0,
        collection: {
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
        weight: 0,
        collection: {
          anniversarylink: {
            title: "Link - 30th Anniversary"
          },
          guardian: {
            title: "Guardian"
          },
          linkarcher: {
            title: "Link - Archer"
          },
          linkmajorasmask: {
            title: "Link - Majora's Mask"
          },
          linkrider: {
            title: "Link - Rider"
          },
          linkskywardsword: {
            title: "Link - Skyward Sword"
          },
          linktwilightprincess: {
            title: "Link - Twilight Princess"
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
          },
          daruk: {
            title: "Daruk"
          },
          mipha: {
            title: "Mipha"
          },
          revali: {
            title: "Revali"
          },
          urbosa: {
            title: "Urbosa"
          },
        }
      },

      // Mega man
      megaman: {
        title: "Mega Man - Legacy Collection",
        weight: 0,
        collection: {
          gold: {
            title: "Mega Man - Gold Edition"
          }
        }
      },

      // Metroid series
      metroid: {
        title: "Metroid",
        weight: 0,
        collection: {
          metroid: {
            title: "Metroid"
          },
          samusaran: {
            title: "Samus Aran"
          }
        }
      },

      // Monster hunter
      monsterhunter: {
        title: "Monster Hunter",
        weight: 0,
        collection: {
          beriorosuaiola: {
            title: "Beriorosu & Avuria"
          },
          kurupekkodan: {
            title: "Kurupekko & Dan Seniors"
          },
          navirou: {
            title: "Nabiru"
          },
          rioreiacheval: {
            title: "Rioreia & Cheval"
          },
          rioreusuriderboy: {
            title: "Sekigan of Rioreusu & Rider Boy"
          },
          rioreusuridergirl: {
            title: "Sekigan of Rioreusu & Rider Boy"
          }
        }
      },
      
      // Pikmin
      pikmin: {
        title: "Pikmin",
        weight: 0,
        collection: {
          pikmin: {
            title: "Pikmin"
          }
        }
      },

      // Shovel knight
      shovelknight: {
        title: "Shovel Knight",
        weight: 0,
        collection: {
          kingknight: {
            title: "King Knight"
          },
          plagueknight: {
            title: "Plague Knight"
          },
          shovelknight: {
            title: "Shovel Knight"
          },
          specterknight: {
            title: "Specter Knight"
          }
        }
      },

      // Skylanders
      skylanders: {
        title: "Skylanders Superchargers",
        weight: 0,
        collection: {
          hammerslambowser: {
            title: "Hammer Slam Bowser"
          },
          darkhammerslambowser: {
            title: "Dark Hammer Slam Bowser"
          },
          superchargeddonkeykong: {
            title: "Super Charged Donkey Kong"
          },
          darksuperchargeddonkeykong: {
            title: "Dark Super Charged Donkey Kong"
          }
        }
      },

      // Splatoon
      splatoon: {
        title: "Splatoon",
        weight: 0,
        collection: {
          callie: {
            title: "Callie"
          },
          inklingboy1: {
            title: "Inkling Boy"
          },
          inklingboy2: {
            title: "Inkling Boy"
          },
          inklingboy3: {
            title: "Inkling Boy"
          },
          inklinggirl1: {
            title: "Inkling Girl"
          },
          inklinggirl2: {
            title: "Inkling Girl"
          },
          inklinggirl3: {
            title: "Inkling Girl"
          },
          inklingsquidgreen: {
            title: "Inkling Squid"
          },
          inklingsquidorange: {
            title: "Inkling Squid"
          },
          inklingsquidpurple: {
            title: "Inkling Squid"
          },
          marie: {
            title: "Marie"
          }
        }
      },

      // Super smash brothers
      ssb: {
        title: "Super Smash Brothers",
        weight: 0,
        collection: {
          bayonetta: {
            title: "Bayonetta"
          },
          bayonettaplayer2: {
            title: "Bayonetta Player 2"
          },
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
          cloud: {
            title: "Cloud"
          },
          cloudplayer2: {
            title: "Cloud Player 2"
          },
          corrin: {
            title: "Corrin"
          },
          corrinplayer2: {
            title: "Corrin Player 2"
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
            title: "Famicom R.O.B."
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
            title: "R.O.B."
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
        weight: 0,
        collection: {
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
          goomba: {
            title: "Goomba"
          },
          koopatroopa: {
            title: "Koopa Troopa"
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
        weight: 0,
        collection: {
          classiccolor: {
            title: "30th Anniversary Mario - Classic Color"
          },
          moderncolor: {
            title: "30th Anniversary Mario - Modern Color"
          }
        }
      },
      
      // Super Mario Odyssey
      smo: {
        title: "Super Mario Odyssey",
        weight: 0,
        collection: {
          bowserwedding: {
            title: "Bowser (Wedding Outfit)"
          },
          mariowedding: {
            title: "Mario (Wedding Outfit)"
          },
          peachwedding: {
            title: "Peach (Wedding Outfit)"
          }
        }
      },

      // Yoshi
      yoshi: {
        title: "Yoshi",
        weight: 0,
        collection: {
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

    // Copy of collection initialization object as a sortable array
    collection_sorted: null,

    // Generalized app settings object
    app_settings: {
      name: 'Amiibo Collector'
    },

    // Collection settings initialization object
    collection_settings: {
      sort_by: 'numeric-asc',
      last_sort_by: 'numeric-asc',
      sort_group_id: ''
    },

    // Local Storage configuration
    storage_settings: {
      id: "amiibo-collection",
      dont_use_local: false,
      is_local: window.localStorage ? true : false,
      loaded: false,
      asset_path: 'app/assets/images/collection/'
    },

    // Placeholder for collection configuration file
    collection_configuration_file: null,

    // Placeholder for collection stats file
    collection_stats_file: null,


    /**
     * Initialize the application.
     */
    initialize: function() {

      // Bind methods
      _.bindAll(this,
        'lazyLoadCollectionImages',
        'storageDiffUpdate',
        'loadCollection',

        // @todo - Possibly refactor stats menu into own view
        'toggleStatsMenu',

        // @todo - Possibly refactor group menu into own view
        'toggleGroupMenu',
        'groupMenuToggleGroupOpenClosed',
        'groupMenuToggleAllCollected',
        'groupMenuToggleGroupOnOff',
        'groupMenuJumpToGroup',

        // @todo - Possibly refactor sort menu into own view
        'toggleSortMenu',
        'handleSort',
        'sortAlphaAsc',
        'sortAlphaDesc',
        'sortTotalAsc',
        'sortTotalDesc',
        'sortNumericAsc',
        'sortNumericDesc',

        // @todo - Refactor tools menu into own view
        'toggleToolsMenu',
        'generateJSONConfig',
        'uploadJSONConfig',
        'handleCollectionRestart',

        // @todo - Possibly refactor group controls into own view
        'groupToggleOpenClosed',
        'groupToggleCollected',
        'groupToggleOnOff',
        'groupToggleMoreMenuOpenClosed',
        'groupHandleSort',

        // @todo - Possibly refactor collection items into own view
        'toggleSelectedItem',
        'toggleItemSettingsMenu',
        'itemSettingsAddSubitem',
        'itemSettingsUpSubitem',
        'itemSettingsFavoriteSubitem',
        'itemSettingsRemoveSubitem',
        'itemSettingsSubitemStatusUpdate',
        'itemSettingsSubitemConditionUpdate',
        'itemSettingsSubitemNoteToggle',

        // @todo - Refactor below global events into own file or view
        'scrollViewportBackToTop'
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
        },
        onScroll: function(elm) {
          if ($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {
            $('.back-to-top').removeClass('stuck');
          } else if ($(elm).hasClass('stuck')) {
            $('.back-to-top').addClass('stuck');
          } else if (!$(elm).hasClass('stuck')) {
            $('.back-to-top').removeClass('stuck');
          }
        }
      });

      // Capture the scroll position when a modal opens so it can be restored when modals are closed
      $(document).on('opening', '.remodal', function () {
        $(this).data('last-scroll-pos', $(window).scrollTop());
      });
      $(document).on('closing', '.remodal', function () {
        $(window).scrollTop($(this).data('last-scroll-pos'));
      });

      // Trigger not supported message if user browser doesn't support localStorage
      if (!this.storage_settings.is_local) {
        var modal = $(this.templates.messageBrowserCompat({
          app_name: this.app_settings.name
        })).remodal();
        this.$el.append(modal);
        modal.open();
      }

      // Load the collection
      this.loadCollection();
    },


    /**
     * Initialize lazy loading of grid item images
     */
    lazyLoadCollectionImages: function() {
      $('.collection-group-item img[src=""]').show().lazyload({
        effect: "fadeIn",
        load: function() {
          $(this).prev('.fa-spinner').remove();
        }
      });
    },


    /**
     * Tests for differences in the collection initialization object and the local storage object, making changes where
     * applicable to the local storage object.
     */
    storageDiffUpdate: function() {
      var
        initObj         = this.collection,
        localObj        = JSON.parse(window.localStorage.getItem(this.storage_settings.id));

      // Add new groups to local object
      _.each(_.keys(initObj), function(v) {

        // Add new groups
        if (!(v in localObj)) {
          localObj[v] = initObj[v];
        }

        // Add new group property to the group
        _.each(_.keys(v), function(g) {
          if (!(g in localObj[v])) {
            localObj[v][g] = initObj[v][g];
          }
        });

        // Add collection item to the group
        _.each(initObj[v].collection, function(item, key) {
          if (!(key in localObj[v].collection)) {
            localObj[v].collection[key] = initObj[v].collection[key];
          }
        });
      });

      // Remove groups to local object
      _.each(_.keys(localObj), function(l) {

        // Remove old group
        if (!(l in initObj)) {
          delete localObj[l];
        } else {

          // Remove any old group properties
          _.each(_.keys(l), function(g) {
            if (!(g in initObj[l])) {
              delete localObj[l][g];
            }
          });

          // Remove any old collection items from group
          _.each(localObj[l].collection, function(item, key) {
            if (!(key in initObj[l].collection)) {
              delete localObj[l].collection[key];
            }
          });
        }
      });

      // Update simple properties like 'title' or 'weight' that may have changed
      _.each(initObj, function(vObj, key) {

        // Update a changed 'title'
        if (vObj.title !== localObj[key].title) {
          localObj[key].title = vObj.title;
        }

        // Update a changed 'weight'
        if (vObj.weight !== localObj[key].weight) {
          localObj[key].weight = vObj.weight;
        }

        // Iterate over the collection object checking simple properties like 'title' for changes
        _.each(initObj[key].collection, function(cObj, id) {
          if (localObj[key].collection[id].title != cObj.title) {
            localObj[key].collection[id].title = initObj[key].collection[id].title;
          }
        });
      });

      // Update the local storage object
      window.localStorage.setItem(this.storage_settings.id, JSON.stringify(localObj));
    },


    /**
     * Load and built the collection.
     */
    loadCollection: function() {
      var
        self        = this,
        path        = this.storage_settings.asset_path,
        grid        = $('.grid-container');

      // Remove the "collection loading" indicator
      $('.collection-loading-message').remove();

      // Test to see if we should load from local storage
      if (this.storage_settings.is_local && !this.storage_settings.dont_use_local && !this.loaded) {

        // Indicate local storage has been loaded
        this.loaded = true;

        // Proceed to load collection object when it exists
        if (window.localStorage.getItem(this.storage_settings.id)) {
          this.storageDiffUpdate();
          this.collection = JSON.parse(window.localStorage.getItem(this.storage_settings.id));
        }

        // Load the collection settings object when it exists otherwise set it
        if (window.localStorage.getItem(this.storage_settings.id + '_settings')) {
          this.collection_settings = JSON.parse(window.localStorage.getItem(this.storage_settings.id + '_settings'));
        } else {
          window.localStorage.setItem(this.storage_settings.id + '_settings', JSON.stringify(this.collection_settings));
        }
      }

      // Convert collection to sortable array while populating meta properties
      // this.collection_sorted = this.collection_sorted || _.map(JSON.parse(JSON.stringify(this.collection)), function(group, group_id) {
      this.collection_sorted = _.map(JSON.parse(JSON.stringify(this.collection)), function(group, group_id) {
        group.id = group_id;
        group.size = _.size(group.collection);
        group.collection = _.map(group.collection, function(item, item_id) {
          item.id = item_id;
          return item;
        });
        return group;
      });

      // Sort groups based on collection settings
      switch (this.collection_settings.sort_by) {
        case 'alpha-asc' :
          this.collection_sorted = this.sortAlphaAsc(this.collection_sorted, this.collection_settings.sort_group_id);
          break;
        case 'alpha-desc' :
          this.collection_sorted = this.sortAlphaDesc(this.collection_sorted, this.collection_settings.sort_group_id);
          break;
        case 'total-asc' :
          this.collection_sorted = this.sortTotalAsc(this.collection_sorted);
          break;
        case 'total-desc' :
          this.collection_sorted = this.sortTotalDesc(this.collection_sorted);
          break;
        case 'numeric-asc' :
          this.collection_sorted = this.sortNumericAsc(this.collection_sorted, this.collection_settings.sort_group_id);
          break;
        case 'numeric-desc' :
          this.collection_sorted = this.sortNumericDesc(this.collection_sorted, this.collection_settings.sort_group_id);
          break;
      }

      // Iterate over collection
      _.each(this.collection_sorted, function(group, idx) {
        var
          group_id          = group.id,
          grid_group        = self.templates.collectionGroup({
            group_name: group_id,
            group_title: group.title,
            group_collected: _.filter(group.collection, 'collected').length,
            group_total: _.size(group.collection)
          }),
          group_elm         = $('.collection-group[data-group-name="' + group_id + '"]');

        // Add group if it doesn't already exist
        if (!group_elm.length) {
          grid.append(grid_group);
          group_elm = $('.collection-group[data-group-name="' + group_id + '"]');
        }

        // Otherwise swap element
        else if (!self.collection_settings.sort_group_id) {
          group_elm.parent().after($('.collection-group-container').eq(idx).replaceWith(group_elm.parent()));
        }

        // Iterate over a groups items
        _.each(group.collection, function(item, iidx) {
          var
            item_id             = item.id,
            item_path         = path + group_id + '-' + item_id + '.png',
            item_elm        = group_elm.find('[data-item-id="' + item.id + '"]');

          // Create new grid object
          if (!item_elm.length) {
            grid.find('.' + group_id + ' .group').append(self.templates.collectionGroupItem({
              item_id: item_id,
              item_path: item_path,
              item_title: item.title || '',
              item_class: ((item.collected) ? 'collected' : '')
            }));
          }

          // Otherwise swap group item positions if you're doing a group sort
          else if (!group.unchecked) {
            if (
              (group.id == self.collection_settings.sort_group_id) ||
              (self.collection_settings.sort_by != self.collection_settings.last_sort_by && !self.collection_settings.sort_group_id)
            ) {
              item_elm.after(group_elm.find('.collection-group-item').eq(iidx).replaceWith(item_elm));
            }
          }
        });

        // Is the group set to display or not?
        if (group.unchecked) group_elm.addClass('group-off');

        // Add appropriate class on group to indicate whether or not a group has been collected
        if (group.size == _.filter(group.collection, 'collected').length) {
          group_elm
            .data('group-collected', 'yes')
            .addClass('group-collected');
        } else {
          group_elm
            .data('group-collected', 'no')
            .removeClass('group-collected');
        }

        // Toggle show/hide the group based on its user setting
        if (group.closed) {
          group_elm.addClass('group-closed');
        } else {
          group_elm.removeClass('group-closed');
        }
      });

      // Update the last sorted by flag
      this.collection_settings.last_sort_by = this.collection_settings.sort_by;

      // Reset any group sort id to blank
      this.collection_settings.sort_group_id = '';

      // Initialize lazy loading of collection images
      this.lazyLoadCollectionImages();
    },






    //
    // !!!!!!!
    // @todo - Possibly refactor the Stats Menu into its own view
    // !!!!!!!
    //

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
      _.each(this.collection_sorted, function(group) {
        var live_group = self.collection[group.id];
        if (!live_group.unchecked) {
          stats[group.id] = {
            total: _.size(live_group.collection),
            owned: _.size(_.filter(live_group.collection, function(item) {
              return item.collected;
            }))
          };

          // Update overall totals
          stats.total += stats[group.id].total;
          stats.owned += stats[group.id].owned;

          // Determine percentage
          var group_perc = ((stats[group.id].owned / stats[group.id].total) * 100).toFixed(2);

          // Add a stat group to the container
          stats_container.append(self.templates.menuStatsGroup({
            group_id: group.id,
            group_title: group.title,
            group_total: stats[group.id].total,
            group_owned: stats[group.id].owned,
            group_perc: group_perc
          }));

          // Add the completed class if a group is completed
          if (group_perc >= 100) {
            $('[data-group-id="' + group.id + '"]').addClass('complete');
          }
        }
      });

      // Determine overall percentage
      var overall_perc = ((stats.owned / stats.total) * 100).toFixed(2);

      // Add the overall stat
      stats_container.prepend(self.templates.menuStatsGroup({
        group_id: 'collection-total',
        group_title: "Total",
        group_total: stats.total,
        group_owned: stats.owned,
        group_perc: overall_perc
      }));

      // Add the completed class if all groups are completed
      if (overall_perc >= 100) {
        $('[data-group-id="collection-total"]').addClass('complete');
      }

      // Toggle menu open/closed
      this.menus.stats.open();
    },





    //
    // !!!!!!!
    // @todo - Possibly refactor the Group Menu into its own view
    // !!!!!!!
    //

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

      // Re-add the group controls each time the menu is opened
      groups_container.children().remove();
      _.each(this.collection_sorted, function(group) {

        // Add the group controls
        groups_container.append(self.templates.menuGroupGroup({
          group_id: group.id,
          group_title: group.title,
          group_closed: self.collection[group.id].closed ? '' : 'toggle-group-expando-active',
          group_collected: (group.size == _.filter(self.collection[group.id].collection, 'collected').length) ? 'toggle-all-collected-active' : '',
          group_active: self.collection[group.id].unchecked ? '' : 'toggle-on-off-active'
        }));
      });

      // Open the menu
      this.menus.group.open();
    },


    /**
     * Toggles groups open or closed through the "Groups" menu.
     */
    groupMenuToggleGroupOpenClosed: function(e) {
      var
        target        = $(e.currentTarget),
        group         = target.closest('.group-group'),
        target_id     = target.data('id'),
        target_group  = $('.collection-group[data-group-name="' + target_id + '"]');

      // Toggle group class in menu
      group.toggleClass('toggle-group-expando-active');

      // Click on the right control based on state
      if (group.hasClass('toggle-group-expando-active')) {
        target_group.find('.group-expando-toggle.toggle-opened').click();
      } else {
        target_group.find('.group-expando-toggle.toggle-closed').click();
      }
    },


    /**
     * Toggles groups has having all of their items collected or not.
     */
    groupMenuToggleAllCollected: function(e) {
      var
        target        = $(e.currentTarget),
        group         = target.closest('.group-group'),
        target_id     = target.data('id'),
        target_group  = $('.collection-group[data-group-name="' + target_id + '"]');

      // Toggle group class in menu
      group.toggleClass('toggle-all-collected-active');

      // Click on right control based on state
      if (group.hasClass('toggle-all-collected-active')) {
        target_group.find('.group-select-toggle.toggle-collected').click();
      } else {
        target_group.find('.group-select-toggle.toggle-uncollected').click();
      }
    },


    /**
     * Toggles a collection group on or off (whether or not it is to be displayed in the collection listing).
     */
    groupMenuToggleGroupOnOff: function(e) {
      var
        target        = $(e.currentTarget),
        group         = target.closest('.group-group'),
        target_id      = target.data('id'),
        target_group  = $('.collection-group[data-group-name="' + target_id + '"]');

      // Toggle active class on group
      group.toggleClass('toggle-on-off-active');

      // Click on right control based on state
      if (group.hasClass('toggle-on-off-active')) {
        target_group.find('.group-toggle-on-off.toggle-on').click();
      } else {
        target_group.find('.group-toggle-on-off.toggle-off').click();
      }
    },


    /**
     * Simply closes the menu and jumps to a group (reactivates the group if its off).
     */
    groupMenuJumpToGroup: function(e) {
      var
        target        = $(e.currentTarget),
        group         = target.closest('.group-group'),
        target_id      = target.data('id'),
        target_group  = $('.collection-group[data-group-name="' + target_id + '"]');

      // Prevent default event
      e.preventDefault();

      // Proceed if the group is turned on (not deactivated)
      if (!target_group.hasClass('group-off')) {

        // Close the menu
        this.menus.group.close();

        // Jump to in page link
        window.location.href = '#' + target_id;
      }
    },






    //
    // !!!!!!!
    // @todo - Possibly refactor the Sort Menu into it's own view. That said the sort methods are fairly well
    // integrated into the loading of the collection so perhaps not.
    // !!!!!!!
    //

    /**
     * Toggle and load the sort menu
     */
    toggleSortMenu: function() {
      if (!this.menus.sort) {
        this.menus.sort = $(this.templates.menuSort()).remodal();
        this.$el.append(this.menus.sort);
      }

      // Toggle menu open/closed
      if (this.menus.sort) this.menus.sort.open();
    },


    /**
     * Event handler attached to sort controls reloads collection listings.
     */
    handleSort: function(e) {
      var
        target        = $(e.currentTarget),
        sort_by       = target.attr('data-control-id').replace('sort-', '');

      // Update collection settings object
      this.collection_settings.sort_by = sort_by;
      window.localStorage.setItem(this.storage_settings.id + '_settings', JSON.stringify(this.collection_settings));

      // Reload the collection & close the menu
      this.loadCollection();
      this.menus.sort.close();
    },


    /**
     * Sort groups alpha ascending.
     */
    sortAlphaAsc: function( collection, group_id ) {
      var
        sorted_collection       = null;

      // Sort the collection by criteria
      if (!group_id) {
        sorted_collection = _.map(_.sortBy(collection, 'title'), function(group) {
          group.collection = _.sortBy(group.collection, 'title');
          return group;
        });
      } else {
        sorted_collection = _.filter(collection, function(group) {
          if (group.id == group_id) {
            group.collection = _.sortBy(group.collection, 'title');
          }
          return true;
        });
      }

      // Sort collection into 'weight' groups object
      var weighted_collection = _.groupBy(sorted_collection, function(w_group) {
        if (!w_group.weight) w_group.weight = 0;
        return w_group.weight;
      });

      // Return the collection after flattening back into array
      return _.flatten(_.toArray(weighted_collection));
    },


    /**
     * Sort groups alpha descending.
     */
    sortAlphaDesc: function( collection, group_id ) {
      var
        sorted_collection       = null;

      // Sort the collection by criteria
      if (!group_id) {
        sorted_collection = _.map(_.sortBy(collection, 'title').reverse(), function(group) {
          group.collection = _.sortBy(group.collection, 'title').reverse();
          return group;
        });
      } else {
        sorted_collection = _.filter(collection, function(group) {
          if (group.id == group_id) {
            group.collection = _.sortBy(group.collection, 'title').reverse();
          }
          return true;
        });
      }

      // Sort collection into 'weight' groups object
      var weighted_collection = _.groupBy(sorted_collection, function(w_group) {
        if (!w_group.weight) w_group.weight = 0;
        return w_group.weight;
      });

      // Return the collection after flattening back into array
      return _.flatten(_.toArray(weighted_collection));
    },


    /**
     * Sort by total number ascending.
     */
    sortTotalAsc: function( collection ) {

      // Sort the collection by criteria
      var sorted_collection = _.sortBy(collection, 'size');

      // Sort collection into 'weight' groups object
      var weighted_collection = _.groupBy(sorted_collection, function(w_group) {
        if (!w_group.weight) w_group.weight = 0;
        return w_group.weight;
      });

      // Return the collection after flattening back into array
      return _.flatten(_.toArray(weighted_collection));
    },


    /**
     * Sort by total number descending.
     */
    sortTotalDesc: function( collection ) {

      // Sort the collection by criteria
      var sorted_collection = _.sortBy(collection, 'size').reverse();

      // Sort collection into 'weight' groups object
      var weighted_collection = _.groupBy(sorted_collection, function(w_group) {
        if (!w_group.weight) w_group.weight = 0;
        return w_group.weight;
      });

      // Return the collection after flattening back into array
      return _.flatten(_.toArray(weighted_collection));
    },


    /**
     * Sort groups by numeric value of keys
     */
    sortNumericAsc: function( collection, group_id ) {
      var
        sorted_collection       = null;

      // Sort the collection by criteria
      if (!group_id) {
        sorted_collection = _.map(_.sortBy(collection, function(group) { return parseInt(group.id)}), function(group) {
          group.collection = _.sortBy(group.collection, function(item) {
            return parseInt(item.id);
          });
          return group;
        });
      } else {
        sorted_collection = _.filter(collection, function(group) {
          if (group.id == group_id) {
            group.collection = _.sortBy(group.collection, function(item) {
              return parseInt(item.id);
            });
          }
          return true;
        });
      }

      // Sort collection into 'weight' groups object
      var weighted_collection = _.groupBy(sorted_collection, function(w_group) {
        if (!w_group.weight) w_group.weight = 0;
        return w_group.weight;
      });

      // Return the collection after flattening back into array
      return _.flatten(_.toArray(weighted_collection));
    },


    /**
     * Sort groups by numeric value of keys
     */
    sortNumericDesc: function( collection, group_id ) {
      var
        sorted_collection       = null;

      // Sort the collection by criteria
      if (!group_id) {
        sorted_collection = _.map(_.sortBy(collection, function(group) { return parseInt(group.id)}).reverse(), function(group) {
          group.collection = _.sortBy(group.collection, function(item) {
            return parseInt(item.id);
          });
          return group;
        });
      } else {
        sorted_collection = _.filter(collection, function(group) {
          if (group.id == group_id) {
            group.collection = _.sortBy(group.collection, function(item) {
              return parseInt(item.id);
            }).reverse();
          }
          return true;
        });
      }

      // Sort collection into 'weight' groups object
      var weighted_collection = _.groupBy(sorted_collection, function(w_group) {
        if (!w_group.weight) w_group.weight = 0;
        return w_group.weight;
      });

      // Return the collection after flattening back into array
      return _.flatten(_.toArray(weighted_collection));
    },





    //
    // !!!!!!!
    // @todo - Refactor tools menu into own view
    // !!!!!!!
    //

    /**
     * Toggle and load the tools menu
     */
    toggleToolsMenu: function() {

      // Add the modal menu
      if (!this.menus.tools) {
        this.menus.tools = $(this.templates.menuTools()).remodal();
        this.$el.append(this.menus.tools);
      }

      // Reset configuration generation
      var generate_json_config_container = $('.control-generate-json-config');
      generate_json_config_container.find('.message').show();
      generate_json_config_container.find('.download').hide();

      // Toggle menu open
      this.menus.tools.open();
    },


    /**
     * Generates a JSON configuration file of a user's collection.
     */
    generateJSONConfig: function() {
      var
        container     = $('.control-generate-json-config'),
        json          = JSON.stringify(this.collection),
        file          = new Blob([json], {type: "text/plain"});

      // Revoke previously generated files to prevent memory leaks
      if (this.collection_configuration_file !== null) {
        window.URL.revokeObjectURL(this.collection_configuration_file);
      }

      // Create new collection configuration file
      this.collection_configuration_file = window.URL.createObjectURL(file);

      // Hide info message show download message
      container.find('.message').hide();
      container.find('.download').show().find('a').attr('href', this.collection_configuration_file).click();
    },


    /**
     * Handles the uploading and parsing of a user's configuration file.
     */
    uploadJSONConfig: function() {
      var
        self        = this,
        input       = $('.collection-configuration-input');

      // Trigger input click
      input.click();

      // Attach handling event once
      if (!input.data('event-attached')) {
        input.data('event-attached', true);
        input.change(function (e){
          var
            reader      = new FileReader(),
            input_elm   = input.get(0),
            text_file   = null;

          // Proceed when file selected
          if (input_elm.files.length) {
            text_file = input_elm.files[0];
            reader.readAsText(text_file);

            // Attach handler to process file
            $(reader).on('load', function(e) {
              var
                file        = e.target.result,
                config      = null;

              // Proceed if file exists
              if (file && file.length) {
                config = JSON.parse(file);

                // Load the new configuration file
                self.collection = config;
                if (self.storage_settings.is_local && !self.storage_settings.dont_use_local) {
                  window.localStorage.setItem(self.storage_settings.id, JSON.stringify(self.collection));
                }
                self.menus.tools.close();
                window.location.href = '/';
              }
            });
          }
        });
      }
    },

    /**
     * Handle restarting/resetting the collection to its default state.
     */
    handleCollectionRestart: function() {
      window.localStorage.removeItem(this.storage_settings.id);
      window.localStorage.removeItem(this.storage_settings.id + '_settings');
      this.menus.tools.close();
      window.location.href = '/';
    },





    //
    // !!!!!!!
    // @todo - Possibly refactor below into own view
    // !!!!!!!
    //


    /**
     * Toggles a group open and closed.
     */
    groupToggleOpenClosed: function(e) {
      var
        target        = $(e.currentTarget),
        parent        = target.closest('.collection-group'),
        group_name    = parent.attr('data-group-name'),
        group         = parent.find('.group');

      // Stop click propagation from h2's events
      e.stopPropagation();

      // Add indicator class to target
      parent.toggleClass('group-closed');

      // Switch icon in control and update collection object
      if (parent.hasClass('group-closed')) {
        this.collection[group_name].closed = true;
      } else {
        this.collection[group_name].closed = false;
      }

      // Update local storage
      window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.collection));

      // Reinit lazy load of collection images
      this.lazyLoadCollectionImages();
    },


    /**
     * Allows user to select/deselect an entire group at once.
     */
    groupToggleCollected: function(e) {
      var
        target        = $(e.currentTarget).closest('.collection-group');

      // Stop click propagation from h2's events
      e.stopPropagation();

      // Iterate through groups selecting or unselecting items based on group data flag
      if (target.data('group-collected') == 'no' || !target.data('group-collected')) {
        target
          .addClass('group-collected')
          .find('.collection-group-item')
          .each(function(idx, item) {
            if (!$(item).hasClass('collected')) {
              $(item).click();
            }
          });
        target.data('group-collected', 'yes');
      }
      else if (target.data('group-collected') == 'yes') {
        target
          .removeClass('group-collected')
          .find('.collection-group-item')
          .each(function(idx, item) {
            if ($(item).hasClass('collected')) {
              $(item).click();
            }
          });
        target.data('group-collected', 'no');
      }
    },


    /**
     * Toggles group on/off (whether or not it displays in the collection)
     */
    groupToggleOnOff: function(e) {
      var
        target        = $(e.currentTarget),
        group         = target.closest('.collection-group'),
        group_msg_elm = group.prev('.collection-group-message.collection-group-reactivation-message'),
        group_id      = group.attr('data-group-name');

      // Toggle group on/off class
      group.toggleClass('group-off');

      // Proceed based on group state and display "reactivate" message
      if (group.hasClass('group-off')) {
        group_msg_elm
          .css({opacity: 0})
          .show()
          .animate({opacity: 1}, {duration: 350, complete: function() {
            setTimeout(function() {
              group_msg_elm
                .animate({opacity: 0}, {duration: 350, complete: function() {
                  group_msg_elm.hide();
                }});
            }, 3000);
          }});
      }

      // Update whether the group is selected
      this.collection[group_id].unchecked = group.hasClass('group-off') ? true : false;

      // Save to local storage
      window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.collection));

      // Reinit lazy load of collection images
      this.lazyLoadCollectionImages();
    },


    /**
     * Toggles a group's more menu open/closed.
     */
    groupToggleMoreMenuOpenClosed: function(e) {
      var
        target                  = $(e.currentTarget),
        group                   = target.closest('.collection-group'),
        group_id                = group.attr('data-group-name'),
        control_menu_container  = target.closest('.more-controls');

      // Set state of target menu
      if (!target.data('state')) {
        target.data('state', 'closed');
      } else if (target.data('state') == 'closed') {
        target.data('state', 'open');
      } else if (target.data('state') == 'open') {
        target.data('state', 'closed');
      }

      // Close any other open menus
      $('.collection-group .more-controls').each(function(idx, elm) {
        var other_target = $(elm).closest('.more-controls');
        if (other_target.hasClass('open')) {
          other_target.removeClass('open');
          other_target.find('.group-control').data('state', 'open');
        }
      });

      // Toggle menu open/closed
      if (target.data('state') == 'closed') {
        control_menu_container.addClass('open');
      } else if (target.data('state') == 'open') {
        control_menu_container.removeClass('open');
      }
    },


    /**
     * Handles routing the appropriate sorting for an individual group.
     */
    groupHandleSort: function(e) {
      var
        target                  = $(e.currentTarget),
        group                   = target.closest('.collection-group'),
        more_control            = target.closest('.more-controls').find('.group-more'),
        group_id                = group.attr('data-group-name'),
        sort_by                 = target.closest('.more-controls-control').attr('data-control-id').replace('sort-', '');

      // Sort the group
      this.collection_settings.sort_by = sort_by;
      this.collection_settings.sort_group_id = group_id;
      this.loadCollection();
      more_control.click();
    },






    //
    // !!!!!!!
    // @todo - Refactor below collection item functionality into own view
    // !!!!!!!
    //

    /**
     * Toggle whether or not an item has been collected.
     */
    toggleSelectedItem: function(e) {
      var
        target                  = $(e.currentTarget),
        item_group_container    = target.closest('.collection-group'),
        item_group              = item_group_container.data('group-name'),
        item_id                 = target.data('item-id');

      // Stop propagation so group isn't clicked
      e.stopPropagation();

      // Toggle the UI
      target.toggleClass('collected');

      // Update the collection object
      if (target.hasClass('collected')) {
        this.collection[item_group].collection[item_id].collected = true;
      } else {
        this.collection[item_group].collection[item_id].collected = false;
      }

      // Update the local storage object
      if (this.storage_settings.is_local && !this.storage_settings.dont_use_local) {
        window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.collection));
      }

      // Update the group stats
      target
        .closest('.collection-group')
        .find('.group-stat-collected')
        .html(_.filter(this.collection[item_group].collection, 'collected').length);

      // Add appropriate class on group
      if (_.size(this.collection[item_group].collection) == _.filter(this.collection[item_group].collection, 'collected').length) {
        item_group_container
          .data('group-collected', 'yes')
          .addClass('group-collected');
      } else {
        item_group_container
          .data('group-collected', 'no')
          .removeClass('group-collected');
      }
    },

    /**
     * Opens/initializes the settings modal for a given collection item.
     */
    toggleItemSettingsMenu: function(e) {
      var
        self        = this,
        target      = $(e.currentTarget),
        menu        = null,
        grid_item   = target.closest('.collection-group-item.collected'),
        group_name  = target.closest('.collection-group').attr('data-group-name'),
        item_name   = target.closest('[data-item-id]').attr('data-item-id'),
        item_obj    = this.collection[group_name].collection[item_name],
        open_modal  = true;

      // Open settings menu only for collected items
      if (grid_item.length) {

        // Make sure further events aren't triggered
        e.stopPropagation();

        // Make sure the modal isn't already open
        if (this.menus.item_settings) {
          if (this.menus.item_settings.hasClass('remodal-is-opened')) {
            open_modal = false;
          }
        }

        // Continue if modal not already open
        if (open_modal) {

          // Re-populate the item settings menu
          this.menus.item_settings = $(this.templates.menuItemSettings({
            item_group: group_name,
            item_name: item_name,
            item_title: item_obj.title
          }));
          this.menus.item_settings.data('trigger_source', target);

          // Replace previously opened modal instance
          if (!$('.menu-item-settings').length) {
            this.$el.append(this.menus.item_settings);
          } else {
            $('.menu-item-settings').closest('.remodal-wrapper').replaceWith(this.menus.item_settings);
          }
        }

        // Update the menu reference
        menu = this.menus.item_settings;

        // Remove any previous sub items (for when modal menu is not being opened)
        menu.find('.sub-items-container').children().remove();

        // Add any existing sub items
        if (item_obj.subitems) {
          _.each(item_obj.subitems, function(subitem, idx) {
            var
              this_subitem_elm        = null,
              this_notepad            = null;
            menu.find('.sub-items-container').append((this_subitem_elm = $(self.templates.menuItemSettingsSubitem({
              sub_item_title: item_obj.title,
              sub_item_id: idx
            }))));
            if (subitem.favorite) {
              this_subitem_elm.find('.controls-item-favorite').hide();
              this_subitem_elm.find('.controls-item-favorite-selected').addClass('selected');
            } else {
              this_subitem_elm.find('.controls-item-favorite').show();
              this_subitem_elm.find('.controls-item-favorite-selected').removeClass('selected');
            }
            this_subitem_elm.find('.controls-item-status option[value="' + subitem.status + '"]').prop('selected', true);
            this_subitem_elm.find('.controls-item-condition option[value="' + subitem.condition + '"]').prop('selected', true);
            this_notepad = this_subitem_elm.find('.controls-item-note .notepad');
            this_notepad.html(subitem.note);
          });
        }

        // Modalize the menu if it isn't already open
        if (open_modal) {
          menu.remodal().open();
        }
      }
    },


    /**
     * Adds a new sub-item to an item.
     */
    itemSettingsAddSubitem: function(e) {
      var
        target          = $(e.currentTarget),
        container       = target.closest('.menu-item-settings'),
        items_container = container.find('.sub-items-container'),
        group_name      = container.attr('data-item-group'),
        item_name       = container.attr('data-item-name'),
        sub_item_elm    = null,
        item_obj        = this.collection[group_name].collection[item_name],
        sub_item        = {
          favorite: false,
          note: ''
        };

      // Attempt to access any saved sub items, otherwise create sub item array
      if (!item_obj.subitems) {
        item_obj.subitems = [];
      }

      // Append sub-item element to item's setting page
      sub_item_elm = $(this.templates.menuItemSettingsSubitem({
        sub_item_title: item_obj.title,
        sub_item_id: item_obj.subitems.length
      }));
      items_container.append(sub_item_elm);

      // Add sub item object properties
      sub_item.id = item_obj.subitems.length;
      sub_item.status = sub_item_elm.find('.controls-item-status option:selected').attr('value');
      sub_item.condition = sub_item_elm.find('.controls-item-condition option:selected').attr('value');

      // Add sub item to sub items array
      item_obj.subitems.push(sub_item);

      // Save to local storage
      window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.collection));
    },


    /**
     * Move a sub item up one.
     */
    itemSettingsUpSubitem: function(e) {
      var
        target          = $(e.currentTarget),
        container       = target.closest('.menu-item-settings'),
        group_name      = container.attr('data-item-group'),
        item_name       = container.attr('data-item-name'),
        sub_item_elm    = target.closest('.item'),
        sub_item_id     = parseInt(sub_item_elm.attr('data-sub-item-id')),
        item_obj        = this.collection[group_name].collection[item_name];

      // Shift array element up one position
      if (sub_item_id > 0) {

        // Give the sub item before this sub item's current id
        item_obj.subitems[sub_item_id-1].id = sub_item_id;
        sub_item_elm.prev('.item').attr('data-sub-item-id', sub_item_id);

        // Update this sub item's current id
        item_obj.subitems[sub_item_id].id = sub_item_id-1;
        sub_item_elm.attr('data-sub-item-id', sub_item_id-1);

        // Shift the two items locations in the subitems array
        item_obj.subitems.splice(sub_item_id-1, 0, item_obj.subitems.splice(sub_item_id, 1)[0]);

        // Save to local storage
        window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.collection));

        // Reload
        this.menus.item_settings.data('trigger_source').click();
      }
    },


    /**
     * Make selected sub item a favorite.
     */
    itemSettingsFavoriteSubitem: function(e) {
      var
        target          = $(e.currentTarget),
        container       = target.closest('.menu-item-settings'),
        items_container = container.find('.sub-items-container'),
        group_name      = container.attr('data-item-group'),
        item_name       = container.attr('data-item-name'),
        sub_item_elm    = target.closest('.item'),
        sub_item_id     = parseInt(sub_item_elm.attr('data-sub-item-id')),
        item_obj        = this.collection[group_name].collection[item_name];
      
      // Set the selected
      sub_item_elm.find('.controls-item-favorite').toggle();
      sub_item_elm.find('.controls-item-favorite-selected').toggleClass('selected');

      // Save in local storage
      item_obj.subitems[sub_item_id].favorite = sub_item_elm.find('.controls-item-favorite-selected').hasClass('selected');
      window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.collection));
    },


    /**
     * Removes a collection item's sub-item.
     */
    itemSettingsRemoveSubitem: function(e) {
      var
        target          = $(e.currentTarget),
        container       = target.closest('.menu-item-settings'),
        group_name      = container.attr('data-item-group'),
        item_name       = container.attr('data-item-name'),
        sub_item_elm    = target.closest('.item'),
        sub_item_id     = parseInt(sub_item_elm.attr('data-sub-item-id')),
        item_obj        = this.collection[group_name].collection[item_name];

      // Remove from local storage
      item_obj.subitems = _.without(item_obj.subitems, _.findWhere(item_obj.subitems, {
        id: sub_item_id
      }));
      window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.collection));

      // Remove sub-item element from item's setting page
      sub_item_elm.remove();
    },


    /**
     * Updates a collection item's sub-item's "status".
     */
    itemSettingsSubitemStatusUpdate: function(e) {
      var
        target          = $(e.currentTarget),
        container       = target.closest('.menu-item-settings'),
        group_name      = container.attr('data-item-group'),
        item_name       = container.attr('data-item-name'),
        sub_item_elm    = target.closest('.item'),
        sub_item_id     = sub_item_elm.attr('data-sub-item-id'),
        item_obj        = this.collection[group_name].collection[item_name],
        selected        = target.find('option:selected');

      // Update local storage
      item_obj.subitems[sub_item_id].status = selected.attr("value");
      window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.collection));
    },


    /**
     * Updates a collection item's sub-item's "condition".
     */
    itemSettingsSubitemConditionUpdate: function(e) {
      var
        target          = $(e.currentTarget),
        container       = target.closest('.menu-item-settings'),
        group_name      = container.attr('data-item-group'),
        item_name       = container.attr('data-item-name'),
        sub_item_elm    = target.closest('.item'),
        sub_item_id     = sub_item_elm.attr('data-sub-item-id'),
        item_obj        = this.collection[group_name].collection[item_name],
        selected        = target.find('option:selected');

      // Update local storage
      item_obj.subitems[sub_item_id].condition = selected.attr("value");
      window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.collection));
    },


    /**
     * "Activates" a collection item's sub-item's notepad area by preparing it for a user to write a note.
     */
    itemSettingsSubitemNoteToggle: function(e) {
      var
        target          = $(e.currentTarget),
        container       = target.closest('.menu-item-settings'),
        group_name      = container.attr('data-item-group'),
        item_name       = container.attr('data-item-name'),
        control         = target.closest('.controls-item-note'),
        sub_item_elm    = target.closest('.item'),
        sub_item_id     = sub_item_elm.attr('data-sub-item-id'),
        item_obj        = this.collection[group_name].collection[item_name],
        notepad         = control.find('.notepad'),
        note            = notepad.html().replace('<br>', '');

      // Continue when the active sequence wasn't activated by a click into the notepad
      if (!(notepad.hasClass('active') && target.hasClass('notepad'))) {

        // Add active class
        notepad.toggleClass('active');

        // Update control wording based on active status
        if (notepad.hasClass('active')) {
          control.find('.input-cell .button').html('Save Note');
        } else {
          control.find('.input-cell .button').html('Edit Note');
        }

        // Update local storage
        item_obj.subitems[sub_item_id].note = note;
        window.localStorage.setItem(this.storage_settings.id, JSON.stringify(this.collection));
      }
    },






    //
    // !!!!!!!
    // @todo - Refactor below global events into own file or view
    // !!!!!!!
    //

    /**
     * Scroll back to the top of the viewport.
     */
    scrollViewportBackToTop: function() {
      window.scrollTo(0, 0);
    }

  });

  return Main;
});
