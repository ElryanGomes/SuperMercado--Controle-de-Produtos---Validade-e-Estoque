import { Produto } from "./Produto.js";

export class ProdutoPerecivel extends Produto {
    #dataValidade;
    #status;

    constructor(codigo, nome, preco, quantidade, distribuidor, dataValidade) {
        super(codigo, nome, preco, quantidade, distribuidor);
        this.#dataValidade = dataValidade;
        this.#status = " ";
        this.tipo = "perecivel";
    }

    get dataValidade() {
        return this.#dataValidade;
    }

    get status() {
        return this.#status;
    }

    verificarStatus() {
        const hoje = new Date();
        const validade = new Date(this.#dataValidade);

        if (validade < hoje) {
            this.#status = "Vencido";
        } else {
            const diasRestantes = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));

            if (diasRestantes <= 3) {
                this.#status = "Perto de se vencer";
            } else {
                this.#status = "Ok";
            }
        }
    }

    info() {
        return `${super.info()} | Validade: ${this.#dataValidade} | Status: ${this.#status}`;
    }
}
