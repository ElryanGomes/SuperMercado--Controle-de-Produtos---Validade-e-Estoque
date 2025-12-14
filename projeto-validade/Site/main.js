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
const secaoValidade = document.getElementById("secaoControleValidade");

function mostrarTela(tela) {
    secaoEstoque.classList.add("hidden");
    secaoAdicionar.classList.add("hidden");
    secaoValidade.classList.add("hidden");

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
document.getElementById("btnValidade").addEventListener("click", () => {
    atualizarTabelaControleValidade();
    mostrarTela(secaoValidade);
});


// Tela de Estoque
function atualizarTabelaEstoque() {
    const corpo = document.getElementById("corpoTabelaProdutos");
    const filtro = document.getElementById("filtroEstoque").value;
    const termoBusca = document.getElementById("buscaNomeEstoque").value.toLowerCase();

    corpo.innerHTML = "";

    estoque.produtos.forEach(p => {

        if (filtro === "perecivel" && p.tipo !== "Perecivel") return;
        if (filtro === "naoPerecivel" && p.tipo !== "Não Perecivel") return;

        const termo = termoBusca.trim();
        const seForNumero = /^[0-9]+$/.test(termo);

        if (seForNumero) {
            if (!p.codigo.includes(termo)) return;
        } else {
            if (!p.nome.toLowerCase().includes(termo.toLowerCase())) return;
        }

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.nome}</td>
            <td>R$ ${Number(p.preco).toFixed(2)}</td>
            <td>${p.quantidade}</td>
            <td>${p.tipo}</td>
        `;

        corpo.appendChild(tr);
    });
}
document.getElementById("filtroEstoque")
    .addEventListener("change", atualizarTabelaEstoque);

document.getElementById("buscaNomeEstoque")
    .addEventListener("input", atualizarTabelaEstoque);


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

    estoque.adicionarProduto(novoProduto)
    atualizarTabelaEstoque()
    evento.target.reset();
})

document.addEventListener("DOMContentLoaded", () => {
    const tipoProduto = document.getElementById("tipoProduto");
    const campoValidade = document.getElementById("campoValidade");

    campoValidade.style.display = "flex";

    tipoProduto.addEventListener("change", () => {
        if (tipoProduto.value === "perecivel") {
            campoValidade.style.display = "flex";
        }
        if (tipoProduto.value === "imperecivel") {
            campoValidade.style.display = "none";
        }
    });
});


// Tela de Controle de Validade
function atualizarTabelaControleValidade() {
    const corpo = document.getElementById("tabelaControleValidade");
    const filtro = document.getElementById("filtroValidade").value;

    corpo.innerHTML = "";

    estoque.verificarPerecivel();

    estoque.produtos
        .filter(p => p.tipo === "Perecivel")
        .filter(p => {
            if (filtro === "todos") return true;
            if (filtro === "ok") return p.status === "Longe";
            if (filtro === "perto") return p.status === "Em Risco";
            if (filtro === "vencido") return p.status === "Vencido";
        })
        .forEach(p => {
            const validade = new Date(p.dataValidade);
            const hoje = new Date();
            const dias = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${p.nome}</td>
                <td>${p.dataValidade}</td>
                <td>${dias >= 0 ? dias + " dias" : "—"}</td>
                <td class="status ${p.status.toLowerCase().replace(" ", "-")}">
                    ${p.status}
                </td>
            `;

            corpo.appendChild(tr);
        });

    const pereciveis = estoque.produtos.filter(p => p.tipo === "Perecivel");

    const longe = pereciveis.filter(p => p.status === "Longe").length;
    const risco = pereciveis.filter(p => p.status === "Em Risco").length;
    const vencido = pereciveis.filter(p => p.status === "Vencido").length;

    document.getElementById("qtdLonge").innerText = longe;
    document.getElementById("qtdRisco").innerText = risco;
    document.getElementById("qtdVencidos").innerText = vencido;
}

document.getElementById("filtroValidade").addEventListener("change", () => {
    atualizarTabelaControleValidade();
});


atualizarTabelaEstoque();
mostrarTela(secaoEstoque);



