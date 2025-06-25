const express = require('express');
const technicianController = require('../controllers/technicianController');
const { authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.post('/assign', authorizeRole(['admin']), technicianController.assignTechnician);
router.delete('/:panelId/:technicianId', authorizeRole(['admin']), technicianController.removeTechnician);
router.get('/panel/:panelId', authorizeRole(['technician', 'admin']), technicianController.getPanelTechnicians);
router.get('/technician/:technicianId', authorizeRole(['technician', 'admin']), technicianController.getTechnicianPanels);

module.exports = router;