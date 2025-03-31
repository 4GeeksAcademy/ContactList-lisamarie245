from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    favorites_characters = db.Column(db.String(), unique=False, nullable=True)
    favorites_planets = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.id} - {self.email}>'

    def serialize(self):
            # Do not serialize the password, its a security breach
        return { "id": self.id,
                 "username": self.username,
                 "email": self.email,
                 "is_active": self.is_active,
                 "favorites_characters": self.favorites_characters,
                 "favorites_planets": self.favorites_planets}

class Posts (db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), unique=False, nullable=False)
    description = db.Column(db.String(), unique=False, nullable=False)
    body = db.Column(db.String(), unique=False, nullable=True)
    date = db.Column(db.DateTime(), unique=False, nullable=False, default=datetime.utcnow)
    image_url = db.Column(db.String(), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("posts_to", lazy="select"))

    def __repr__(self):
        return f'<Post: {self.id} - {self.title}>'
    
    def serialize(self):
        return{'id': self.id,
               'title': self.title,
               'description': self.description,
               'body': self.body,
               'date': self.date,
               'image_url': self.image_url,
               'user_id': self.user_id}

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

class Characters (db.Model):
    table_name = "Characters"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=True)
    height = db.Column(db.String(), unique=False, nullable=True)
    mass = db.Column(db.String(), unique=False, nullable=True)
    hair_color = db.Column(db.String(), unique=False, nullable=True)
    skin_color = db.Column(db.String(), unique=False, nullable=True)
    eye_color = db.Column(db.String(), unique=False, nullable=True)
    birth_year = db.Column(db.String(), unique=False, nullable=True)
    gender = db.Column(db.String(), unique=False, nullable=True)

    def serialize(self):
        return { "id": self.id,
                 "name": self.name,
                 "height": self.height,
                 "mass": self.mass,
                 "hair_color": self.hair_color,
                 "skin_color": self.skin_color,
                 "eye_color": self.eye_color,
                 "birth_year": self.birth_year,
                 "gender": self.gender}
    

class FavoritesCharacters (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("favoritescharacters_to", lazy="select"))
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"))
    character_to = db.relationship("Characters", foreign_keys=[character_id], backref=db.backref("favoritescharacters_to", lazy="select"))

    def __repr__(self):
        return f'<Favorite: User {self.user_id} - Character {self.character_id}>'
    
    def serialize(self):
        return {
            'user_id': self.user_id,
            'character_id': self.character_id
        }
    
class Planets (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=True)
    diameter = db.Column(db.String(), unique=False, nullable=True)
    rotation_period = db.Column(db.String(), unique=False, nullable=True)
    orbital_period = db.Column(db.String(), unique=False, nullable=True)
    gravity = db.Column(db.String(), unique=False, nullable=True)
    population = db.Column(db.String(), unique=False, nullable=True)
    climate = db.Column(db.String(), unique=False, nullable=True)
    terrain = db.Column(db.String(), unique=False, nullable=True)

    def serialize(self):
        return { "id": self.id,
                 "name": self.name,
                 "diameter": self.diameter,
                 "rotation_period": self.rotation_period,
                 "orbital_period": self.orbital_period,
                 "gravity": self.gravity,
                 "population": self.population,
                 "climate": self.climate,
                 "terrain": self.terrain}
    

class FavoritesPlanets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("favoritesplanets_to", lazy="select"))
    planet_id = db.Column(db.Integer, db.ForeignKey("planets.id"))
    planet_to = db.relationship("Planets", foreign_keys=[planet_id], backref=db.backref("favoritesplanets_to", lazy="select"))

    def __repr__(self):
        return f'<Favorite: User {self.user_id} - Planet {self.planet_id}>'
    
    def serialize(self):
        return {
            'user_id': self.user_id,
            'planet_id': self.planet_id
        }
