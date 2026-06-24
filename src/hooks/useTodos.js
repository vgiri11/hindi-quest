import { useState, useEffect } from 'react'
import { todos as todoData } from '../data/todos'

export function useTodos() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hq-todos') || '{}') }
    catch { return {} }
  })

  useEffect(() => {
    localStorage.setItem('hq-todos', JSON.stringify(checked))
  }, [checked])

  function toggle(day, id) {
    setChecked(prev => ({
      ...prev,
      [day]: { ...prev[day], [id]: !prev[day]?.[id] },
    }))
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

  return { checked, toggle, resetDay, getProgress }
}
