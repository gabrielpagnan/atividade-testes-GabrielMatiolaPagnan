const ContaBancaria = require("../../src/contaBancaria");

const criarConta = (dados = {}) =>
  new ContaBancaria({
    id: 1,
    titular: "Gabriel",
    saldo: 100,
    limite: 50,
    status: "ativa",
    ...dados,
  });

// Testes criados para matar mutantes sobreviventes apontados pelo Stryker.
describe("ContaBancaria - testes de mutação", () => {
  test("estaAtiva retorna false quando a conta está bloqueada", () => {
    expect(criarConta({ status: "bloqueada" }).estaAtiva()).toBe(false);
  });

  test("sacar exatamente o saldo disponível (saldo + limite) é permitido", () => {
    const conta = criarConta();
    expect(conta.sacar(150)).toBe(true);
    expect(conta.obterSaldo()).toBe(-50);
  });

  describe("podeSacar (valores de fronteira)", () => {
    test("não pode sacar zero", () => {
      expect(criarConta().podeSacar(0)).toBe(false);
    });

    test("pode sacar exatamente o saldo disponível", () => {
      expect(criarConta().podeSacar(150)).toBe(true);
    });

    test("não pode sacar acima do saldo disponível", () => {
      expect(criarConta().podeSacar(151)).toBe(false);
    });
  });

  test("ajustarLimite aceita limite zero", () => {
    const conta = criarConta();
    expect(conta.ajustarLimite(0)).toBe(true);
    expect(conta.obterLimite()).toBe(0);
  });

  describe("saldoNegativo", () => {
    test("saldo zero não é negativo", () => {
      expect(criarConta({ saldo: 0 }).saldoNegativo()).toBe(false);
    });

    test("saldo positivo não é negativo", () => {
      expect(criarConta({ saldo: 10 }).saldoNegativo()).toBe(false);
    });
  });

  describe("transferir (ramos defensivos)", () => {
    test("não chama sacar quando podeSacar retorna false", () => {
      const origem = criarConta();
      const destino = criarConta({ id: 2, saldo: 0 });
      jest.spyOn(origem, "podeSacar").mockReturnValue(false);
      const sacar = jest.spyOn(origem, "sacar");

      expect(origem.transferir(10, destino)).toBe(false);
      expect(sacar).not.toHaveBeenCalled();
      expect(destino.obterSaldo()).toBe(0);
    });

    test("retorna false e não deposita quando o saque falha", () => {
      const origem = criarConta();
      const destino = criarConta({ id: 2, saldo: 0 });
      jest.spyOn(origem, "sacar").mockReturnValue(false);

      expect(origem.transferir(10, destino)).toBe(false);
      expect(destino.obterSaldo()).toBe(0);
    });
  });

  describe("validarConta", () => {
    test("conta sem titular é inválida", () => {
      expect(criarConta({ titular: "" }).validarConta()).toBe(false);
    });

    test("conta com saldo não numérico é inválida", () => {
      expect(criarConta({ saldo: "100" }).validarConta()).toBe(false);
    });

    test("conta com limite negativo é inválida", () => {
      expect(criarConta({ limite: -1 }).validarConta()).toBe(false);
    });

    test("conta com limite zero é válida", () => {
      expect(criarConta({ limite: 0 }).validarConta()).toBe(true);
    });

    test.each(["ativa", "bloqueada", "encerrada"])(
      "conta com status '%s' é válida",
      (status) => {
        expect(criarConta({ status }).validarConta()).toBe(true);
      },
    );

    test("conta com status desconhecido é inválida", () => {
      expect(criarConta({ status: "" }).validarConta()).toBe(false);
    });
  });
});
