from flask import jsonify, request, url_for, redirect
from auth.auth import Authentication
from auth.restaurant_auth import RestaurantAuth
from datetime import datetime
from api.v1.views.restaurant.restaurant import app_views
from flask_jwt_extended import jwt_required
from utils.GetRelationships import GetRelationships
from models.pizzas import Pizzas

restaurant_auth = RestaurantAuth()
restaurant_authenticator = Authentication()

@app_views.route('/register', methods=['POST'])
def register_restaurant():
    """
    Register a new restaurant
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    phone_number = data.get('phoneNumber')
    location = data.get('location')

    if not email:
        return jsonify({"message": "email is required"}), 400
    if not password:
        return jsonify({"message": "password is required"}), 400
    if not name:
        return jsonify({"message": " restaurant name is required"}), 400
    if not phone_number:
        return jsonify({"message": "phone_number is required"}), 400
    if not location:
        return jsonify({"message": "location is required"}), 400
    restaurant = restaurant_auth.get_restaurant_by_email(email)
    if restaurant:
        return jsonify({"message": "restaurant already exists"}), 409
    else:
        restaurant = restaurant_auth.create_restaurant(email=email, password=password, name=name, phone_number=phone_number, location=location)
        return jsonify({"message": "Registration successful"}), 201



@app_views.route('/login', methods=['POST'])
def login_restaurant():
    """
    Login a restaurant
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email:
        return jsonify({"message": "email is required"}), 400
    if not password:
        return jsonify({"message": "password is required"}), 400
    if email:
        restaurant = restaurant_auth.get_restaurant_by_email(email)
        if not restaurant:
            return jsonify({"message": "restaurant not found"}), 404
        if not restaurant_auth.verify_password(password, restaurant.password):
            return jsonify({"message": "invalid password"}), 400
        else:
            access_token = restaurant_authenticator.create_token(restaurant.id)
            response = jsonify({"message": "Logged in successfully!", 'status': 200, 'jwtToken': access_token, 'restaurant': restaurant.to_dict()})
            return response

@jwt_required
@app_views.route('/logout', methods=['POST'])
def logout_restaurant():
    """
    Logout a restaurant
    """
    access_token = None
    auth_header = request.headers.get('Authorization')
    if auth_header:
        access_token = auth_header.split(" ")[1]

    restaurant = restaurant_authenticator.get_authenticated_restaurant()

    if not restaurant:
        return jsonify({"message": "Not logged in!"}), 400
    else:
        restaurant_authenticator.unset_cookies(response, access_token)
        response = jsonify({"message": "Logged out successfully!"})
        return response


@jwt_required
@app_views.route('/create_pizza', methods=['POST'])
def create_pizza():
    """
    Create a new pizza
    """
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')
    image = data.get('image')

    if not name:
        return jsonify({"message": "name is required"}), 400
    if not price:
        return jsonify({"message": "price is required"}), 400

    restaurant = restaurant_authenticator.get_authenticated_restaurant()
    if not restaurant:
        return jsonify({"message": "Not logged in!"}), 400

    pizzas = GetRelationships.get_pizzas_from_restaurant(restaurant.id)
    for pizza in pizzas:
        if pizza.name == name:
            return jsonify({"message": "pizza already exists"}), 409

    pizza = Pizza(name=name, price=price, image=image, restaurant_id=restaurant.id)
    pizza.save()

    return jsonify({"message": "Pizza created successfully!"}), 201


@jwt_required
@app_views.route('/pizzas', methods=['GET'])
def get_all_pizzas():
    """
    Get all pizzas
    """
    restaurant = restaurant_authenticator.get_authenticated_restaurant()
    if not restaurant:
        return jsonify({"message": "Not logged in!"}), 400

    pizzas = GetRelationships.get_pizzas_from_restaurant(restaurant.id)
    if not pizzas:
        return jsonify({"message": "No pizzas found"}), 404

    pizzas_list = []
    for pizza in pizzas:
        pizzas_list.append(pizza.to_dict())

    return jsonify({"pizzas": pizzas_list}), 200

# @jwt_required
