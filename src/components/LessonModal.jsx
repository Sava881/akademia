import { motion } from "framer-motion";

export default function LessonModal({ lesson, onClose }) {
  return (
    <div className="modalOverlay" onClick={onClose}>
      <motion.div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        <button className="closeBtn" onClick={onClose}>
          Закрыть
        </button>

        <span className="modalCategory">{lesson.category}</span>
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

        <button className="mainBtn">Отметить как изучено</button>
      </motion.div>
    </div>
  );
}