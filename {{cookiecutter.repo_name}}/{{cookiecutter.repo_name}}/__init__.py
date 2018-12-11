from pyramid.config import Configurator
from pyramid.response import Response

from heptet_app import get_root, IResourceRoot, IEntryPointFactory


def wsgi_app(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings, root_factory=get_root)
    config.include('pyramid_jinja2')
    config.include('heptet_app')
    {% if cookiecutter.include_sqlalchemy_packages %}
    config.include('heptet_app_sqlalchemy')
    config.include('heptet_model_adapter')
    root = config.get_root_resource()
    assert root
    model = root.create_resource("model")
    config.set_resource_context(model)
    config.set_resource_context(model)
    config.include('heptet_model.pyramid')
    {% endif %}


    config.add_static_view('dist', 'build/dist')
    config.add_static_view('build', 'build')

    root = config.registry.getUtility(IResourceRoot)
    epf = config.registry.getUtility(IEntryPointFactory);

    hello_resource = root.create_resource('hello', epf(config.registry, 'hello'))
    config.add_view(lambda x, r: Response("Hello world."), context=type(hello_resource))

    #config.include('heptet_model')
    #config.include('entity_crud')

#    config.add_static_view('static', 'static', cache_max_age=3600)
#    config.add_route('home', '/')
#    config.scan()
    return config.make_wsgi_app()
