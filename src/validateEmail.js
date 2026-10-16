// Validación de email (fix issue #4).
// Reglas:
// - Parte local: caracteres permitidos por RFC 5322 (sin comillas), sin puntos
//   al inicio/fin ni consecutivos, máximo 64 caracteres.
// - Dominio: etiquetas alfanuméricas (guiones permitidos en el medio) separadas
//   por un único punto, sin empezar con punto (rechaza "usuario@.com").
// - TLD: solo letras, mínimo 2 caracteres.
// - Largo total máximo 254 caracteres y sin espacios.

const LOCAL_PART = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN_LABEL = /^[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;
const TLD = /^[A-Za-z]{2,63}$/;

function validateEmail(email) {
  if (typeof email !== 'string') return false;
  if (email.length > 254 || /\s/.test(email)) return false;

  const at = email.lastIndexOf('@');
  if (at <= 0 || at !== email.indexOf('@')) return false;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);

  if (local.length > 64 || !LOCAL_PART.test(local)) return false;

  const labels = domain.split('.');
  if (labels.length < 2) return false;
  if (!labels.every((label) => DOMAIN_LABEL.test(label))) return false;

  return TLD.test(labels[labels.length - 1]);
}

module.exports = { validateEmail };
