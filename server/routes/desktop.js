import express from 'express'
import { deleteDesktop, getAllDesktop, getLastDesktop, patchDesktop, postDesktop } from '../controllers/desktop.js'

const router = express.Router()

router.get('/all/:use_id/:last_id', getAllDesktop)
router.get('/:des_id', getLastDesktop)
router.post('/post/:use_id', postDesktop)
router.patch('/patch/:des_id', patchDesktop)
router.patch('/delete/:des_id', deleteDesktop)

export default router