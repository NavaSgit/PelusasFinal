import React from 'react';

/**
 * Ilustraciones vectoriales (SVG) personalizadas para cada monstruito 'Pelusa' (1 al 10).
 * Diseñadas con textura esponjosa, ojos expresivos, pestañas, cuernitos/mechones y personalidades únicas.
 */
export default function PelusaMonster({ value, size = 60 }) {
  // Configuración de colores y personalidades por valor
  switch (Number(value)) {
    case 1:
      // Pelusa 1: "Fresita Curiosa" - Ojo gigante adorable con reflejo de corazón y mechón juguetón
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="pelusa-svg" aria-label="Pelusa 1">
          <defs>
            <radialGradient id="grad1" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ff768a" />
              <stop offset="100%" stopColor="#e11d48" />
            </radialGradient>
          </defs>
          {/* Mechón peludo arriba */}
          <path d="M 50 15 Q 46 4 38 7 Q 44 14 47 22 Z" fill="#e11d48" />
          <path d="M 52 16 Q 58 3 66 8 Q 58 15 54 23 Z" fill="#ff768a" />
          {/* Cuerpo peludo con protuberancias esponjosas */}
          <path
            d="M 50 20 C 68 18 84 30 87 46 C 90 62 82 78 68 84 C 54 90 40 88 28 82 C 16 75 12 58 16 42 C 20 28 34 20 50 20 Z"
            fill="url(#grad1)"
            filter="drop-shadow(0 3px 2px rgba(190, 18, 60, 0.3))"
          />
          {/* Pelitos esponjosos exteriores */}
          <circle cx="22" cy="35" r="7" fill="#ff768a" />
          <circle cx="78" cy="35" r="7" fill="#ff768a" />
          <circle cx="83" cy="55" r="7" fill="#e11d48" />
          <circle cx="17" cy="55" r="7" fill="#e11d48" />
          <circle cx="28" cy="74" r="6" fill="#e11d48" />
          <circle cx="72" cy="74" r="6" fill="#e11d48" />
          {/* Patitas tiernas */}
          <ellipse cx="40" cy="85" rx="5" ry="3" fill="#be123c" />
          <ellipse cx="60" cy="85" rx="5" ry="3" fill="#be123c" />
          {/* Ojo gigante y expresivo */}
          <ellipse cx="50" cy="50" rx="16" ry="18" fill="#ffffff" />
          <ellipse cx="51" cy="51" rx="10" ry="11" fill="#1e1b4b" />
          <circle cx="47" cy="46" r="4.5" fill="#ffffff" />
          <circle cx="55" cy="54" r="2" fill="#ffffff" />
          {/* Mejillas sonrojadas */}
          <ellipse cx="32" cy="58" rx="4" ry="2.5" fill="#ff99ab" opacity="0.8" />
          <ellipse cx="68" cy="58" rx="4" ry="2.5" fill="#ff99ab" opacity="0.8" />
          {/* Sonrisita tierna */}
          <path d="M 46 66 Q 50 70 54 66" stroke="#4c0519" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 2:
      // Pelusa 2: "Zanahoria Risueña" - Dos orejitas peludas, ojos felices y mejillas pecosas
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="pelusa-svg" aria-label="Pelusa 2">
          <defs>
            <radialGradient id="grad2" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
          </defs>
          {/* Dos mechones / orejas */}
          <path d="M 33 28 C 28 12 18 16 26 33 Z" fill="#fb923c" />
          <path d="M 67 28 C 72 12 82 16 74 33 Z" fill="#fb923c" />
          {/* Cuerpo ovalado esponjoso */}
          <ellipse cx="50" cy="55" rx="34" ry="30" fill="url(#grad2)" />
          {/* Pompones laterales */}
          <circle cx="18" cy="54" r="7" fill="#ea580c" />
          <circle cx="82" cy="54" r="7" fill="#ea580c" />
          <circle cx="26" cy="72" r="6" fill="#c2410c" />
          <circle cx="74" cy="72" r="6" fill="#c2410c" />
          {/* Dos ojos vivos mirando hacia arriba */}
          <ellipse cx="40" cy="48" rx="9" ry="11" fill="#ffffff" />
          <ellipse cx="60" cy="48" rx="9" ry="11" fill="#ffffff" />
          <circle cx="41" cy="47" r="5.5" fill="#1f2937" />
          <circle cx="61" cy="47" r="5.5" fill="#1f2937" />
          <circle cx="39" cy="44" r="2.5" fill="#ffffff" />
          <circle cx="59" cy="44" r="2.5" fill="#ffffff" />
          {/* Sonrisa abierta con lengua */}
          <path d="M 44 63 Q 50 72 56 63 Z" fill="#7c2d12" />
          <path d="M 47 67 Q 50 71 53 67" fill="#f43f5e" />
          {/* Sonrojo pecoso */}
          <ellipse cx="28" cy="59" rx="4" ry="2" fill="#fdba74" />
          <ellipse cx="72" cy="59" rx="4" ry="2" fill="#fdba74" />
        </svg>
      );

    case 3:
      // Pelusa 3: "Solecito Travieso" - Tres picos de pelusa, ojos con pestañas y carita radiante
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="pelusa-svg" aria-label="Pelusa 3">
          <defs>
            <radialGradient id="grad3" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </radialGradient>
          </defs>
          {/* 3 crestas esponjosas en la cabeza */}
          <circle cx="36" cy="24" r="8" fill="#facc15" />
          <circle cx="50" cy="18" r="9" fill="#fde047" />
          <circle cx="64" cy="24" r="8" fill="#facc15" />
          {/* Cuerpo */}
          <circle cx="50" cy="56" r="32" fill="url(#grad3)" />
          {/* Pelitos alrededor */}
          <circle cx="20" cy="52" r="7" fill="#ca8a04" />
          <circle cx="80" cy="52" r="7" fill="#ca8a04" />
          <circle cx="28" cy="74" r="6" fill="#ca8a04" />
          <circle cx="72" cy="74" r="6" fill="#ca8a04" />
          {/* Ojos adorables brillantes */}
          <ellipse cx="39" cy="52" rx="8" ry="9" fill="#ffffff" />
          <ellipse cx="61" cy="52" rx="8" ry="9" fill="#ffffff" />
          <circle cx="40" cy="52" r="5" fill="#362207" />
          <circle cx="60" cy="52" r="5" fill="#362207" />
          <circle cx="38" cy="49" r="2.5" fill="#ffffff" />
          <circle cx="58" cy="49" r="2.5" fill="#ffffff" />
          {/* Sonrisa alegre */}
          <path d="M 43 64 Q 50 71 57 64" stroke="#422006" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Chapitas rositas */}
          <ellipse cx="28" cy="62" rx="4" ry="2.5" fill="#f43f5e" opacity="0.7" />
          <ellipse cx="72" cy="62" rx="4" ry="2.5" fill="#f43f5e" opacity="0.7" />
        </svg>
      );

    case 4:
      // Pelusa 4: "Menta Saltarina" - 4 mechones acolchonados, mirada anime pícara con colmillito
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="pelusa-svg" aria-label="Pelusa 4">
          <defs>
            <radialGradient id="grad4" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </radialGradient>
          </defs>
          {/* 4 mechones en cruz */}
          <circle cx="50" cy="18" r="9" fill="#34d399" />
          <circle cx="18" cy="52" r="9" fill="#10b981" />
          <circle cx="82" cy="52" r="9" fill="#10b981" />
          <circle cx="50" cy="84" r="7" fill="#047857" />
          {/* Cuerpo */}
          <circle cx="50" cy="52" r="30" fill="url(#grad4)" />
          {/* Ojos grandes juguetones */}
          <ellipse cx="40" cy="48" rx="8" ry="10" fill="#ffffff" />
          <ellipse cx="60" cy="48" rx="8" ry="10" fill="#ffffff" />
          <ellipse cx="41" cy="49" rx="5" ry="6" fill="#064e3b" />
          <ellipse cx="61" cy="49" rx="5" ry="6" fill="#064e3b" />
          <circle cx="39" cy="46" r="2.5" fill="#ffffff" />
          <circle cx="59" cy="46" r="2.5" fill="#ffffff" />
          {/* Sonrisita con dientito/colmillito travieso */}
          <path d="M 44 62 Q 50 67 56 62" stroke="#022c22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 52 63 L 54 66 L 56 63 Z" fill="#ffffff" />
          {/* Sonrojo verde menta suave */}
          <ellipse cx="30" cy="58" rx="4" ry="2" fill="#a7f3d0" />
          <ellipse cx="70" cy="58" rx="4" ry="2" fill="#a7f3d0" />
        </svg>
      );

    case 5:
      // Pelusa 5: "Turquesa Relajada" - Estilo estrella esponjosa con ojos achinados de felicidad
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="pelusa-svg" aria-label="Pelusa 5">
          <defs>
            <radialGradient id="grad5" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </radialGradient>
          </defs>
          {/* 5 pompones tipo estrella suave */}
          <circle cx="50" cy="18" r="9" fill="#22d3ee" />
          <circle cx="20" cy="38" r="9" fill="#06b6d4" />
          <circle cx="80" cy="38" r="9" fill="#06b6d4" />
          <circle cx="28" cy="74" r="9" fill="#0891b2" />
          <circle cx="72" cy="74" r="9" fill="#0891b2" />
          {/* Centro */}
          <circle cx="50" cy="52" r="30" fill="url(#grad5)" />
          {/* Ojos sonrientes en arco (happy eyes) */}
          <path d="M 33 48 Q 40 40 47 48" stroke="#164e63" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 53 48 Q 60 40 67 48" stroke="#164e63" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Sonrisita tierna abierta */}
          <ellipse cx="50" cy="62" rx="5" ry="4" fill="#164e63" />
          <path d="M 47 62 Q 50 65 53 62" fill="#fda4af" />
          {/* Mejillas sonrojadas */}
          <circle cx="30" cy="56" r="3.5" fill="#67e8f9" />
          <circle cx="70" cy="56" r="3.5" fill="#67e8f9" />
        </svg>
      );

    case 6:
      // Pelusa 6: "Azul Huracán" - Pelo esponjoso dinámico y mirada asombrada/animada
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="pelusa-svg" aria-label="Pelusa 6">
          <defs>
            <radialGradient id="grad6" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </radialGradient>
          </defs>
          {/* Mechones puntiagudos dinámicos */}
          <path d="M 40 22 Q 35 10 25 15 Q 32 25 36 29 Z" fill="#60a5fa" />
          <path d="M 50 18 Q 50 4 62 10 Q 56 22 52 26 Z" fill="#3b82f6" />
          <path d="M 62 22 Q 74 12 78 24 Q 68 28 62 30 Z" fill="#2563eb" />
          {/* Pompones laterales */}
          <circle cx="18" cy="48" r="8" fill="#3b82f6" />
          <circle cx="82" cy="48" r="8" fill="#3b82f6" />
          <circle cx="24" cy="70" r="7" fill="#1d4ed8" />
          <circle cx="76" cy="70" r="7" fill="#1d4ed8" />
          {/* Cuerpo */}
          <circle cx="50" cy="54" r="30" fill="url(#grad6)" />
          {/* Ojos expresivos curiosos */}
          <circle cx="39" cy="49" r="8.5" fill="#ffffff" />
          <circle cx="61" cy="49" r="8.5" fill="#ffffff" />
          <circle cx="40" cy="49" r="5" fill="#172554" />
          <circle cx="62" cy="49" r="5" fill="#172554" />
          {/* Estrellitas en los ojos */}
          <circle cx="38" cy="47" r="2.5" fill="#ffffff" />
          <circle cx="60" cy="47" r="2.5" fill="#ffffff" />
          {/* Boquita redonda de sorpresa tierna "o" */}
          <circle cx="50" cy="64" r="3.5" fill="#172554" />
          <ellipse cx="28" cy="57" rx="3.5" ry="2" fill="#93c5fd" />
          <ellipse cx="72" cy="57" rx="3.5" ry="2" fill="#93c5fd" />
        </svg>
      );

    case 7:
      // Pelusa 7: "Índigo Místico" - 7 mechones esponjosos, mirada perspicaz y simpática
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="pelusa-svg" aria-label="Pelusa 7">
          <defs>
            <radialGradient id="grad7" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </radialGradient>
          </defs>
          {/* Corona de pelitos tipo cresta */}
          <circle cx="30" cy="22" r="7" fill="#818cf8" />
          <circle cx="43" cy="16" r="8" fill="#a5b4fc" />
          <circle cx="57" cy="16" r="8" fill="#a5b4fc" />
          <circle cx="70" cy="22" r="7" fill="#818cf8" />
          {/* Pompones inferiores */}
          <circle cx="18" cy="50" r="8" fill="#4f46e5" />
          <circle cx="82" cy="50" r="8" fill="#4f46e5" />
          <circle cx="50" cy="82" r="6" fill="#3730a3" />
          {/* Cuerpo */}
          <circle cx="50" cy="52" r="30" fill="url(#grad7)" />
          {/* Ojos expresivos guiñando uno */}
          {/* Ojo izquierdo abierto */}
          <ellipse cx="38" cy="48" rx="8" ry="10" fill="#ffffff" />
          <circle cx="39" cy="48" r="5" fill="#1e1b4b" />
          <circle cx="37" cy="45" r="2.5" fill="#ffffff" />
          {/* Ojo derecho guiñando picaramente */}
          <path d="M 54 48 Q 61 40 68 49" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Sonrisa complacida */}
          <path d="M 44 62 Q 52 68 58 61" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="28" cy="57" rx="3.5" ry="2" fill="#c7d2fe" />
          <ellipse cx="72" cy="57" rx="3.5" ry="2" fill="#c7d2fe" />
        </svg>
      );

    case 8:
      // Pelusa 8: "Morita Pícara" - Forma redonda con 8 protuberancias, lengua afuera traviesa
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="pelusa-svg" aria-label="Pelusa 8">
          <defs>
            <radialGradient id="grad8" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7e22ce" />
            </radialGradient>
          </defs>
          {/* Corona de 8 bolitas de pelusa alrededor */}
          <circle cx="50" cy="18" r="8" fill="#c084fc" />
          <circle cx="73" cy="27" r="7.5" fill="#a855f7" />
          <circle cx="83" cy="50" r="8" fill="#7e22ce" />
          <circle cx="73" cy="73" r="7.5" fill="#6b21a8" />
          <circle cx="50" cy="82" r="8" fill="#581c87" />
          <circle cx="27" cy="73" r="7.5" fill="#6b21a8" />
          <circle cx="17" cy="50" r="8" fill="#7e22ce" />
          <circle cx="27" cy="27" r="7.5" fill="#a855f7" />
          {/* Cuerpo central */}
          <circle cx="50" cy="50" r="27" fill="url(#grad8)" />
          {/* Ojos traviesos */}
          <ellipse cx="38" cy="46" rx="7.5" ry="9" fill="#ffffff" />
          <ellipse cx="62" cy="46" rx="7.5" ry="9" fill="#ffffff" />
          <circle cx="39" cy="46" r="4.5" fill="#2e1065" />
          <circle cx="61" cy="46" r="4.5" fill="#2e1065" />
          <circle cx="37" cy="43" r="2" fill="#ffffff" />
          <circle cx="59" cy="43" r="2" fill="#ffffff" />
          {/* Boquita sacando la lengua :P */}
          <path d="M 44 58 Q 50 63 56 58" stroke="#2e1065" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="50" cy="64" rx="3.5" ry="4.5" fill="#f43f5e" />
          <ellipse cx="28" cy="54" rx="3.5" ry="2" fill="#e9d5ff" />
          <ellipse cx="72" cy="54" rx="3.5" ry="2" fill="#e9d5ff" />
        </svg>
      );

    case 9:
      // Pelusa 9: "Fucsia Galáctica" - Esponjosa nube fucsia con destellos de ilusión
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="pelusa-svg" aria-label="Pelusa 9">
          <defs>
            <radialGradient id="grad9" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </radialGradient>
          </defs>
          {/* Nube esponjosa con 9 curvas */}
          <circle cx="34" cy="22" r="8" fill="#f472b6" />
          <circle cx="50" cy="16" r="9" fill="#f472b6" />
          <circle cx="66" cy="22" r="8" fill="#f472b6" />
          <circle cx="82" cy="38" r="8" fill="#ec4899" />
          <circle cx="82" cy="60" r="8" fill="#db2777" />
          <circle cx="64" cy="78" r="8" fill="#be185d" />
          <circle cx="36" cy="78" r="8" fill="#be185d" />
          <circle cx="18" cy="60" r="8" fill="#db2777" />
          <circle cx="18" cy="38" r="8" fill="#ec4899" />
          {/* Cuerpo */}
          <circle cx="50" cy="50" r="29" fill="url(#grad9)" />
          {/* Ojos brillantes tipo anime con estrellas */}
          <ellipse cx="38" cy="47" rx="8" ry="10" fill="#ffffff" />
          <ellipse cx="62" cy="47" rx="8" ry="10" fill="#ffffff" />
          <circle cx="39" cy="47" r="5" fill="#500724" />
          <circle cx="61" cy="47" r="5" fill="#500724" />
          {/* Reflejos de brillo */}
          <circle cx="37" cy="44" r="2.5" fill="#ffffff" />
          <circle cx="59" cy="44" r="2.5" fill="#ffffff" />
          <circle cx="41" cy="50" r="1.5" fill="#ffffff" />
          <circle cx="63" cy="50" r="1.5" fill="#ffffff" />
          {/* Sonrisa sonrojada tierna */}
          <path d="M 43 61 Q 50 67 57 61" stroke="#500724" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="28" cy="57" rx="4" ry="2.5" fill="#fbcfe8" />
          <ellipse cx="72" cy="57" rx="4" ry="2.5" fill="#fbcfe8" />
        </svg>
      );

    case 10:
    default:
      // Pelusa 10: "Reina Pelusa Máxima" - Corona dorada festiva, ojitos de emoción suprema y estrellas
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="pelusa-svg" aria-label="Pelusa 10">
          <defs>
            <radialGradient id="grad10" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </radialGradient>
          </defs>
          {/* Corona Dorada brillante encima */}
          <path
            d="M 36 24 L 40 10 L 50 18 L 60 10 L 64 24 Z"
            fill="#fbbf24"
            stroke="#d97706"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="10" r="2" fill="#ef4444" />
          <circle cx="50" cy="17" r="2.5" fill="#3b82f6" />
          <circle cx="60" cy="10" r="2" fill="#10b981" />
          {/* Nube esponjosa de 10 pompones */}
          <circle cx="28" cy="30" r="8" fill="#fb7185" />
          <circle cx="72" cy="30" r="8" fill="#fb7185" />
          <circle cx="18" cy="46" r="8" fill="#f43f5e" />
          <circle cx="82" cy="46" r="8" fill="#f43f5e" />
          <circle cx="18" cy="64" r="8" fill="#e11d48" />
          <circle cx="82" cy="64" r="8" fill="#e11d48" />
          <circle cx="28" cy="78" r="7.5" fill="#be123c" />
          <circle cx="72" cy="78" r="7.5" fill="#be123c" />
          <circle cx="42" cy="84" r="7" fill="#9f1239" />
          <circle cx="58" cy="84" r="7" fill="#9f1239" />
          {/* Cuerpo */}
          <circle cx="50" cy="54" r="29" fill="url(#grad10)" />
          {/* Ojos radiantes de la reina Pelusa */}
          <ellipse cx="38" cy="50" rx="8" ry="10" fill="#ffffff" />
          <ellipse cx="62" cy="50" rx="8" ry="10" fill="#ffffff" />
          <circle cx="39" cy="50" r="5" fill="#4c0519" />
          <circle cx="61" cy="50" r="5" fill="#4c0519" />
          {/* Brillos de ojos estrella */}
          <circle cx="36" cy="46" r="2.8" fill="#ffffff" />
          <circle cx="58" cy="46" r="2.8" fill="#ffffff" />
          <circle cx="41" cy="53" r="1.5" fill="#ffffff" />
          <circle cx="63" cy="53" r="1.5" fill="#ffffff" />
          {/* Sonrisa majestuosa y tierna */}
          <path d="M 43 64 Q 50 71 57 64" stroke="#4c0519" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Mejillas con sonrojo dorado */}
          <ellipse cx="28" cy="60" rx="4" ry="2.5" fill="#fecdd3" />
          <ellipse cx="72" cy="60" rx="4" ry="2.5" fill="#fecdd3" />
        </svg>
      );
  }
}
