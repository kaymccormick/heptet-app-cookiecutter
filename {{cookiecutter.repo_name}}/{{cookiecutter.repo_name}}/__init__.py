from pyramid.config import Configurator

from heptet_app import get_root


def wsgi_app(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings, root_factory=get_root)
    config.include('pyramid_jinja2')
    config.include('heptet_app')
    config.add_static_view('dist', 'build/dist')
    config.add_static_view('build', 'build')

    #config.include('heptet_model')
    #config.include('entity_crud')

#    config.add_static_view('static', 'static', cache_max_age=3600)
#    config.add_route('home', '/')
#    config.scan()
    return config.make_wsgi_app()
