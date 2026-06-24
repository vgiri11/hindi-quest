import { useState, useEffect } from 'react'

export function useStreak() {
  const [manualDays, setManualDays] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hq-streak') || '[]') }
    catch { return [] }
  })

  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hq-achievements') || '[]') }
    catch { return [] }
  })

  const [skills, setSkillState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hq-skills') || '{}') }
    catch { return {} }
  })

  useEffect(() => { localStorage.setItem('hq-streak', JSON.stringify(manualDays)) }, [manualDays])
  useEffect(() => { localStorage.setItem('hq-achievements', JSON.stringify(unlockedAchievements)) }, [unlockedAchievements])
  useEffect(() => { localStorage.setItem('hq-skills', JSON.stringify(skills)) }, [skills])

  function toggleManualDay(dateStr) {
    setManualDays(prev =>
      prev.includes(dateStr) ? prev.filter(d => d !== dateStr) : [...prev, dateStr]
    )
  }

  function toggleAchievement(id) {
    setUnlockedAchievements(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  function setSkill(name, value) {
    setSkillState(prev => ({ ...prev, [name]: Math.max(0, Math.min(100, value)) }))
  }

  function getCurrentStreak(allDates) {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      if (allDates.includes(d.toISOString().split('T')[0])) streak++
      else break
    }
    return streak
  }

  return { manualDays, toggleManualDay, getCurrentStreak, unlockedAchievements, toggleAchievement, skills, setSkill }
}
