const express = require('express')
const router = express.Router()

/**
 * Main page rendering
 */
router.get('/', (req, res) => {
  res.render('index', {resError: req.query.error})
})

module.exports = router
