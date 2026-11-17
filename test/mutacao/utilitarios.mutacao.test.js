const Utilitarios = require("../../src/utilitarios");

// Testes criados para matar mutantes sobreviventes apontados pelo Stryker.
describe("Utilitarios - testes de mutação", () => {
  const u = new Utilitarios();

  afterEach(() => jest.restoreAllMocks());

  test("gerarNumeroAleatorio multiplica Math.random pelo máximo", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    expect(u.gerarNumeroAleatorio(10)).toBe(5);
  });

  test("ehNumero retorna false para string numérica e para NaN", () => {
    expect(u.ehNumero("5")).toBe(false);
    expect(u.ehNumero(NaN)).toBe(false);
  });

  test("ehPalindromo retorna false para palavra que não é palíndromo", () => {
    expect(u.ehPalindromo("hello")).toBe(false);
  });

  test("ehPalindromo ignora pontuação e underscore", () => {
    expect(u.ehPalindromo("A_r!a")).toBe(true);
  });
});
