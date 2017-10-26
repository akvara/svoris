import datetime
import json
import unittest

from app import create_app, db


class WeightTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client
        self.weight = {'for_date': datetime.datetime.now(), 'weight': 87.5}

        # binds the app to the current context
        with self.app.app_context():
            # create all tables
            db.create_all()

    def test_weight_creation(self):
        """Test API can create a weight (POST request)"""
        res = self.client().post('/weights/', data = self.weight)
        self.assertEqual(res.status_code, 201)
        self.assertIn('87.5', str(res.data))

    def test_duplicating_for_date_is_replaced(self):
        weight = {'for_date': '2017-06-07', 'weight': 66.6}
        # self.register_user()
        # result = self.login_user()
        # access_token = json.loads(result.data.decode())['access_token']
        # user_id = User.decode_token(access_token)

        # vote['user_id'] = user_id

        res = self.client().post(
            '/weights/',
            # headers=dict(Authorization="Bearer " + access_token),
            data = weight)
        # print res.data
        # pass
        result_in_json = json.loads(res.data.decode('utf-8').replace("'", "\""))
        rec_id = result_in_json['id']
        weight['weight'] = 88.8

        res = self.client().post(
            '/weights/',
            # headers=dict(Authorization="Bearer " + access_token),
            data = weight)
        self.assertEqual(res.status_code, 201)
        result_in_json = json.loads(res.data.decode('utf-8').replace("'", "\""))

        self.assertEqual(rec_id, result_in_json['id'])
        self.assertEqual(88.8, result_in_json['weight'])

    def test_api_can_get_all_weights(self):
        """Test API can get a weight (GET request)."""
        res = self.client().post('/weights/', data=self.weight)
        self.assertEqual(res.status_code, 201)
        res = self.client().get('/weights/')
        self.assertEqual(res.status_code, 200)
        self.assertIn('87.5', str(res.data))

    def test_api_can_get_weight_by_id(self):
        """Test API can get a single weight by using it's id."""
        rv = self.client().post('/weights/', data=self.weight)
        self.assertEqual(rv.status_code, 201)
        result_in_json = json.loads(rv.data.decode('utf-8').replace("'", "\""))
        result = self.client().get(
            '/weights/{}'.format(result_in_json['id']))
        self.assertEqual(result.status_code, 200)
        self.assertIn('87.5', str(result.data))

    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.session.remove()
            db.drop_all()

# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()