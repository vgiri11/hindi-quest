import { useState, useEffect } from 'react'

export function useSetup() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hq-setup') || '{}') }
    catch { return {} }
  })

  useEffect(() => {
    localStorage.setItem('hq-setup', JSON.stringify(checked))
  }, [checked])

  function toggle(stepId, itemId) {
    setChecked(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], [itemId]: !prev[stepId]?.[itemId] },
    }))
  }

  function getStepProgress(step) {
    const done = step.items.filter(item => checked[step.id]?.[item.id]).length
    return { done, total: step.items.length }
  }

  function isStepComplete(step) {
    const { done, total } = getStepProgress(step)
    return total > 0 && done === total
  }

  return { checked, toggle, getStepProgress, isStepComplete }
}
