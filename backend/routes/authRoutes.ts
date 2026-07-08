import { Router } from 'express'
import { login, logout, register } from '../controllers'
import { protect } from '../middleware'

export const authRoutes = Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/logout', protect, logout)
