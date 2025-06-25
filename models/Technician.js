const { adminDB } = require('../config/firebase');

class Technician {
  static async assignToPanel(panelId, technicianId) {
    const assignmentRef = adminDB.ref(`panel_technicians/${panelId}/${technicianId}`);
    const assignmentData = {
      assigned_at: new Date().toISOString()
    };
    
    await assignmentRef.set(assignmentData);
    return assignmentData;
  }

  static async removeFromPanel(panelId, technicianId) {
    const assignmentRef = adminDB.ref(`panel_technicians/${panelId}/${technicianId}`);
    await assignmentRef.remove();
    return true;
  }

  static async getPanelTechnicians(panelId) {
    const technicianRef = adminDB.ref(`panel_technicians/${panelId}`);
    const snapshot = await technicianRef.once('value');
    const technicians = snapshot.val() || {};
    
    return Object.keys(technicians).map(technicianId => ({
      technician_id: technicianId,
      ...technicians[technicianId]
    }));
  }

  static async getTechnicianPanels(technicianId) {
    const allAssignmentsRef = adminDB.ref('panel_technicians');
    const snapshot = await allAssignmentsRef.once('value');
    const allAssignments = snapshot.val() || {};
    
    const technicianPanels = [];
    
    Object.keys(allAssignments).forEach(panelId => {
      if (allAssignments[panelId][technicianId]) {
        technicianPanels.push({
          panel_id: panelId,
          ...allAssignments[panelId][technicianId]
        });
      }
    });
    
    return technicianPanels;
  }
}

module.exports = Technician;