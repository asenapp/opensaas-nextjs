import OpenAI from 'openai'

// Initialize OpenAI client conditionally to avoid build errors
export const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

export interface Task {
  id: string
  description: string
  time: string
  isDone: boolean
}

export interface ScheduledTask {
  description: string
  startTime: string
  duration: number
  priority: 'high' | 'medium' | 'low'
  subtasks?: string[]
}

export interface ScheduleResponse {
  schedule: ScheduledTask[]
}

export async function generateSchedule(
  tasks: Task[],
  startTime: string,
  endTime: string
): Promise<ScheduleResponse> {
  if (!openai) {
    throw new Error('OpenAI client not initialized. Please set OPENAI_API_KEY environment variable.')
  }

  const taskDescriptions = tasks
    .filter(task => !task.isDone)
    .map(task => `${task.description} (${task.time} hours)`)
    .join('\n')

  const systemPrompt = `You are a helpful daily task scheduler. Given a list of tasks with estimated durations and working hours, create an optimal schedule that prioritizes tasks effectively.`

  const userPrompt = `Please schedule these tasks between ${startTime} and ${endTime}:

${taskDescriptions}

Create a realistic schedule considering:
- Task priorities and dependencies
- Short breaks between tasks
- Logical task ordering
- Available time constraints`

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    tools: [{
      type: 'function',
      function: {
        name: 'parseTodaysSchedule',
        description: 'Parse the schedule for today',
        parameters: {
          type: 'object',
          properties: {
            schedule: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  description: { type: 'string' },
                  startTime: { type: 'string' },
                  duration: { type: 'number' },
                  priority: { 
                    type: 'string',
                    enum: ['high', 'medium', 'low']
                  },
                  subtasks: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                },
                required: ['description', 'startTime', 'duration', 'priority']
              }
            }
          },
          required: ['schedule']
        }
      }
    }],
    tool_choice: { type: 'function', function: { name: 'parseTodaysSchedule' }}
  })

  const toolCall = completion.choices[0]?.message?.tool_calls?.[0]
  if (toolCall && toolCall.function.arguments) {
    const result = JSON.parse(toolCall.function.arguments) as ScheduleResponse
    return result
  }

  throw new Error('Failed to generate schedule')
}