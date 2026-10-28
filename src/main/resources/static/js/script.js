document
    .getElementById("btnPesquisar")
    .addEventListener("click", pesquisar);

document
    .getElementById("btnLimpar")
    .addEventListener("click", limparBanco);

document
    .getElementById("btnImportar")
    .addEventListener("click", importarArquivo);

async function pesquisar() {

    const uf =
        document.getElementById("uf").value.trim();

    const municipio =
        document.getElementById("municipio").value.trim();

    let url = "";

    if (municipio !== "") {

        url =
            `/api/monitoramento/municipio/${encodeURIComponent(municipio)}`;

    } else if (uf !== "") {

        url =
            `/api/monitoramento/uf/${uf}`;

    } else {

        alert("Informe uma UF ou um Município");
        return;
    }

    const resposta = await fetch(url);

    const dados = await resposta.json();

    preencherTabela(dados);
}

function preencherTabela(dados) {

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

async function limparBanco() {

    await fetch(
        "/api/monitoramento/limpar",
        {
            method: "DELETE"
        }
    );

    document.getElementById("resultado").innerHTML = "";

    alert("Banco limpo com sucesso!");
}

async function importarArquivo() {

    const arquivo =
        document.getElementById("arquivoCsv").files[0];

    if (!arquivo) {
        alert("Selecione um arquivo");
        return;
    }

    const botao =
        document.getElementById("btnImportar");

    botao.disabled = true;
    botao.innerText = "Importando...";

    const formData = new FormData();

    formData.append("arquivo", arquivo);

    try {

        const resposta = await fetch(
            "/api/importacao",
            {
                method: "POST",
                body: formData
            }
        );

        const mensagem =
            await resposta.text();

        alert(mensagem);

    } catch (erro) {

        alert("Erro ao importar arquivo");

    } finally {

        botao.disabled = false;
        botao.innerText = "Importar CSV";
    }
}