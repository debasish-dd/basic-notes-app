import React, { useState } from 'react'
import { create } from 'zustand'
import { persist } from "zustand/middleware";


export const useStore = create((set)=>({
    themeColor: true,
    updateThemeColor: (val) => set({themeColor: val})

}))

export const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],

      createTodo: payload =>
        set(s => ({
          todos: [
            { id: crypto.randomUUID(), createdAt: Date.now(), ...payload },
            ...s.todos
          ]
        })),

      deleteTodo: id =>
        set(s => ({
          todos: s.todos.filter(t => t.id !== id)
        })),

      updateTodo: (id, updates) =>
        set(s => ({
          todos: s.todos.map(t =>
            t.id === id ? { ...t, ...updates } : t
          )
        }))
    }),
    { name: 'todo-storage' }
  )
)


