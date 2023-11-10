#creating a class with methods of handling the update and addition of Pizzas from the pizzas model

from models.pizzas import Pizzas
from db.storage import DB

class PizzaUpdate:
    _db = DB()
    _db.reload()

    def create_Pizza(self, **kwargs):
        restaurant_id = kwargs.get('restaurant_id')
        name = kwargs.get('name')
        price = kwargs.get('price')
        image = kwargs.get('image')
        Pizza = Pizzas(restaurant_id=restaurant_id, name=name, price=price, image=image)

        self._db.add(Pizza)
        self._db.save()
        return Pizza

    def get_Pizza_by_name(self, name):
        try:
            return self._db.query(Pizzas).filter_by(name=name).first()
        except Exception as e:
            return None
    def get_Pizza_by_image(self, image):
        try:
            return self._db.query(Pizzas).filter_by(image=image).first()
        except Exception as e:
            return None
    def get_Pizza_by_id(self, id):
        try:
            return self._db.query(Pizzas).filter_by(id=id).first()
        except Exception as e:
            return None

    def get_all_Pizzas(self):
        return self._db.query(Pizzas).all()

    def delete_Pizza(self, id):
        Pizza = self.get_Pizza_by_id(id)
        self._db.delete(Pizza)
        self._db.save()
        return True

    def update_Pizza(self, id, name, price, image):
        try:
            Pizza = self.get_Pizza_by_id(id)
            if Pizza:
                if name:
                    Pizza.name = name
                if price:
                    Pizza.price = price
                if image:
                    Pizza.image = image
                self._db.save()
                return Pizza
            return None
        except Exception as e:
            return None
