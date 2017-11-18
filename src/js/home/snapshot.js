define(function(require) {
  'use strict';

  var React = require('react');
  
  return function(){
    return (
      <div className="snapshot">
        <div className="termSelector">
          <div>Prev</div>
          <div>2017-11-07</div>
          <div>Next</div>
        </div>
        <div className="amount">
          <span>amount:</span><span>xxxxxx</span>
        </div>
        <div className="pie"></div>
      </div>
    );
  };
});