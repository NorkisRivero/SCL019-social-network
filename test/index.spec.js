// importamos la funcion que vamos a testear
import { home } from '../src/components/home.js';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof home()).toBe('function');
  });
});
