import React, { useEffect, useState } from "react";

const mockFAQ = [
  // ... (Tu array mockFAQ se mantiene igual)
];

// ⬅️ ¡CORRECCIÓN FINAL! Cambiamos a función flecha para evitar el error de parseo en Actions
const FAQ = () => {
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

  // La sintaxis de retorno condicional ahora es segura
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

export default FAQ; // Exportamos el componente de la manera correcta