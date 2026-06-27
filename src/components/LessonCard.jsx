import { motion } from "framer-motion";

export default function LessonCard({ lesson, index, onOpen }) {
  return (
    <motion.div
      className="lessonCard"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.03, rotate: -1 }}
      onClick={onOpen}
    >
      <div className="cardTop">
        <span>{lesson.category}</span>
        <small>{lesson.time}</small>
      </div>

      <h3>{lesson.title}</h3>
      <p>{lesson.description}</p>

      <div className="cardBottom">
        <span>{lesson.level}</span>
        <button>Изучить</button>
      </div>
    </motion.div>
  );
}