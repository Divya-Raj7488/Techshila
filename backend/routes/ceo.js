const express = require('express')
const router = express.Router
import {getAllSupplier} from "../controller/ceo"

router.route('/suppliers').get(getAllSupplier)

module.exports = router