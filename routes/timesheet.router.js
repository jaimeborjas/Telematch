const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { checkApiKey } = require('../middlewares/auth.handler');
const passport = require('passport');

const UserService = require('../services/user.service');

const router = express.Router();
const service = UserService.getInstance();

router.use(checkApiKey);

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const users = await service.getAllTimesheets(req.user.sub);

    res.json(users);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const connectionId = req.params.id;

    const users = await service.getTimeSheetConnection(connectionId);
    res.json(users);
  } catch (error) {
    next(error);
  }
});
// id = connectionId
router.post('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const connectionId = req.params.id;
    const data = {
      ...req.body,
      connectionId: connectionId,
    };
    const users = await service.createTimeSheet(data);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const timesheetId = req.params.id;
    const connection = await service.acceptTimesheet(timesheetId);
    res.json(connection);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.deleteTimesheetEntry(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
