import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is healthy!', healthy: true })
})

export default router
