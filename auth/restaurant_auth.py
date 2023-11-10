from models.restaurants import Restaurants
from uuid import uuid4
from db.storage import DB
from bcrypt import hashpw, gensalt, checkpw

class RestaurantAuth:
    _db = DB()
    _db.reload()

    def hash_password(self, password):
        password_bytes = password.encode('utf-8')
        salt = gensalt()
        hashed_password = hashpw(password_bytes, salt)
        return hashed_password.decode('utf-8')

    def verify_password(self, candidate_password, hashed_password):
        candidate_password_bytes = candidate_password.encode('utf-8')
        hashed_password_bytes = hashed_password.encode('utf-8')
        return checkpw(candidate_password_bytes, hashed_password_bytes)

    def create_restaurant(self, **kwargs):
        email = kwargs.get('email')
        password = kwargs.get('password')
        name = kwargs.get('name')
        phone_number = kwargs.get('phone_number')
        location = kwargs.get('location')
        password = self.hash_password(password)
        restaurant = Restaurants(email=email, password=password, name=name, phone_number=phone_number, location=location)
        self._db.add(restaurant)
        self._db.save()
        return restaurant

    def get_restaurant_by_email(self, email):
        try:
            return self._db.query(Restaurants).filter_by(email=email).first()
        except Exception as e:
            return None
    def get_restaurant_by_phone_number(self, phone_number):
        try:
            return self._db.query(Restaurants).filter_by(phone_number=phone_number).first()
        except Exception as e:
            return None
    def get_restaurant_by_id(self, id):
        try:
            return self._db.query(Restaurants).filter_by(id=id).first()
        except Exception as e:
            return None

    def get_all_restaurants(self):
        return self._db.query(Restaurants).all()

    def delete_restaurant(self, id):
        restaurant = self.get_restaurant_by_id(id)
        self._db.delete(restaurant)
        self._db.save()
        return True

    def update_restaurant(self, id, email, password):
        try:
            restaurant = self.get_restaurant_by_id(id)
            if restaurant:
                if email:
                    restaurant.email = email
                if password:
                    restaurant.password = self.hash_password(password)
                self._db.save()
                return restaurant
            return None
        except Exception as e:
            return None
