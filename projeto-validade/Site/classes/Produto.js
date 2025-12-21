export class Produto {
    #codigo;
    #nome;
    #preco;
    #quantidade;
    #distribuidor;
    #tipo;

    constructor(codigo, nome, preco, quantidade, distribuidor) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#preco = preco;
        this.#quantidade = quantidade;
        this.#distribuidor = distribuidor;
        this.#tipo = "";
    }

    get codigo() { return this.#codigo; }
    get nome() { return this.#nome; }
    get preco() { return this.#preco; }
    get quantidade() { return this.#quantidade; }
    get distribuidor() { return this.#distribuidor; }
    get tipo() { return this.#tipo; }

    set codigo(valor) { this.#codigo = valor; }
    set nome(valor) { this.#nome = valor; }
    set preco(valor) {
        if (valor <= 0) {
            console.log("Preço inválido.");
            return;
        }
        this.#preco = valor;
    }

    set quantidade(valor) {
        if (valor < 0) {
            console.log("Quantidade inválida.");
            return;
        }
        this.#quantidade = valor;
    }

    set distribuidor(valor) {
        this.#distribuidor = valor;
    }

    set tipo(valor) {
        this.#tipo = valor;
    }


    info() {
        return `Código: ${this.#codigo}  
                Produto: ${this.#nome}  
                Preço: R$ ${this.#preco}  
                Quantidade: ${this.#quantidade}  
                Distribuidor: ${this.#distribuidor}  
                Tipo: ${this.#tipo}`;
    }
}
