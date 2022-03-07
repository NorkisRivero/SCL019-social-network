// importamos la funcion que vamos a testear
import { router } from '../src/lib/router.js';

describe(router, () => {
  it('debería ser una función', () => {
    expect(typeof router()).toBe('function');
  });
});
