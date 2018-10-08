{{ cookiecutter.project_name }}
------------------------------------------------------

Building
========

Run "process_views" which is installed as part of heptet-app. Pass "-c development.ini" like so:

$ process_views -c development.ini

This should produce the javascript entry points for your application, to be processed by webpack.

Run an instance of the pyramid application for use by the build process.

$ pserve development.ini &

Run the buikd:

$ npm run build-dev
