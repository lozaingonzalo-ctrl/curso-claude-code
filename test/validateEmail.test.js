const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateEmail } = require('../src/validateEmail');

const validos = [
  'usuario@dominio.com',
  'nombre.apellido@sub.dominio.com.ar',
  'user+tag@dominio.io',
  'a_b-c@mi-dominio.org',
];

const invalidos = [
  ['usuario@.com', 'dominio que empieza con punto'],
  ['usuario@com', 'falta el TLD'],
  ['usuario@dominio..com', 'puntos consecutivos en el dominio'],
  ['@dominio.com', 'falta la parte local'],
  ['usuario@dominio.c', 'TLD de 1 carácter'],
  ['usuario @dominio.com', 'contiene espacios'],
  ['usuario@dominio.com.', 'dominio que termina con punto'],
  ['.usuario@dominio.com', 'parte local que empieza con punto'],
  ['usu..ario@dominio.com', 'puntos consecutivos en la parte local'],
  ['usuario@@dominio.com', 'doble arroba'],
  ['usuario@-dominio.com', 'etiqueta que empieza con guion'],
  ['usuario@dominio.123', 'TLD numérico'],
  ['', 'cadena vacía'],
];

for (const email of validos) {
  test(`acepta ${email}`, () => {
    assert.equal(validateEmail(email), true);
  });
}

for (const [email, motivo] of invalidos) {
  test(`rechaza "${email}" (${motivo})`, () => {
    assert.equal(validateEmail(email), false);
  });
}

test('rechaza valores que no son string', () => {
  assert.equal(validateEmail(null), false);
  assert.equal(validateEmail(undefined), false);
  assert.equal(validateEmail(123), false);
});
