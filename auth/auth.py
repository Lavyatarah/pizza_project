from flask_jwt_extended import create_access_token, get_jwt_identity, unset_jwt_cookies, \
    set_access_cookies, verify_jwt_in_request
import os

class Authentication:

    __token = None

    def create_token(self, identity):
        self.__token = create_access_token(identity=identity)
        return self.__token

    def refresh_token(self, identity):
        self.create_token(identity)

    def validate_jwt(self):
        try:
            verify_jwt_in_request()
        except Exception as e:
            return False
        return True
    def get_authenticated_restaurant(self):
        return get_jwt_identity()

    def set_cookie(self, response, access_token):
        set_access_cookies(response, access_token)

    def unset_cookie(self, response, access_token):
        unset_jwt_cookies(response, access_token)