import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSchedule } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check user credits or subscription
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        credits: true,
        subscriptionStatus: true,
        subscriptionPlan: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has access
    const hasActiveSubscription = user.subscriptionStatus === 'active'
    const hasCredits = user.credits > 0

    if (!hasActiveSubscription && !hasCredits) {
      return NextResponse.json(
        { error: 'No credits remaining. Please upgrade to continue.' },
        { status: 402 }
      )
    }

    const body = await request.json()
    const { tasks, startTime, endTime } = body

    if (!tasks || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Tasks, start time, and end time are required' },
        { status: 400 }
      )
    }

    // Generate schedule using OpenAI
    const scheduleResponse = await generateSchedule(tasks, startTime, endTime)

    // Deduct credit if user is on free plan
    if (!hasActiveSubscription) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { credits: user.credits - 1 },
      })
    }

    // Store the response
    await prisma.gptResponse.create({
      data: {
        userId: session.user.id,
        content: JSON.stringify(scheduleResponse),
      },
    })

    // Update user last active
    await prisma.user.update({
      where: { id: session.user.id },
      data: { lastActiveAt: new Date() },
    })

    return NextResponse.json(scheduleResponse)
  } catch (error) {
    console.error('Failed to generate schedule:', error)
    return NextResponse.json(
      { error: 'Failed to generate schedule. Please try again.' },
      { status: 500 }
    )
  }
}