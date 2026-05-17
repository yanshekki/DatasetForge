import { Router } from 'express';
import { UserService } from './user.service';

const router = Router();
const userService = new UserService();

// ... existing routes ...

// Upload profile picture
router.post('/profile/picture', upload.single('picture'), async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const result = await userService.uploadProfilePicture(userId, file);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
