'use strict';

var Slickr = {};

Slickr.env = {
  current: 'DEV',
  isCurrentEnv: function(expected) {
    return Slickr.env.current === expected;
  },
  setToProd: function() {
    Slickr.env.current = 'PROD';
  },
  setToDev: function() {
    Slickr.env.current = 'DEV';
  },
  imageProperties: {
    height: 120,
    containerId: 'slick-images'
  }
};
