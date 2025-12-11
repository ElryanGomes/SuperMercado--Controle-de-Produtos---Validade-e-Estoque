import { ProdutoPerecivel } from "./classes/ProdutoPerecivel.js";
import { ProdutoImperecivel } from "./classes/ProdutoImperecivel.js";
import { Estoque } from "./classes/Estoque.js";

const estoque = new Estoque();

estoque.adicionarProduto(new ProdutoPerecivel("001", "Leite", 5.99, 10, "Laticínios BR", "2025-12-15"));
estoque.adicionarProduto(new ProdutoPerecivel("002", "Iogurte", 3.50, 20, "Fazenda Feliz", "2025-12-28"));
estoque.adicionarProduto(new ProdutoPerecivel("002", "Coca Cola 2L", 9.50, 20, "York", "2024-11-28"));
estoque.adicionarProduto(new ProdutoImperecivel("003", "Arroz 5kg", 22.90, 15, "Cerealista Sul"));


// Trocas de Tela
const secaoEstoque = document.getElementById("secaoEstoque");
const secaoAdicionar = document.getElementById("secaoAdicionar");
const secaoPertoVencer = document.getElementById("secaoPertoVencer");
const secaoVencidos = document.getElementById("secaoVencidos");

function mostrarTela(tela) {
    secaoEstoque.classList.add("hidden");
    secaoAdicionar.classList.add("hidden");
    secaoPertoVencer.classList.add("hidden");
    secaoVencidos.classList.add("hidden");

    tela.classList.remove("hidden");
}

// Botões do menu
document.getElementById("btnMostrarEstoque").addEventListener("click", () => {
    atualizarTabelaEstoque();
    mostrarTela(secaoEstoque);
    // console.log("abriu estoque")
});
document.getElementById("btnAdicionarProduto").addEventListener("click", () => {
    mostrarTela(secaoAdicionar);
    // console.log("abriu adicionar")
});
document.getElementById("btnPertoVencer").addEventListener("click", () => {
    atualizarTabelaPertoVencer();
    mostrarTela(secaoPertoVencer);
    // console.log("abriu perto de vencer")
});
document.getElementById("btnVencidos").addEventListener("click", () => {
    atualizarTabelaVencidos();
    mostrarTela(secaoVencidos);
    // console.log("abriu vencidos")
});


// Tela de Estoque
function atualizarTabelaEstoque() {
    const corpo = document.getElementById("corpoTabelaProdutos");
    corpo.innerHTML = "";

    estoque.verificarPerecivel(); // atualiza status

    estoque.produtos.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.nome}</td>
            <td>${p.preco}</td>
            <td>${p.quantidade}</td>
            <td>${p.tipo}</td>
            <td>${p.tipo === "perecivel" ? p.dataValidade : "-"}</td>
            <td>${p.tipo === "perecivel" ? p.status : "-"}</td>
        `;

        corpo.appendChild(tr);
    });
}

// Tela de Adicionar
const dadosAdicionarForm = document.getElementById("formAdicionarProduto")
dadosAdicionarForm.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const codigo = document.getElementById("codigo").value;
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const distribuidor = document.getElementById("distribuidor").value;
    const tipo = document.getElementById("tipoProduto").value;
    const dataValidade = document.getElementById("dataValidade").value;


    let novoProduto;

    if (tipo === "perecivel") {
        novoProduto = new ProdutoPerecivel(
            codigo, nome, preco, quantidade, distribuidor, dataValidade
        )
    }
    else if (tipo === "imperecivel") {
        novoProduto = new ProdutoImperecivel(
            codigo, nome, preco, quantidade, distribuidor
        )
    }

    // const tipoProduto = document.getElementById("tipoProduto");
    // const campoValidade = document.getElementById("campoValidade");

    // tipoProduto.addEventListener("change", function () {
    //     if (this.value === "perecivel") {
    //         campoValidade.style.display = "block";
    //     } else {
    //         campoValidade.style.display = "none";
    //     }
    // });


estoque.adicionarProduto(novoProduto)
atualizarTabelaEstoque()
evento.target.reset();
})


// Tela de Perto de Vencer
function atualizarTabelaPertoVencer() {
    const corpo = document.getElementById("tabelaPertoVencer");
    corpo.innerHTML = "";

    estoque.verificarPerecivel();

    estoque.produtos
        .filter(p => p.tipo === "perecivel" && (p.status === "EM RISCO" || p.status === "PERTO DE VENCER"))
        .forEach(p => {
            const validade = new Date(p.dataValidade);
            const hoje = new Date();
            const dias = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${p.nome}</td>
                <td>${p.dataValidade}</td>
                <td>${dias} dias</td>
            `;

            corpo.appendChild(tr);
        });
}


// Tabela Vencidos
function atualizarTabelaVencidos() {
    const corpo = document.getElementById("tabelaVencidos");
    corpo.innerHTML = "";

    estoque.verificarPerecivel();

    estoque.produtos
        .filter(p => p.tipo === "perecivel" && p.status === "VENCIDO")
        .forEach(p => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${p.nome}</td>
                <td>${p.dataValidade}</td>
                <td>${p.status}</td>
            `;
            corpo.appendChild(tr);
        });
}


atualizarTabelaEstoque();
mostrarTela(secaoEstoque);



