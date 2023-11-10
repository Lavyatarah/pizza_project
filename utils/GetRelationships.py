from models.restaurants import Restaurants
from models.pizzas import Pizzas
from db.storage import DB

class GetRelationships:
    """Get relationships"""
    __db = DB()

    def get_pizza_from_restaurant(self, restaurant_id):
        """Get the restaurant from the accounts table"""
        restaurant = self.__db.query(Pizzas).filter_by(id=restaurant_id).first()
        return restaurant

