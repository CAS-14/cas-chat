import firebase_admin
from firebase_admin import credentials, db
import json
import os
import hashlib

cred = credentials.Certificate("cas-chat-firebase-adminsdk.json")
firebase_admin.initialize_app(cred, {'databaseURL':"https://cas-chatapp-default-rtdb.firebaseio.com/"})

current_user = None
users = db.reference("/users/")

class User:
    def __init__(self, userid):
        self.user_ref = db.reference("/users/"+str(userid))
        self.userid = userid
        self.username = self.user_ref.child("username").get()
        self.bio = self.user_ref.child("bio").get()
        self.status = self.user_ref.child("status").get()
        
def gen_key(password, salt):
    return hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000, dklen=128)

def register(username, password):
    for user in users.get():
        if username == user['username']:
            return "username taken"

    userid = int(list(users.order_by_key().limit_to_last(1).get().keys())[0]) + 1
    auth_salt = os.urandom(32)
    auth_key = gen_key(password, auth_salt)
    
    path = users.child(str(userid))
    with open("user_template.json", "r") as f:
        defaultdata = json.load(f)
    path.set(defaultdata)
    path.update({"username": username, "auth_salt": auth_salt, "auth_key": auth_key})

    current_user = User(userid)

def login(username, password_try):
    try:
        userid = list(users.order_by_child('username').equal_to(username).limit_to_first(1).get())[0]
    except:
        return "user not found"
    else:
        if not userid:
            return "user not found"

    user_ref = db.reference("/users/"+userid)

    try:
        auth_salt = user_ref.child("auth_salt").get()
    except:
        return "error: cannot find user salt"
    
    try:
        assert gen_key(password_try, auth_salt) == user_ref.child("auth_key")
    except AssertionError:
        return "incorrect password"

    current_user = User(userid)

    
