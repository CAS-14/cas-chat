import firebase_admin
from firebase_admin import credentials, db
import json

cred = credentials.Certificate("cas-chat-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

class User():
    def __init__(self):
        users = db.reference("/users/")
        for user in json.load(users):
