import { useState } from "react";
import { motion } from "framer-motion";

export default function LessonModal({ lesson, isLearned, onLearned, onClose }) {
  const [showConfetti, setShowConfetti] = useState(false);

  function handleLearned() {
    onLearned();
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 1600);
  }

  return (
    <div className="modalOverlay" onClick={onClose}>
      <motion.div
        className={`modal ${isLearned ? "modalLearned" : ""}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        {showConfetti && (
          <div className="confettiBox">
            {Array.from({ length: 24 }).map((_, index) => (
              <span key={index} className={`confetti confetti-${index + 1}`} />
            ))}
          </div>
        )}

        <div className="modalHeader">
          <div>
            <span className="modalCategory">{lesson.category}</span>
            {isLearned && <span className="modalDone">Изучено</span>}
          </div>

          <button className="closeBtn" onClick={onClose}>
            Закрыть
          </button>
        </div>

        <div className="modalBody">
          <h2>{lesson.title}</h2>
          <p>{lesson.description}</p>

          <h3>Порядок действий</h3>
          <ol>
            {lesson.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <h3>Частые ошибки</h3>
          <ul>
            {lesson.mistakes.map((mistake, index) => (
              <li key={index}>{mistake}</li>
            ))}
          </ul>
        </div>

        <div className="modalFooter">
          <button
            className={`mainBtn ${isLearned ? "mainBtnLearned" : ""}`}
            onClick={handleLearned}
          >
            {isLearned ? "Урок изучен" : "Отметить как изучено"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}