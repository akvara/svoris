from app import db

class Weight(db.Model):
    __tablename__ = 'weights'

    id = db.Column(db.Integer, primary_key = True)
    for_date = db.Column(db.DateTime, default = db.func.current_timestamp())
    weight = db.Column(db.Float)
    date_created = db.Column(db.DateTime, default = db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default = db.func.current_timestamp(), onupdate = db.func.current_timestamp())

    def __init__(self, for_date, weight):
        self.for_date = for_date
        self.weight = weight

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Weight.query.all()

    def __repr__(self):
        pass
        # return "<On {} it was {}>".format(self.weight)