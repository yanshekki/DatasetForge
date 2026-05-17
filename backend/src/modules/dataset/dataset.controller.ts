import { Router } from 'express';
import { DatasetService } from './dataset.service';

const router = Router();
const datasetService = new DatasetService();

// ... existing routes ...

// Advanced search
router.get('/search', async (req, res) => {
  try {
    const { q, tags, sort = 'relevance' } = req.query;
    const results = await datasetService.advancedSearch(
      q as string,
      tags as string,
      sort as string
    );
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
