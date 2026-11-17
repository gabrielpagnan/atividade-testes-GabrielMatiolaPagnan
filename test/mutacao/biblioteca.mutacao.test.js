const Biblioteca = require("../../src/biblioteca");

// Testes criados para matar mutantes sobreviventes apontados pelo Stryker.
describe("Biblioteca - testes de mutação", () => {
  let biblioteca;

  beforeEach(() => {
    biblioteca = new Biblioteca();
    biblioteca.adicionarLivro("Dom Casmurro", "Machado de Assis", "Romance", 1899);
    biblioteca.adicionarLivro("O Hobbit", "J. R. R. Tolkien", "Fantasia", 1937);
  });

  test("buscarPorAutor retorna o livro correto, não o primeiro da lista", () => {
    expect(biblioteca.buscarPorAutor("J. R. R. Tolkien").titulo).toBe("O Hobbit");
  });

  test("removerLivro remove apenas o livro informado", () => {
    expect(biblioteca.removerLivro("O Hobbit")).toBe(true);
    expect(biblioteca.titulosDosLivros()).toEqual(["Dom Casmurro"]);
  });

  test("possuiLivro retorna false para livro inexistente", () => {
    expect(biblioteca.possuiLivro("Duna")).toBe(false);
  });
});
