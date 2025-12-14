import { Produto } from "./Produto.js";

export class ProdutoImperecivel extends Produto {

    constructor(codigo, nome, preco, quantidade, distribuidor) {
        super(codigo, nome, preco, quantidade, distribuidor);
        this.tipo = "Não Perecivel";
    }

    info() {
        return `${super.info()} | Produto Imperecível`;
    }
}
