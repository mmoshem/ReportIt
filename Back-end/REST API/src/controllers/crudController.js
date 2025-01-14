class CrudController {
    constructor(db) {
      this.db = db;
    }
  
    getAll = async (req, res) => {
      try {
        const snapshot = await this.db.collection(req.params.collection).get();
        const items = [];
        snapshot.forEach(doc => {
          items.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    getOne = async (req, res) => {
      try {
        const doc = await this.db.collection(req.params.collection).doc(req.params.id).get();
        if (!doc.exists) {
          res.status(404).json({ error: 'Document not found' });
        } else {
          res.status(200).json({ id: doc.id, ...doc.data() });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    create = async (req, res) => {
      try {
        const docRef = await this.db.collection(req.params.collection).add(req.body);
        const doc = await docRef.get();
        res.status(201).json({ id: doc.id, ...doc.data() });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    update = async (req, res) => {
      try {
        await this.db.collection(req.params.collection).doc(req.params.id).update(req.body);
        const doc = await this.db.collection(req.params.collection).doc(req.params.id).get();
        res.status(200).json({ id: doc.id, ...doc.data() });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    delete = async (req, res) => {
      try {
        await this.db.collection(req.params.collection).doc(req.params.id).delete();
        res.status(200).json({ message: 'Document deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  }
  
  module.exports = CrudController;