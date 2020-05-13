""" Controller Initialization """

from flask_restx import Api

from .todos import NS as todos_ns

API = Api(
    version='0.1.0',
    title='Todos API',
    description='Todos REST API for generic api functionality'
)

API.add_namespace(todos_ns)
