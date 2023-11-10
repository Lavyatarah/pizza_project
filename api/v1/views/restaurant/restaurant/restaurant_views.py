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


# @app_views.route('/profile', methods=['GET'])
# @jwt_required()
# def get_restaurant():
#     """
#     Get a restaurant
#     """
#     restaurant_id = restaurant_authenticator.get_authenticated_restaurant()
#     restaurant = restaurant_auth.get_restaurant_by_id(restaurant_id)
#     if not restaurant:
#         return jsonify({"message": "restaurant not found"}), 404
#     restaurant_data = {
#         "email": restaurant.email,
#         "first_name": restaurant.first_name,
#         "last_name": restaurant.last_name,
#         "phone_number": restaurant.phone_number,
#         "location": restaurant.location,
#         "role": restaurant.role,
#         "is_active": restaurant.is_active,
#         "last_login": restaurant.last_login

#     }
#     return jsonify(restaurant_data), 200


# @app_views.route('/logout', methods=['POST'])
# def logout():
#     auth_header = request.headers.get('Authorization')

#     if auth_header and auth_header.startswith('Bearer '):
#         access_token = auth_header.split(' ')[1]

#         identity = restaurant_authenticator.get_authenticated_restaurant()
#         if identity and access_token:
#             response = jsonify({'message': 'Logged out successfully', 'status': 200})
#             restaurant_authenticator.unset_cookie(response, access_token)

#             return jsonify({'message': 'Logged out successfully'}), 200
#         else:
#             return jsonify({'message': 'No access token found'}), 400
