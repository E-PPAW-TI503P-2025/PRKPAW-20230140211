const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { addUserData } = require('../middleware/permissionMiddleware');
router.use(addUserData);
router.post('/check-in', presensiController.CheckIn);
router.post('/check-out', presensiController.CheckOut);
router.delete('/:id', presensiController.deletePresensi);
router.put(
  '/:id',
  [
    body('checkIn')
      .optional()
      .isISO8601()
      .withMessage('Format checkIn harus berupa tanggal valid (YYYY-MM-DD atau YYYY-MM-DDTHH:mm:ssZ)'),
    body('checkOut')
      .optional()
      .isISO8601()
      .withMessage('Format checkOut harus berupa tanggal valid (YYYY-MM-DD atau YYYY-MM-DDTHH:mm:ssZ)'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  presensiController.updatePresensi
);

module.exports = router;
