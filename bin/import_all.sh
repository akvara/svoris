cd backend/imports
echo "Importing pressures ..."
python import_pressures.py
echo "Importing weights ..."
python import_weights.py
echo "Finished"
