"use client"
import React, { useState } from 'react'
import questionsData from "../../data/Questions"
import QuestionCarousel from '@/components/QuestionCarousel'

const page = () => {
  const [questionsdata, setQuestionsdata] = useState(questionsData)
  return (
    <section>
<QuestionCarousel/>
    </section>
  )
}

export default page