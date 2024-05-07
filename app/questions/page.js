"use client"
import React, { useState } from 'react'
import questionsData from "../../data/Questions"
import QuestionCarousel from '@/components/QuestionCarousel'
import Sidebar from '@/components/Sidebar'

const page = () => {
  const [questionsdata, setQuestionsdata] = useState(questionsData)
  return (
    <section className='flex'>
        {/* <Sidebar /> */}
        <QuestionCarousel />
    </section>
  )
}

export default page