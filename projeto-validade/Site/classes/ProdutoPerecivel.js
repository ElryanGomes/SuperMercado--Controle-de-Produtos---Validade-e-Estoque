import { Produto } from "./Produto.js";

export class ProdutoPerecivel extends Produto {
    #dataValidade;
    #status;

    constructor(codigo, nome, preco, quantidade, distribuidor, dataValidade) {
        super(codigo, nome, preco, quantidade, distribuidor);
        this.#dataValidade = dataValidade;
        this.verificarStatus(); 
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

        const diasRestantes = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));

        if (diasRestantes < 0){
            this.#status = "Vencido"
        }
        else if (0 < diasRestantes && diasRestantes < 10 ){
            this.#status = "Em Risco"
        }
        else {
            this.#status = "Longe"
        }

        return this.#status;
    }

    info() {
        return `${super.info()} | Validade: ${this.#dataValidade} | Status: ${this.#status}`;
    }
}
