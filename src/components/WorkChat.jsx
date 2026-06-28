import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const workKeywords = [
  "работ", "объект", "клиент", "заказчик", "мастер", "бригадир",
  "склад", "переезд", "груз", "фура", "газель", "мебель", "короб",
  "бетон", "болгар", "шуруп", "дрель", "перфоратор", "триммер",
  "трава", "копать", "лопата", "песок", "щебень", "земля", "тачка",
  "демонтаж", "молоток", "отбой", "плитка", "мусор", "уборка",
  "безопас", "одежда", "форма", "гипсокартон", "холодильник",
  "сейф", "строп", "лестниц", "снег", "жара", "поддон", "рохля"
];

function normalize(text) {
  return text.toLowerCase().replace(/[.,!?;:()]/g, " ");
}

function findBestLesson(question, lessons) {
  const words = normalize(question)
    .split(" ")
    .filter((word) => word.length > 3);

  let bestLesson = null;
  let bestScore = 0;

  lessons.forEach((lesson) => {
    const text = normalize(
      `${lesson.title} ${lesson.category} ${lesson.description} ${lesson.steps.join(" ")} ${lesson.mistakes.join(" ")}`
    );

    let score = 0;

    words.forEach((word) => {
      if (text.includes(word)) score += 1;
      if (normalize(lesson.title).includes(word)) score += 3;
      if (normalize(lesson.category).includes(word)) score += 2;
    });

    if (score > bestScore) {
      bestScore = score;
      bestLesson = lesson;
    }
  });

  return bestScore > 0 ? bestLesson : null;
}

function buildAnswer(question, lessons) {
  const q = normalize(question);

  const isWorkQuestion = workKeywords.some((word) => q.includes(word));

  if (!isWorkQuestion) {
    return "Я отвечаю только на рабочие вопросы: грузчики, разнорабочие, склад, переезды, инструмент, демонтаж, уборка, безопасность, клиент и работа на объекте.";
  }

  const foundLesson = findBestLesson(question, lessons);

  if (!foundLesson) {
    return `По рабочей ситуации действуй так:

1. Сначала уточни задачу у ответственного.
2. Осмотри место работы и проходы.
3. Проверь инструмент, одежду и безопасность.
4. Не делай наугад, если есть риск повредить имущество.
5. Если задача непонятная — остановись и переспроси.

Главное правило: лучше уточнить один раз, чем испортить работу или получить травму.`;
  }

  return `Разберём по теме: "${foundLesson.title}".

Что важно:
${foundLesson.description}

Как действовать:
1. ${foundLesson.steps[0]}
2. ${foundLesson.steps[1]}
3. ${foundLesson.steps[2]}
4. ${foundLesson.steps[3]}
5. ${foundLesson.steps[4]}
6. ${foundLesson.steps[5]}

Чего нельзя делать:
- ${foundLesson.mistakes[0]}
- ${foundLesson.mistakes[1]}
- ${foundLesson.mistakes[2]}

Короткий совет:
Работай спокойно, сначала проверь место и задачу. Если есть риск для здоровья, груза, стен, мебели или инструмента — остановись и уточни у ответственного.`;
}

export default function WorkChat({ lessons, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Задай вопрос по работе. Например: как разгружать фуру, как работать с болгаркой, что делать если клиент спорит, как носить мебель или как безопасно работать на объекте."
    }
  ]);

  const [input, setInput] = useState("");
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;

    const userQuestion = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userQuestion },
      { role: "assistant", text: buildAnswer(userQuestion, lessons) }
    ]);

    setInput("");
  }

  return (
    <div className="chatOverlay">
      <motion.div
        className="chatWindow"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <div className="chatHeader">
          <div>
            <b>Помощник по работе</b>
            <span>Отвечает только по рабочим вопросам</span>
          </div>

          <button onClick={onClose}>Закрыть</button>
        </div>

        <div className="chatMessages" ref={messagesRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chatMessage ${msg.role === "user" ? "chatUser" : "chatAssistant"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chatInputBox">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напиши вопрос по работе..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button onClick={sendMessage}>Отправить</button>
        </div>
      </motion.div>
    </div>
  );
}