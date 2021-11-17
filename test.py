from main import *

def testuser(user):
    return f"Username: {user.username}\nUser ID: {user.userid}\nBio: {user.bio}"

print("Registerring")
register("test", "123test")
print(testuser(current_user))
current_user = None

print("Reregisterring")
register("test", "123test")
print(testuser(current_user))
current_user = None
