'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, Plus, Calendar, Clock, Trash2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface Task {
  id: string
  description: string
  time: string
  isDone: boolean
}

interface ScheduledTask {
  description: string
  startTime: string
  duration: number
  priority: 'high' | 'medium' | 'low'
  subtasks?: string[]
}

export default function DemoAppPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [newTaskTime, setNewTaskTime] = useState('1')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('17:00')
  const [schedule, setSchedule] = useState<ScheduledTask[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      const res = await fetch('/api/tasks')
      if (res.ok) {
        const data = await res.json()
        setTasks(data)
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function addTask() {
    if (!newTask.trim()) return

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: newTask,
          time: newTaskTime,
        }),
      })

      if (res.ok) {
        const task = await res.json()
        setTasks([...tasks, task])
        setNewTask('')
        setNewTaskTime('1')
        toast({
          title: 'Task added',
          description: 'Your task has been added successfully.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add task.',
        variant: 'destructive',
      })
    }
  }

  async function toggleTask(taskId: string) {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) return

      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDone: !task.isDone }),
      })

      if (res.ok) {
        setTasks(tasks.map(t => 
          t.id === taskId ? { ...t, isDone: !t.isDone } : t
        ))
      }
    } catch (error) {
      console.error('Failed to toggle task:', error)
    }
  }

  async function deleteTask(taskId: string) {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setTasks(tasks.filter(t => t.id !== taskId))
        toast({
          title: 'Task deleted',
          description: 'Your task has been removed.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete task.',
        variant: 'destructive',
      })
    }
  }

  async function generateSchedule() {
    if (tasks.filter(t => !t.isDone).length === 0) {
      toast({
        title: 'No tasks',
        description: 'Add some tasks first to generate a schedule.',
        variant: 'destructive',
      })
      return
    }

    setIsGenerating(true)
    try {
      const res = await fetch('/api/ai/generate-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tasks: tasks.filter(t => !t.isDone),
          startTime,
          endTime,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setSchedule(data.schedule)
        toast({
          title: 'Schedule generated!',
          description: 'Your AI-powered schedule is ready.',
        })
      } else {
        const error = await res.json()
        toast({
          title: 'Error',
          description: error.message || 'Failed to generate schedule.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate schedule.',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Task Scheduler</h1>
        <p className="text-muted-foreground">
          Add your tasks and let AI create the perfect daily schedule for you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tasks Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
            <CardDescription>Add tasks with estimated time in hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Task description"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <Input
                  type="number"
                  placeholder="Hours"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  className="w-20"
                  min="0.5"
                  step="0.5"
                />
                <Button onClick={addTask} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 p-3 border rounded-lg"
                  >
                    <Checkbox
                      checked={task.isDone}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <div className="flex-1">
                      <p className={task.isDone ? 'line-through text-muted-foreground' : ''}>
                        {task.description}
                      </p>
                      <p className="text-sm text-muted-foreground">{task.time} hours</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Start Time</label>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Time</label>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={generateSchedule}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Schedule...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Generate AI Schedule
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your AI-Generated Schedule</CardTitle>
            <CardDescription>Optimized daily schedule based on your tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {schedule.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No schedule generated yet.</p>
                <p className="text-sm">Add tasks and click generate to see your AI-powered schedule.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.description}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.startTime} • {item.duration} hours
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.priority === 'high'
                            ? 'destructive'
                            : item.priority === 'medium'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                    {item.subtasks && item.subtasks.length > 0 && (
                      <div className="pl-4 space-y-1">
                        {item.subtasks.map((subtask, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            • {subtask}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}