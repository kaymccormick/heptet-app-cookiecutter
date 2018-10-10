{{ cookiecutter.project_name }}
===============================

Pre-requisites:

* Python 3.7
* Node JS (version ??)
* Yarn


Building
--------

Create a virtualenv
-------------------

I usually run 'python -m venv venv' (for instance) but I know there are other methods.
Use the method appropriate for your environment to create an isolated python virtualenv, and
"active" that environment.

Install the npm-based pre-requisited with the "yarn" tool.
----------------------------------------------------------

$ yarn

Install the python package in development mode using pip.
---------------------------------------------------------

$ pip install -e .

Run "process_views"
-------------------
This 'tool' is installed as part of heptet-app. Pass "-c development.ini" like so:

$ process_views -c development.ini

This should produce the javascript entry points for your application, to be processed by webpack.

Run an instance of the pyramid application for use by the build process.
------------------------------------------------------------------------
On windows you will need to open two terminals since you cannot run a task in the background,
as far as I know.

$ pserve development.ini &

Run the build:
--------------


$ npm run build-dev
