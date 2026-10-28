document
    .getElementById("btnPesquisar")
    .addEventListener("click", pesquisar);

async function carregarDados() {

    const resposta =
        await fetch("/api/monitoramento");

    const dados =
        await resposta.json();

    const tabela =
        document.getElementById("resultado");

    tabela.innerHTML = "";

    dados.forEach(item => {

        tabela.innerHTML += `
            <tr>
                <td>${item.uf}</td>
                <td>${item.nomeMunicipio}</td>
                <td>${item.numeroDomicilios}</td>
                <td>${item.numeroCriancasResid}</td>
            </tr>
        `;
    });
}
async function pesquisar() {

    const uf =
        document.getElementById("uf").value;

    const resposta =
        await fetch(`/api/monitoramento/uf/${uf}`);

    const dados =
        await resposta.json();

    const tabela =
        document.getElementById("resultado");

    tabela.innerHTML = "";

    dados.forEach(item => {

        tabela.innerHTML += `
            <tr>
                <td>${item.uf}</td>
                <td>${item.nomeMunicipio}</td>
                <td>${item.numeroDomicilios}</td>
                <td>${item.numeroCriancasResid}</td>
            </tr>
        `;
    });
}
document
    .getElementById("btnLimpar")
    .addEventListener("click", limparBanco);

async function limparBanco() {

    const resposta = await fetch(
        "/api/monitoramento/limpar",
        {
            method: "DELETE"
        }
    );

    console.log(resposta);

    alert("Botão executado");
}
