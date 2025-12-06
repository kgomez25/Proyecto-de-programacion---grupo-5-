import React, { useEffect, useState } from "react";

const mockFAQ = [
  {
    id: 1,
    question: "¿Los pagos son reales?",
    answer:
      "No. Este sitio simula un flujo de compra académico. No se realiza ningún cobro real.",
  },
  {
    id: 2,
    question: "¿Cómo se seleccionan los proveedores?",
    answer:
      "Trabajamos con artesanos, productores locales y microempresas verificadas en República Dominicana.",
  },
  {
    id: 3,
    question: "¿Puedo rastrear mis pedidos?",
    answer:
      "Puedes usar la sección de Seguimiento Logístico para simular el estado de tus envíos.",
  },
  {
    id: 4,
    question: "¿Qué APIs utilizan?",
    answer:
      "Integramos Open-Meteo para clima, Frankfurter para tasas de cambio y APIs simuladas para autenticación y logística.",
  },
];

export default function FAQ() {
  const [faq, setFaq] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  // API simulada
  useEffect(() => {
    setTimeout(() => {
      setFaq(mockFAQ);
      setLoading(false);
    }, 400);
  }, []);

  // CORRECCIÓN FINAL: Añadimos paréntesis () alrededor del JSX para resolver el PARSE_ERROR
  if (loading) return (<p>Cargando preguntas frecuentes...</p>);

  return (
    <div className="faq-list">
      {faq.map((item) => (
        <div className="faq-item" key={item.id}>
          <button
            className="faq-question"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
          >
            {item.question}
            <span>{openId === item.id ? "−" : "+"}</span>
          </button>
          {openId === item.id && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}