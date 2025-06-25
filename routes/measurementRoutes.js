const express = require('express');
const measurementController = require('../controllers/measurementController');
const { authorizeRole } = require('../middleware/auth');
const { validateMeasurementData } = require('../middleware/validation');

const router = express.Router();

router.post('/:panelId', authorizeRole(['technician', 'admin']), validateMeasurementData, measurementController.addMeasurement);
router.get('/:panelId', authorizeRole(['customer', 'technician', 'admin']), measurementController.getMeasurements);

module.exports = router;