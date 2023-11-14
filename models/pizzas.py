from models.basemodel import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

class Pizzas(BaseModel, Base):
    __tablename__ = 'pizzas'
    restaurant_id = Column(String(255), ForeignKey('restaurants.id'), nullable=False)
    name = Column(String(255), nullable=False)
    price = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)

    restaurant = relationship("Restaurants", back_populates="pizza")

    def __init__(self, *args, **kwargs):
        """Initialize the account"""
        super().__init__(*args, **kwargs)

    def to_dict(self):
        """Return a dictionary representation of the account"""
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'name': self.name,
            'price': self.price,
            'image': self.image
        }