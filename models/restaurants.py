from models.basemodel import BaseModel, Base
from models.pizzas import Pizzas
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

class Restaurants(BaseModel, Base):
    __tablename__ = 'restaurants'
    email = Column(String(255), nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    phone_number = Column(String(20), nullable=False)
    location = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)


    pizza = relationship('Pizzas', foreign_keys=[Pizzas.restaurant_id], back_populates='restaurant')

    def __init__(self, *args, **kwargs):
        """Initialize the restaurant"""
        super().__init__(*args, **kwargs)

    def to_dict(self):
        """Return a dictionary representation of the restaurant"""
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'phone_number': self.phone_number,
            'location': self.location
 }
