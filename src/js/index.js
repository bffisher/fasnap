(function(){
  'use strict';
    
  require(['react', 'react-dom', './frame'], function(React, ReactDOM, Frame) {
    ReactDOM.render(
      <Frame></Frame>,
      document.getElementById('root')
    );
  });

})();