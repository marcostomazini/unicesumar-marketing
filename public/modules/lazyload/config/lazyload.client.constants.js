(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['/lib/modernizr/modernizr.js'],
            'icons':              ['/lib/fontawesome/css/font-awesome.min.css',
                                   '/lib/simple-line-icons/css/simple-line-icons.css']
          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['/lib/angularjs-toaster/toaster.js', '/lib/angularjs-toaster/toaster.css']}
            {name: 'datatables',                files: ['/lib/datatables/media/css/jquery.dataTables.css',
                                                        '/lib/datatables/media/js/jquery.dataTables.js',
                                                        '/lib/angular-datatables/dist/angular-datatables.js'], serie: true}
          ]
        })
        ;

})();
