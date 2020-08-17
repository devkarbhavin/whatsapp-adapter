'use strict';

const express = require('express');
const router = express.Router();

// Require the controllers
const controller = require('../controllers/twilio');
const twilioFlex = require('../controllers/twilioFlex');

router.post('/api', controller.whatsapp_webhook_request);
router.post('/delete_channel', twilioFlex.delete_channel);
router.post('/send_message', twilioFlex.whatsapp_webhook_request);
router.post('/new-message', twilioFlex.new_message);
router.post('/channel-update', twilioFlex.channel_update);
router.get('/', controller.get_request);


module.exports = router;