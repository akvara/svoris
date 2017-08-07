import unittest
import json
import datetime
from app import create_app, db

class PressureTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client
        self.pressure = {
            'for_date': datetime.datetime.now(),
            'for_hour': 11,
            'sys': 120, 'dia': 80, 'pul': 70
        }

        # binds the app to the current context
        with self.app.app_context():
            # create all tables
            db.create_all()

    def test_pressure_creation(self):
        """Test API can create a pressure (POST request)"""
        res = self.client().post('/pressures/', data = self.pressure)
        self.assertEqual(res.status_code, 201)
        self.assertIn('120', str(res.data))

    def test_duplicating_for_date_is_replaced(self):
        pressure = {
            'for_date': '2017-06-07',
            'for_hour': '13',
            'sys': 129, 'dia': 89, 'pul': 79
        }
        # self.register_user()
        # result = self.login_user()
        # access_token = json.loads(result.data.decode())['access_token']
        # user_id = User.decode_token(access_token)

        # vote['user_id'] = user_id

        res = self.client().post(
            '/pressures/',
            data = pressure)

        result_in_json = json.loads(res.data.decode('utf-8').replace("'", "\""))
        rec_id = result_in_json['id']
        pressure['pul'] = 88

        res = self.client().post(
            '/pressures/',
            # headers=dict(Authorization="Bearer " + access_token),
            data = pressure)
        self.assertEqual(res.status_code, 201)
        result_in_json = json.loads(res.data.decode('utf-8').replace("'", "\""))

        self.assertEqual(rec_id, result_in_json['id'])
        self.assertEqual(88, result_in_json['pul'])

    def test_api_can_get_all_pressures(self):
        """Test API can get a pressure (GET request)."""
        res = self.client().post('/pressures/', data=self.pressure)
        self.assertEqual(res.status_code, 201)
        res = self.client().get('/pressures/')
        self.assertEqual(res.status_code, 200)
        self.assertIn('120', str(res.data))

    def test_api_can_get_pressure_by_id(self):
        """Test API can get a single pressure by using it's id."""
        rv = self.client().post('/pressures/', data=self.pressure)
        self.assertEqual(rv.status_code, 201)
        result_in_json = json.loads(rv.data.decode('utf-8').replace("'", "\""))
        result = self.client().get(
            '/pressures/{}'.format(result_in_json['id']))
        print str(result.data)
        self.assertEqual(result.status_code, 200)
        self.assertIn('120', str(result.data))

    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.session.remove()
            db.drop_all()

# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()