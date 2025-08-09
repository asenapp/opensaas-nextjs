import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      isAdmin: true,
      credits: 100,
    },
  })

  console.log({ admin })

  // Create demo user
  const userPassword = await hash('demo123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: userPassword,
      credits: 10,
    },
  })

  console.log({ user })

  // Create initial daily stats
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  await prisma.dailyStats.upsert({
    where: { date: today },
    update: {},
    create: {
      date: today,
      totalPageViews: 0,
      totalUsers: 2,
      paidUsers: 0,
      totalRevenue: 0,
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })