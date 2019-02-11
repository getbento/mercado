from instagram.client import InstagramAPI

access_token = "6864564308.0a3b8e2.026aedc91bd040fe82e74b3d218a8e7a"
client_secret = "c416f12e41f44f439764d2bacfe5a1b6"
api = InstagramAPI(access_token=access_token, client_secret=client_secret)
recent_media, next_ = api.user_recent_media(user_id="littlespain", count=10)
for media in recent_media:
   print (media.caption.text)
