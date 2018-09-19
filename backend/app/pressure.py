from app import db

class Pressure(db.Model):
    __tablename__ = 'pressures'

    id = db.Column(db.Integer, primary_key = True)
    for_date = db.Column(db.DateTime, default = db.func.current_timestamp())
    for_hour = db.Column(db.Integer)
    sys = db.Column(db.Integer)
    dia = db.Column(db.Integer)
    pul = db.Column(db.Integer)
    date_created = db.Column(db.DateTime, default = db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default = db.func.current_timestamp(), onupdate = db.func.current_timestamp())

    def __init__(self, for_date, for_hour, sys, dia, pul):
        self.for_date = for_date
        self.for_hour = for_hour
        self.sys = sys
        self.dia = dia
        self.pul = pul

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Pressure.query.all()
