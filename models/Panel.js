const { adminDB } = require('../config/firebase');

class Panel {
  static async create(panelData, ownerId) {
    const panelId = panelData.name; // Using name as ID based on your data structure
    const panelRef = adminDB.ref(`panels/${panelId}`);
    
    const newPanel = {
      owner_id: ownerId,
      location: panelData.location,
      installation_date: panelData.installation_date,
      status: panelData.status,
      last_updated: new Date().toISOString(),
      created_at: new Date().toISOString(),
      measurements: {}
    };
    
    await panelRef.set(newPanel);
    return { id: panelId, ...newPanel };
  }

  static async findById(panelId) {
    const panelRef = adminDB.ref(`panels/${panelId}`);
    const snapshot = await panelRef.once('value');
    const panelData = snapshot.val();
    
    if (!panelData) {
      return null;
    }
    
    return { id: panelId, ...panelData };
  }

  static async findByOwner(ownerId) {
    const panelsRef = adminDB.ref('panels');
    const snapshot = await panelsRef.orderByChild('owner_id').equalTo(ownerId).once('value');
    const panels = snapshot.val() || {};
    
    return Object.keys(panels).map(id => ({
      id,
      ...panels[id]
    }));
  }

  static async update(panelId, updateData) {
    const panelRef = adminDB.ref(`panels/${panelId}`);
    const updatedData = {
      ...updateData,
      last_updated: new Date().toISOString()
    };
    
    await panelRef.update(updatedData);
    return this.findById(panelId);
  }

  static async delete(panelId) {
    const panelRef = adminDB.ref(`panels/${panelId}`);
    const technicianRef = adminDB.ref(`panel_technicians/${panelId}`);
    
    await Promise.all([
      panelRef.remove(),
      technicianRef.remove()
    ]);
    
    return true;
  }

  static async getAll() {
    const panelsRef = adminDB.ref('panels');
    const snapshot = await panelsRef.once('value');
    const panels = snapshot.val() || {};
    
    return Object.keys(panels).map(id => ({
      id,
      ...panels[id]
    }));
  }

  static async addMeasurement(panelId, measurementData) {
    const timestamp = new Date().toISOString();
    const measurementRef = adminDB.ref(`panels/${panelId}/measurements/${timestamp}`);
    const panelRef = adminDB.ref(`panels/${panelId}`);
    
    await Promise.all([
      measurementRef.set(measurementData),
      panelRef.update({ last_updated: timestamp })
    ]);
    
    return { timestamp, ...measurementData };
  }

  static async getMeasurements(panelId, startDate, endDate) {
    const measurementsRef = adminDB.ref(`panels/${panelId}/measurements`);
    let query = measurementsRef;
    
    if (startDate) {
      query = query.orderByKey().startAt(startDate);
    }
    if (endDate) {
      query = query.orderByKey().endAt(endDate);
    }
    
    const snapshot = await query.once('value');
    const measurements = snapshot.val() || {};
    
    return Object.keys(measurements).map(timestamp => ({
      timestamp,
      ...measurements[timestamp]
    }));
  }
}

module.exports = Panel;