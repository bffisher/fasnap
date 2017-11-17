define(function(require) {
  'use strict';
  
  var React = require('react');
  var Home = require('./home/index');
  var FootMenu = require('./footMenu');

  return function(){
    return (
        <div id="frame">
          <Home />
          <FootMenu />
        </div>
      );
  };

});