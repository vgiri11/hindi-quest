import { useState, useEffect } from 'react'
import { todos as todoData } from '../data/todos'

export function useTodos() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hq-todos') || '{}') }
    catch { return {} }
  })

  const [studiedDates, setStudiedDates] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hq-todo-dates') || '[]') }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('hq-todos', JSON.stringify(checked))
  }, [checked])

  useEffect(() => {
    localStorage.setItem('hq-todo-dates', JSON.stringify(studiedDates))
  }, [studiedDates])

  function toggle(day, id) {
    const isCurrentlyChecked = !!checked[day]?.[id]
    setChecked(prev => ({
      ...prev,
      [day]: { ...prev[day], [id]: !isCurrentlyChecked },
    }))
    if (!isCurrentlyChecked) {
      const today = new Date().toISOString().split('T')[0]
      setStudiedDates(prev => prev.includes(today) ? prev : [...prev, today])
    }
  }

  function resetDay(day) {
    setChecked(prev => ({ ...prev, [day]: {} }))
  }

  function getProgress(day) {
    const items = todoData[day] || []
    if (!items.length) return 0
    const done = items.filter(item => checked[day]?.[item.id]).length
    return Math.round((done / items.length) * 100)
  }

  return { checked, toggle, resetDay, getProgress, studiedDates }
}
