(function(){
  'use strict';
  
  require(['./alias_debug'], function(aliases) {
    require.config({ paths: aliases/* , waitSeconds: 0 */});
    
    require(['./index']);
  });
})();