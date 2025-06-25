const express = require('express');
const panelController = require('../controllers/panelController');
const { authorizeRole } = require('../middleware/auth');
const { validatePanelData } = require('../middleware/validation');

const router = express.Router();

router.post('/', authorizeRole(['customer', 'admin']), validatePanelData, panelController.createPanel);
router.get('/', authorizeRole(['customer', 'technician', 'admin']), panelController.getAllPanels);
router.get('/:id', authorizeRole(['customer', 'technician', 'admin']), panelController.getPanelById);
router.put('/:id', authorizeRole(['customer', 'admin']), validatePanelData, panelController.updatePanel);
router.delete('/:id', authorizeRole(['customer', 'admin']), panelController.deletePanel);

module.exports = router;
