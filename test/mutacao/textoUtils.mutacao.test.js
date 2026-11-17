const TextoUtils = require("../../src/textoUtils");

// Testes criados para matar mutantes sobreviventes apontados pelo Stryker.
describe("TextoUtils - testes de mutação", () => {
  const t = new TextoUtils();

  test("capitalizar preserva espaços duplos (palavras vazias)", () => {
    expect(t.capitalizar("olá  mundo")).toBe("Olá  Mundo");
  });

  describe("contarOcorrencias", () => {
    test("conta ocorrências de uma substring", () => {
      expect(t.contarOcorrencias("banana", "an")).toBe(2);
    });

    test("retorna 0 quando a substring não aparece", () => {
      expect(t.contarOcorrencias("banana", "x")).toBe(0);
    });

    test("retorna 0 quando a substring é vazia", () => {
      expect(t.contarOcorrencias("banana", "")).toBe(0);
    });
  });

  test("paraSlug remove acentos e junta vários espaços num único hífen", () => {
    expect(t.paraSlug("Olá   Mundo")).toBe("ola-mundo");
  });

  test("paraSlug remove espaços do início e do fim (sem hífens nas pontas)", () => {
    expect(t.paraSlug("  Olá Mundo  ")).toBe("ola-mundo");
  });

  describe("truncar", () => {
    test("tamanho zero não lança erro", () => {
      expect(t.truncar("abc", 0)).toBe("...");
    });

    test("texto com tamanho exatamente igual ao limite não é truncado", () => {
      expect(t.truncar("abc", 3)).toBe("abc");
    });

    test("tamanho negativo lança erro com a mensagem correta", () => {
      expect(() => t.truncar("abc", -1)).toThrow("O tamanho não pode ser negativo");
    });
  });

  test("contarPalavras de texto vazio retorna 0", () => {
    expect(t.contarPalavras("")).toBe(0);
    expect(t.contarPalavras("   ")).toBe(0);
  });

  test("somenteLetras retorna false quando há números no início", () => {
    expect(t.somenteLetras("123abc")).toBe(false);
  });

  test("substituirTudo com alvo vazio lança erro com a mensagem correta", () => {
    expect(() => t.substituirTudo("abc", "", "x")).toThrow("O alvo não pode ser vazio");
  });
});
