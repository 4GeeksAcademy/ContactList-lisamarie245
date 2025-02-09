from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    phone = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.id} - {self.email}>'

    def serialize(self):
            # Do not serialize the password, its a security breach
        return { "id": self.id,
                 "email": self.email,
                 "is_active": self.is_active,
                 "first_name": self.first_name,
                 "phone": self.phone}

class Posts (db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), unique=False, nullable=False)
    description = db.Column(db.String(), unique=False, nullable=False)
    body = db.Column(db.String(), unique=False, nullable=True)
    date = db.Column(db.DateTime(), unique=False, nullable=False)
    image_url = db.Column(db.String(), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("posts_to", lazy="select"))

    def __repr__(self):
        return f'<Post: {self.id} - {self.title}>'

class Medias (db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum("image", "video", "podcast", name="media_type"), unique=False, nullable=False)
    url = db.Column(db.String(), unique=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), unique=True)
    post_to = db.relationship("Posts", foreign_keys=[post_id], backref=db.backref("media_to", lazy="select"))


class Followers (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    follower_to = db.relationship("Users", foreign_keys=[follower_id], backref=db.backref("followers_to", lazy="select"))
    following_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    following_to= db.relationship("Users", foreign_keys=[following_id], backref=db.backref("followings_to", lazy="select"))

def __repr__(self):
        return f'<Follower: {self.follower_id} - {self.following_id}>'

