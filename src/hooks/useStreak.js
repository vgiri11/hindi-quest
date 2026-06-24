import { useState, useEffect } from 'react'

export function useStreak() {
  const [completedDays, setCompletedDays] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hq-streak') || '[]') }
    catch { return [] }
  })

  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hq-achievements') || '[]') }
    catch { return [] }
  })

  const [skills, setSkills] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hq-skills') || '{}') }
    catch { return {} }
  })

  useEffect(() => { localStorage.setItem('hq-streak', JSON.stringify(completedDays)) }, [completedDays])
  useEffect(() => { localStorage.setItem('hq-achievements', JSON.stringify(unlockedAchievements)) }, [unlockedAchievements])
  useEffect(() => { localStorage.setItem('hq-skills', JSON.stringify(skills)) }, [skills])

  function toggleDay(dateStr) {
    setCompletedDays(prev =>
      prev.includes(dateStr) ? prev.filter(d => d !== dateStr) : [...prev, dateStr]
    )
  }

  function toggleAchievement(id) {
    setUnlockedAchievements(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  function setSkill(name, value) {
    setSkills(prev => ({ ...prev, [name]: Math.max(0, Math.min(100, value)) }))
  }

  function getCurrentStreak() {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      if (completedDays.includes(dateStr)) streak++
      else break
    }
    return streak
  }

  return { completedDays, toggleDay, getCurrentStreak, unlockedAchievements, toggleAchievement, skills, setSkill }
}
