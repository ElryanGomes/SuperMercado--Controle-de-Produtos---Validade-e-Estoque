import { ProdutoPerecivel } from "./ProdutoPerecivel.js";
import { ProdutoImperecivel } from "./ProdutoImperecivel.js";

export class Estoque {
    #produtos;

    constructor() {
        this.#produtos = [];
    }

    get produtos() {
        return this.#produtos;
    }

    adicionarProduto(produto) {
        this.#produtos.push(produto);
    }

    removerProduto(codigo) {
        this.#produtos = this.#produtos.filter(p => p.codigo !== codigo);
    }

    listarProdutos() {
        return this.#produtos.map(p => {
            if (p instanceof ProdutoPerecivel) {
                return `${p.codigo} — ${p.nome} — ${p.preco} — ${p.quantidade} unidades — ${p.distribuidor}
                | Validade: ${p.dataValidade} | Status: ${p.status}`;
            }

            if (p instanceof ProdutoImperecivel) {
                return `${p.codigo} — ${p.nome} — ${p.preco} — ${p.quantidade} unidades — ${p.distribuidor}
                | Produto Imperecível`;
            }
        }).join("<br>");
    }

    verificarPerecivel() {
        this.#produtos.forEach(p => {
            if (p instanceof ProdutoPerecivel) {
                p.verificarStatus();
            }
        });
    }
}
