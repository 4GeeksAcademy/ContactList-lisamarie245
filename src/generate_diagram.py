from sqlalchemy_schemadisplay import create_schema_graph
from sqlalchemy import MetaData
from app import db  

graph = create_schema_graph(
    metadata=MetaData(bind=db.engine),
    show_datatypes=False,
    show_indexes=False,
    rankdir='LR',  
    concentrate=False  
)

graph.write_png('database_schema.png') 