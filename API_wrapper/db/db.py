from sqlalchemy import (Column, Integer, MetaData, String, Table,
                        create_engine, ARRAY)

from databases import Database

DATABASE_URL = 'postgresql://flat_user:flattest@localhost/flat_test'

engine = create_engine(DATABASE_URL)
metadata = MetaData()

pulls = Table(
    'pulls',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('author', String(50)),
    Column('title', String(100)),
    Column('description', String(250)),
    Column('status', String(10)),
    Column('base', String(100)),
    Column('compare', String(100))
)

database = Database(DATABASE_URL)