# Testes de Mutação com Stryker Mutator

Atividade de **Testes de Mutação** feita sobre o primeiro trabalho de testes unitários
([prova01-unit-test-GabrielMPagnan](https://github.com/gabrielpagnan/prova01-unit-test-GabrielMPagnan)),
usando a ferramenta [Stryker Mutator](https://stryker-mutator.io/).

**Aluno:** Gabriel Matiola Pagnan

## O que é teste de mutação?

A cobertura de código só diz **quais linhas foram executadas** pelos testes, mas não diz se os testes
realmente **verificam** o comportamento delas. O teste de mutação responde essa pergunta:

1. O Stryker cria **mutantes**: cópias do código com uma pequena alteração
   (ex.: troca `>` por `>=`, `true` por `false`, apaga um `.trim()`, esvazia uma string).
2. Para cada mutante, roda a suíte de testes.
3. Se algum teste **falha**, o mutante foi **morto** ✅ (o teste percebeu a alteração).
   Se todos os testes **passam**, o mutante **sobreviveu** ❌ (existe um "buraco" nos testes).

```
Mutation score = mutantes mortos / total de mutantes válidos
```

## Como executar

Pré-requisito: Node.js 20 ou superior.

```bash
npm install          # instala as dependências
npm test             # roda os testes unitários (Jest)
npm run coverage     # roda os testes com cobertura
npm run mutation     # roda os testes de mutação (Stryker)
```

O relatório HTML do Stryker é gerado em `reports/mutation/mutation.html`.

## Configuração do Stryker

Arquivo [`stryker.config.json`](stryker.config.json):

| Opção              | Valor                     | Por quê |
|--------------------|---------------------------|---------|
| `testRunner`       | `jest`                    | Mesma ferramenta de testes da Prova 01 |
| `coverageAnalysis` | `perTest`                 | Só roda os testes que cobrem cada mutante (mais rápido) |
| `mutate`           | `src/**/*.js`             | Muta apenas o código de produção |
| `reporters`        | html, clear-text, progress, json | Relatório visual + resumo no terminal |
| `thresholds`       | high 90, low 75, break 70 | O build falha se o score cair abaixo de 70% |

## Resultados

### Antes (apenas os testes da Prova 01)

Mesmo com boa cobertura, o Stryker encontrou **69 mutantes vivos** (54 sobreviventes + 15 sem cobertura).

| Arquivo             | Score  | Mortos | Sobreviventes | Sem cobertura |
|---------------------|-------:|-------:|--------------:|--------------:|
| agendaDeContatos.js | 80,95% | 68 | 10 | 6 |
| anagram.js          | 84,62% | 11 | 2  | 0 |
| banco.js            | 96,08% | 49 | 2  | 0 |
| biblioteca.js       | 95,60% | 87 | 4  | 0 |
| calculator.js       | 100%   | 9  | 0  | 0 |
| carro.js            | 90,00% | 9  | 1  | 0 |
| cnh.js              | 100%   | 6  | 0  | 0 |
| contaBancaria.js    | 85,51% | 118 | 16 | 4 |
| lista.js            | 100%   | 13 | 0  | 0 |
| pessoa.js           | 100%   | 4  | 0  | 0 |
| textoUtils.js       | 78,95% | 60 | 11 | 5 |
| userService.js      | 100%   | 7  | 0  | 0 |
| utilitarios.js      | 90,24% | 74 | 8  | 0 |
| **Total**           | **88,18%** | **515** | **54** | **15** |

### Depois (com os testes de mutação em `test/mutacao/`)

| Arquivo             | Score  | Mortos | Sobreviventes | Sem cobertura |
|---------------------|-------:|-------:|--------------:|--------------:|
| agendaDeContatos.js | 100%   | 84  | 0 | 0 |
| anagram.js          | 84,62% | 11  | 2 | 0 |
| banco.js            | 100%   | 51  | 0 | 0 |
| biblioteca.js       | 98,90% | 90  | 1 | 0 |
| calculator.js       | 100%   | 9   | 0 | 0 |
| carro.js            | 90,00% | 9   | 1 | 0 |
| cnh.js              | 100%   | 6   | 0 | 0 |
| contaBancaria.js    | 100%   | 138 | 0 | 0 |
| lista.js            | 100%   | 13  | 0 | 0 |
| pessoa.js           | 100%   | 4   | 0 | 0 |
| textoUtils.js       | 97,37% | 74  | 2 | 0 |
| userService.js      | 100%   | 7   | 0 | 0 |
| utilitarios.js      | 98,78% | 81  | 1 | 0 |
| **Total**           | **98,80%** | **577** | **7** | **0** |

**Mutation score: 88,18% → 98,80%.** Os 7 mutantes que restaram são **equivalentes** (explicado abaixo).

Os relatórios HTML completos estão em [`docs/relatorio-antes.html`](docs/relatorio-antes.html) e
[`docs/relatorio-depois.html`](docs/relatorio-depois.html) (baixe e abra no navegador).

## Exemplos de mutantes mortos

Os testes novos ficam em [`test/mutacao/`](test/mutacao) e cada um foi escrito para matar um mutante específico.
Os testes originais da Prova 01 não foram alterados.

| Código original | Mutante | Por que sobrevivia | Teste que matou |
|-----------------|---------|--------------------|-----------------|
| `contaBancaria.js`: `valor <= saldoDisponivel` | `valor < saldoDisponivel` | Nenhum teste sacava **exatamente** o valor disponível | `podeSacar(150)` com saldo 100 + limite 50 → `true` |
| `contaBancaria.js`: `if (this.conta.limite < 0)` | `<= 0` | Não havia teste com limite **zero** | `validarConta()` com limite 0 → `true` |
| `contaBancaria.js`: `["ativa", "bloqueada", "encerrada"]` | `""` no lugar de `"bloqueada"` | Só era testado status `"ativa"` | `test.each` com os três status válidos |
| `agendaDeContatos.js`: `if (posicao === -1) return false` | `if (false)` | Sem esse `if`, `splice(-1, 1)` **apaga o último contato** e ninguém verificava | remover inexistente → `false` e agenda continua com 2 contatos |
| `agendaDeContatos.js`: `contato.nome === nome` | `true` | Os testes buscavam sempre o **primeiro** contato da lista | `buscarPorNome("Bruno")` (o segundo) |
| `banco.js`: `this.transacoes = []` | `["Stryker was here"]` | Nenhum teste olhava o histórico de uma conta nova | `obterHistorico()` → `[]` |
| `textoUtils.js`: `if (tamanho < 0)` | `<= 0` | Não havia teste com tamanho zero | `truncar("abc", 0)` → `"..."` |
| `textoUtils.js`: `throw new Error("O tamanho não pode ser negativo")` | `new Error("")` | O teste só verificava *que* lançava erro, não a mensagem | `toThrow("O tamanho não pode ser negativo")` |
| `textoUtils.js`: `contarOcorrencias` inteiro | sem cobertura | O método não tinha nenhum teste | 3 testes novos |
| `utilitarios.js`: `Math.random() * max` | `Math.random() / max` | Resultado aleatório não era verificado | `jest.spyOn(Math, "random")` fixando 0.5 → `5` |
| `utilitarios.js`: `replace(/[\W_]/g, "")` | `/[^\W_]/g` | Só havia testes com palíndromos (resultado `true`) | `ehPalindromo("hello")` → `false` |
| `contaBancaria.js`: `if (!sucessoSaque) return false` | `if (false)` | Ramo defensivo nunca executado | `jest.spyOn(conta, "sacar").mockReturnValue(false)` |

## Mutantes equivalentes (sobreviventes restantes)

Um **mutante equivalente** muda o código mas **não muda o comportamento** do programa —
nenhum teste consegue matá-lo. Por isso não faz sentido buscar 100%.

| Local | Mutante | Por que é equivalente |
|-------|---------|------------------------|
| `anagram.js:6` | `toLowerCase()` → `toUpperCase()` | As duas palavras passam pela mesma transformação, então a comparação dá o mesmo resultado |
| `anagram.js:6` | `.join("")` → `.join("Stryker was here!")` | Mesmo motivo: o separador é aplicado nos dois lados |
| `biblioteca.js:94` | `if (this.livros.length === 0)` → `if (false)` | Com a lista vazia, `ordenarPorAno()[0]` já retorna `undefined` |
| `carro.js:10` | `distancia > 0` → `distancia >= 0` | Somar 0 à quilometragem não muda nada |
| `textoUtils.js:58` | remove o `.trim()` | O `.filter(Boolean)` já descarta as strings vazias das pontas |
| `textoUtils.js:58` | `/\s+/` → `/\s/` | Mesmo motivo: as strings vazias entre espaços são filtradas |
| `utilitarios.js:97` | `toLowerCase()` → `toUpperCase()` | A string é comparada com ela mesma invertida; a caixa não importa |

## Conclusão

- Cobertura alta **não** garante testes bons: o projeto já tinha boa cobertura, mas 69 mutantes passavam despercebidos.
- A maioria dos problemas era de **valores de fronteira** (`<` vs `<=`), **ramos negativos** (item inexistente)
  e **asserções fracas** (verificar que lança erro sem verificar a mensagem; buscar sempre o primeiro item).
- Com 49 testes novos, o mutation score subiu de **88,18% para 98,80%**, e o restante são mutantes equivalentes.

## Estrutura

```
src/                 código de produção (mesmo da Prova 01)
test/                testes unitários originais da Prova 01
test/mutacao/        testes novos criados a partir do relatório do Stryker
docs/                relatórios HTML do Stryker (antes e depois)
stryker.config.json  configuração do Stryker
```
