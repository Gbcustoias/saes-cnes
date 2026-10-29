let metricaMapa = "criancas";

let dadosMapa = [];

let polygonSeriesGlobal;
let estadoSelecionado = null;
let corOriginalEstado = null;


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

    const estabelecimentos =
        await fetch(
            "/api/cnes/total-estabelecimentos"
        );

    const totalEstabelecimentos =
        await estabelecimentos.json();

    document.getElementById("totalRegistros")
        .innerText = formatarNumero(
        totalEstabelecimentos
    );

    const hospitalar =
        await fetch(
            "/api/cnes/total-hospitalar"
        );

    const totalHospitalar =
        await hospitalar.json();

    document.getElementById("mediaComComp")
        .innerText = formatarNumero(
        totalHospitalar
    );

    const ambulatorial =
        await fetch(
            "/api/cnes/total-ambulatorial"
        );

    const totalAmbulatorial =
        await ambulatorial.json();

    document.getElementById("mediaSemComp")
        .innerText = formatarNumero(
        totalAmbulatorial
    );

    const centroCirurgico =
        await fetch(
            "/api/cnes/total-centro-cirurgico"
        );

    const totalCentroCirurgico =
        await centroCirurgico.json();

    document.getElementById("totalPnccAdeq")
        .innerText = formatarNumero(
        totalCentroCirurgico
    );

    const centroObstetrico =
        await fetch(
            "/api/cnes/total-centro-obstetrico"
        );

    const totalCentroObstetrico =
        await centroObstetrico.json();

    document.getElementById("totalMeningAdeq")
        .innerText = formatarNumero(
        totalCentroObstetrico
    );

    const centroNeonatal =
        await fetch(
            "/api/cnes/total-centro-neonatal"
        );

    const totalCentroNeonatal =
        await centroNeonatal.json();

    document.getElementById("totalMeningOport")
        .innerText = formatarNumero(
        totalCentroNeonatal
    );

    document.getElementById("totalPnccOport")
        .innerText =
        "CNES";
}
carregarMapa();

async function carregarMapa() {

    const resposta =
        await fetch("/api/cnes/dashboard-uf");

    const dados =
        await resposta.json();
    dadosMapa = dados;


    const dadosPorUf = {};

    dados.forEach(item => {
        dadosPorUf[item.codigoUf] = item;
    });

    am5.ready(function () {

        const root =
            am5.Root.new("mapaBrasil");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const chart =
            root.container.children.push(
                am5map.MapChart.new(root, {
                    projection: am5map.geoMercator()
                })
            );

        polygonSeriesGlobal =
            chart.series.push(
                am5map.MapPolygonSeries.new(root, {
                    geoJSON: am5geodata_brazilLow
                })
            );

        polygonSeriesGlobal.mapPolygons.template.setAll({
            interactive: true
        });

        polygonSeriesGlobal.events.on("datavalidated", () => {

            polygonSeriesGlobal.mapPolygons.each(polygon => {

                const uf =
                    polygon.dataItem?.dataContext?.id
                        ?.replace("BR-", "");

                const dadosUf =
                    dadosPorUf[uf];
                console.log(uf, dadosUf);

                if (!dadosUf) {
                    return;
                }
                polygon.events.on("click", () => {
                    if (
                        estadoSelecionado &&
                        estadoSelecionado.dataItem.dataContext.id ===
                        polygon.dataItem.dataContext.id
                    ) {
                        estadoSelecionado.set(
                            "fill",
                            corOriginalEstado
                        );

                        estadoSelecionado = null;

                        document.getElementById("ufSelecionada")
                            .innerText = "Brasil";

                        carregarIndicadores();

                        return;
                    }

                    if (estadoSelecionado) {
                        estadoSelecionado.set(
                            "fill",
                            corOriginalEstado
                        );
                    }

                    corOriginalEstado =
                        polygon.get("fill");

                    estadoSelecionado = polygon;

                    polygon.set(
                        "fill",
                        am5.color(0xff6b35)
                    );

                    document.getElementById("ufSelecionada")
                        .innerText = dadosUf.codigoUf;

                    document.getElementById("totalRegistros")
                        .innerText = formatarNumero(
                        dadosUf.estabelecimentos
                    );

                    document.getElementById("mediaComComp")
                        .innerText = formatarNumero(
                        dadosUf.hospitalares
                    );

                    document.getElementById("mediaSemComp")
                        .innerText = formatarNumero(
                        dadosUf.ambulatoriais
                    );

                    document.getElementById("totalPnccAdeq")
                        .innerText = formatarNumero(
                        dadosUf.centrosCirurgicos
                    );

                    document.getElementById("totalMeningAdeq")
                        .innerText = formatarNumero(
                        dadosUf.centrosObstetricos
                    );

                    document.getElementById("totalMeningOport")
                        .innerText = formatarNumero(
                        dadosUf.centrosNeonatais
                    );

                    document.getElementById("totalPnccOport")
                        .innerText = "CNES";
                });
                polygon.set(
                    "tooltipText",
                    `${polygon.dataItem.dataContext.name}

Estabelecimentos: ${formatarNumero(dadosUf.estabelecimentos)}

Hospitalares: ${formatarNumero(dadosUf.hospitalares)}

Ambulatoriais: ${formatarNumero(dadosUf.ambulatoriais)}

Centros Cirúrgicos: ${formatarNumero(dadosUf.centrosCirurgicos)}

Centros Obstétricos: ${formatarNumero(dadosUf.centrosObstetricos)}

Centros Neonatais: ${formatarNumero(dadosUf.centrosNeonatais)}`
                );

                polygon.dataItem.dataContext.criancas =
                    dadosUf.criancas;

                polygon.dataItem.dataContext.municipios =
                    dadosUf.municipios;

                polygon.dataItem.dataContext.pnccAdeq =
                    dadosUf.pnccAdeq;

                polygon.dataItem.dataContext.pnccOport =
                    dadosUf.pnccOport;

                polygon.dataItem.dataContext.meningAdeq =
                    dadosUf.meningAdeq;

                polygon.dataItem.dataContext.meningOport =
                    dadosUf.meningOport;
            });

        });

    });
}