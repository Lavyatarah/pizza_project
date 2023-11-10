from flask import jsonify, request, url_for, redirect
from auth.auth import Authentication
from auth.restaurant_auth import RestaurantAuth
from datetime import datetime
from api.v1.views.restaurant import app_views
from flask_jwt_extended import jwt_required
from utils.restaurant_account import AccountService

restaurant_auth = UserAuth()
restaurant_authenticator = Authentication()

@app_views.route('/register', methods=['POST'])
def register_restaurant():
    """
    Register a new restaurant
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('first_name')
    phone_number = data.get('phone_number')
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
        return jsonify({"message": "email or phone number is required"}), 400
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
            response = jsonify({"message": "Logged in successfully!", 'status': 200})
            restaurant_authenticator.set_cookie(response, access_token)
            return response


#create an endpoint for adding pizza
@jwt_required()
@app_views.route('/pizza', methods=['POST'])
   