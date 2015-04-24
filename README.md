KickEvent UI
============

UI for KickEvent fontends (based on Bootstrap)

Building the demo
-----------------

    npm install
    cd demo 
    npm install
    gulp build

Check the generated demo by launching 

    gulp serve

Deploy the demo
---------------

To deploy the demo, start with pushing all the changes (demo/public) to master. Than, launch

     ./bin/gh-deploy demo/public
