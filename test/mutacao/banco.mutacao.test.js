const Banco = require("../../src/banco");

// Testes criados para matar mutantes sobreviventes apontados pelo Stryker.
describe("Banco - testes de mutação", () => {
  test("uma conta nova começa com histórico vazio", () => {
    expect(new Banco("Gabriel", 100).obterHistorico()).toEqual([]);
  });

  test("é possível sacar exatamente o saldo total", () => {
    const conta = new Banco("Gabriel", 100);
    expect(conta.sacar(100)).toBe(0);
  });
});
