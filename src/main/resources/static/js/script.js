document
    .getElementById("btnPesquisar")
    .addEventListener("click", pesquisar);

document
    .getElementById("btnLimpar")
    .addEventListener("click", limparBanco);

document
    .getElementById("btnImportar")
    .addEventListener("click", importarArquivo);

carregarIndicadores();

function formatarNumero(valor) {

    if (
        valor === null ||
        valor === undefined ||
        isNaN(valor)
    ) {
        return "0";
    }

    return Number(valor)
        .toLocaleString("pt-BR");
}

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

async function carregarIndicadores() {

    const registros =
        await fetch("/api/monitoramento/quantidade");

    const totalRegistros =
        await registros.json();

    document.getElementById("totalRegistros")
        .innerText = formatarNumero(totalRegistros);

    const mediaCom =
        await fetch("/api/monitoramento/media-com");

    const valorCom =
        await mediaCom.json();

    document.getElementById("mediaComComp")
        .innerText = formatarNumero(
        Math.round(valorCom ?? 0)
    );

    const mediaSem =
        await fetch("/api/monitoramento/media-sem");

    const valorSem =
        await mediaSem.json();

    document.getElementById("mediaSemComp")
        .innerText = formatarNumero(
        Math.round(valorSem ?? 0)
    );

    const pnccAdeq =
        await fetch("/api/monitoramento/pncc-adeq");

    const valorPnccAdeq =
        await pnccAdeq.json();

    document.getElementById("totalPnccAdeq")
        .innerText = formatarNumero(valorPnccAdeq);

    const meningAdeq =
        await fetch("/api/monitoramento/mening-adeq");

    const valorMeningAdeq =
        await meningAdeq.json();

    document.getElementById("totalMeningAdeq")
        .innerText = formatarNumero(valorMeningAdeq);

    const pnccOport =
        await fetch("/api/monitoramento/pncc-oport");

    const valorPnccOport =
        await pnccOport.json();

    document.getElementById("totalPnccOport")
        .innerText = formatarNumero(valorPnccOport);

    const meningOport =
        await fetch("/api/monitoramento/mening-oport");

    const valorMeningOport =
        await meningOport.json();

    document.getElementById("totalMeningOport")
        .innerText = formatarNumero(valorMeningOport);
}

