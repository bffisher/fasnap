define(function(require) {
  'use strict';

  var React = require('react');
  
  var Snapshot = require('./snapshot');
  
  return function(){
    return (
        <div id="home">
          <Snapshot>
          </Snapshot>
          <div className="tendency">
            <div className="durationSelector"></div>
            <div className="line"></div>
          </div>
        </div>
      );
  };

});