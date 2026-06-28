import { useState } from "react";
import { motion } from "framer-motion";
import { lessons } from "./data/lessons";
import LessonCard from "./components/LessonCard";
import LessonModal from "./components/LessonModal";
import WorkChat from "./components/WorkChat";

export default function App() {
const [selectedLesson, setSelectedLesson] = useState(null);
const [learnedLessons, setLearnedLessons] = useState([]);
const [isChatOpen, setIsChatOpen] = useState(false);

function markLessonAsLearned(id) {
  if (!learnedLessons.includes(id)) {
    setLearnedLessons([...learnedLessons, id]);
  }
}

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

<button className="chatOpenBtn heroChatBtn" onClick={() => setIsChatOpen(true)}>
  Спросить помощника
</button>

        </motion.div>
      </header>

      <main className="content">
<div className="sectionTitle">
  <div>
    <h2>Обучающие карточки</h2>
    <p>Выбери урок, изучи порядок действий и частые ошибки.</p>
  </div>
</div>

        <div className="grid">
          {lessons.map((lesson, index) => (
<LessonCard
  key={lesson.id}
  lesson={lesson}
  index={index}
  isLearned={learnedLessons.includes(lesson.id)}
  onOpen={() => setSelectedLesson(lesson)}
/>
          ))}
        </div>
      </main>

      {selectedLesson && (
<LessonModal
  lesson={selectedLesson}
  isLearned={learnedLessons.includes(selectedLesson.id)}
  onLearned={() => markLessonAsLearned(selectedLesson.id)}
  onClose={() => setSelectedLesson(null)}
/>
      )}

      {isChatOpen && (
        <WorkChat
          lessons={lessons}
          onClose={() => setIsChatOpen(false)}
        />
      )}

    </div>
  );
}