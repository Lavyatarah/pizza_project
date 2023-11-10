from sqlalchemy.orm import sessionmaker
from models.basemodel import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from os import getenv
from dotenv import load_dotenv


load_dotenv()


class DB:
    """
    DB class
    """

    __engine = None
    __session = None

    def __init__(self):
        """
        Constructor
        """

        user = getenv('DBUSER')
        password = getenv('PWD')
        host = getenv('HOST')
        db_name = getenv('DB')
        env = getenv('APP_ENV')
        try:
            self.__engine = create_engine(f'postgresql+psycopg2://{user}:{password}@{host}/{db_name}')
            # self.__engine = create_engine(pg_url)
            self.reload()

            if env == 'test':
                Base.metadata.drop_all(self.__engine)
        except SQLAlchemyError as e:
            raise e


    def reload(self):
        """
        Reload
        """

        Base.metadata.create_all(self.__engine)
        session_maker = sessionmaker(bind=self.__engine, expire_on_commit=False)
        self.__session = scoped_session(session_maker)



    def add(self, obj):
        """
        Add
        """

        self.__session.add(obj)

    def save(self):
        """
        Save
        """

        self.__session.commit()

    def delete(self, obj=None):
        """
        Delete
        """

        if obj:
            self.__session.delete(obj)

    def query(self, cls):
        """
        Query
        """

        return self.__session.query(cls)

    def close(self):
        """calls remove() method on the private session attr to close the session and stop using it"""
        self.__session.remove()

    def begin(self):
        """calls begin() method on the private session attr to start a transaction"""
        self.__session.begin()

    def rollback(self):
        """calls rollback() method on the private session attr to roll back a transaction"""
        self.__session.rollback()
