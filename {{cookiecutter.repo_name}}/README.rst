{{ cookiecutter.project_name }}
===============================

Pre-requisites:

* Python 3.4 (?)
* Node JS (version ?)
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

Run "grunt"
-------------------
Run build process.

$ yarn run grunt

This should produce the javascript entry points for your application, to be processed by webpack.

Troubleshooting
---------------

If you receive a webpack error, make sure you have the latest dev
branch of marshmallow installed. The shape of the data is incorrect in 2.x versions.
