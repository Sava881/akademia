import { useState } from "react";
import { motion } from "framer-motion";
import { lessons } from "./data/lessons";
import LessonCard from "./components/LessonCard";
import LessonModal from "./components/LessonModal";

export default function App() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <div className="app">
      <header className="hero">
        <motion.div
          className="heroContent"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="brand">РАБОЧИЙ ОБЗОР</div>
          <h1>Академия рабочих</h1>
          <p>
            Короткие практические уроки для исполнителей: безопасность,
            инструмент, работа на объекте и общение с клиентом.
          </p>

          <div className="stats">
            <div><b>{lessons.length}</b><span>уроков</span></div>
            <div><b>6</b><span>направлений</span></div>
            <div><b>100%</b><span>практика</span></div>
          </div>
        </motion.div>
      </header>

      <main className="content">
        <div className="sectionTitle">
          <h2>Обучающие карточки</h2>
          <p>Выбери урок, изучи порядок действий и частые ошибки.</p>
        </div>

        <div className="grid">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              onOpen={() => setSelectedLesson(lesson)}
            />
          ))}
        </div>
      </main>

      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
}