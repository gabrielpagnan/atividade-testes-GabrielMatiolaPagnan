const AgendaDeContatos = require("../../src/agendaDeContatos");

// Testes criados para matar mutantes sobreviventes apontados pelo Stryker.
describe("AgendaDeContatos - testes de mutação", () => {
  let agenda;

  beforeEach(() => {
    agenda = new AgendaDeContatos();
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");
  });

  test("buscarPorNome deve retornar o contato correto, não o primeiro da lista", () => {
    expect(agenda.buscarPorNome("Bruno").telefone).toBe("2222");
  });

  test("buscarPorTelefone deve retornar o contato correto, não o primeiro da lista", () => {
    expect(agenda.buscarPorTelefone("2222").nome).toBe("Bruno");
  });

  test("removerContato deve remover apenas o contato informado", () => {
    expect(agenda.removerContato("Bruno")).toBe(true);
    expect(agenda.nomesDosContatos()).toEqual(["Ana"]);
  });

  test("removerContato de contato inexistente retorna false e não altera a agenda", () => {
    expect(agenda.removerContato("Carlos")).toBe(false);
    expect(agenda.quantidadeContatos()).toBe(2);
    expect(agenda.nomesDosContatos()).toEqual(["Ana", "Bruno"]);
  });

  test("editarTelefone de contato inexistente retorna false", () => {
    expect(agenda.editarTelefone("Carlos", "9999")).toBe(false);
  });

  test("editarEmail de contato inexistente retorna false", () => {
    expect(agenda.editarEmail("Carlos", "c@email.com")).toBe(false);
  });

  test("favoritarContato de contato inexistente retorna false", () => {
    expect(agenda.favoritarContato("Carlos")).toBe(false);
    expect(agenda.listarFavoritos()).toEqual([]);
  });

  test("desfavoritarContato de contato inexistente retorna false", () => {
    expect(agenda.desfavoritarContato("Carlos")).toBe(false);
  });

  test("possuiContato retorna false para contato inexistente", () => {
    expect(agenda.possuiContato("Carlos")).toBe(false);
  });

  test("ehFavorito retorna false para contato inexistente", () => {
    expect(agenda.ehFavorito("Carlos")).toBe(false);
  });
});
