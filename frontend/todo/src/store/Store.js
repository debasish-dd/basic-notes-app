import React, { useState } from 'react'
import { create } from 'zustand'
import { persist } from "zustand/middleware";


export const useStore = create((set)=>({
    themeColor: true,
    updateThemeColor: (val) => set({themeColor: val}),
    isLogin: false,
    updateIsLogin: (val) => set({isLogin: val})

}))

export const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      createTodo: payload =>
        set(s => ({
          todos: [{ createdAt: Date.now(), ...payload }, ...s.todos],
        })),
        updateTodo: payload => set(s=>({
            todos: [...payload]
        }))
    }),
    { name: 'todo-storage' } 
  )
);

