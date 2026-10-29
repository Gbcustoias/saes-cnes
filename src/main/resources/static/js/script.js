let paginaAtual = 1;
const registrosPorPagina = 20;
let todosOsDados = [];

const mapaUf = {
    "RO": 11,
    "AC": 12,
    "AM": 13,
    "RR": 14,
    "PA": 15,
    "AP": 16,
    "TO": 17,
    "MA": 21,
    "PI": 22,
    "CE": 23,
    "RN": 24,
    "PB": 25,
    "PE": 26,
    "AL": 27,
    "SE": 28,
    "BA": 29,
    "MG": 31,
    "ES": 32,
    "RJ": 33,
    "SP": 35,
    "PR": 41,
    "SC": 42,
    "RS": 43,
    "MS": 50,
    "MT": 51,
    "GO": 52,
    "DF": 53
};

const ufSigla = {
    11: "RO",
    12: "AC",
    13: "AM",
    14: "RR",
    15: "PA",
    16: "AP",
    17: "TO",
    21: "MA",
    22: "PI",
    23: "CE",
    24: "RN",
    25: "PB",
    26: "PE",
    27: "AL",
    28: "SE",
    29: "BA",
    31: "MG",
    32: "ES",
    33: "RJ",
    35: "SP",
    41: "PR",
    42: "SC",
    43: "RS",
    50: "MS",
    51: "MT",
    52: "GO",
    53: "DF"
};

let estadoSelecionado = null;
let corOriginalEstado = null;

function formatarNumero(valor) {

    if (
        valor === null ||
        valor === undefined ||
        isNaN(valor)
    ) {
        return "0";
    }

    return Number(valor).toLocaleString("pt-BR");
}

async function carregarIndicadores() {

    const hospitalar =
        await fetch("/api/cnes/total-hospitalar");

    document.getElementById(
        "totalHospitalar"
    ).innerText = formatarNumero(
        await hospitalar.json()
    );

    const ambulatorial =
        await fetch("/api/cnes/total-ambulatorial");

    document.getElementById(
        "totalAmbulatorial"
    ).innerText = formatarNumero(
        await ambulatorial.json()
    );

    const cirurgico =
        await fetch("/api/cnes/total-centro-cirurgico");

    document.getElementById(
        "totalCentroCirurgico"
    ).innerText = formatarNumero(
        await cirurgico.json()
    );

    const obstetrico =
        await fetch("/api/cnes/total-centro-obstetrico");

    document.getElementById(
        "totalCentroObstetrico"
    ).innerText = formatarNumero(
        await obstetrico.json()
    );

    const neonatal =
        await fetch("/api/cnes/total-centro-neonatal");

    document.getElementById(
        "totalCentroNeonatal"
    ).innerText = formatarNumero(
        await neonatal.json()
    );
}

async function carregarTabela() {

    const resposta =
        await fetch("/api/cnes");

    todosOsDados =
        await resposta.json();

    renderizarTabela();

}

async function carregarMapa() {

    const resposta =
        await fetch("/api/cnes/dashboard-uf");

    const dados =
        await resposta.json();

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
                    projection:
                        am5map.geoMercator()
                })
            );

        const polygonSeries =
            chart.series.push(
                am5map.MapPolygonSeries.new(
                    root,
                    {
                        geoJSON:
                        am5geodata_brazilLow
                    }
                )
            );

        polygonSeries.mapPolygons
            .template
            .setAll({
                interactive: true
            });

        polygonSeries.events.on(
            "datavalidated",
            () => {

                polygonSeries.mapPolygons.each(
                    polygon => {

                        const sigla =
                            polygon.dataItem
                                ?.dataContext
                                ?.id
                                ?.replace(
                                    "BR-",
                                    ""
                                );

                        const codigoUf =
                            mapaUf[sigla];

                        const dadosUf =
                            dadosPorUf[codigoUf];

                        if (!dadosUf) {
                            return;
                        }
                        polygon.events.on("click", () => {

                            if (
                                estadoSelecionado &&
                                estadoSelecionado === polygon
                            ) {

                                estadoSelecionado.set(
                                    "fill",
                                    corOriginalEstado
                                );

                                estadoSelecionado = null;

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

                            estadoSelecionado =
                                polygon;

                            polygon.set(
                                "fill",
                                am5.color(0xff6b35)
                            );

                            document.getElementById(
                                "totalHospitalar"
                            ).innerText = formatarNumero(
                                dadosUf.hospitalares
                            );

                            document.getElementById(
                                "totalAmbulatorial"
                            ).innerText = formatarNumero(
                                dadosUf.ambulatoriais
                            );

                            document.getElementById(
                                "totalCentroCirurgico"
                            ).innerText = formatarNumero(
                                dadosUf.centrosCirurgicos
                            );

                            document.getElementById(
                                "totalCentroObstetrico"
                            ).innerText = formatarNumero(
                                dadosUf.centrosObstetricos
                            );

                            document.getElementById(
                                "totalCentroNeonatal"
                            ).innerText = formatarNumero(
                                dadosUf.centrosNeonatais
                            );

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

                    }
                );
            }
        );

    });

}
function proximaPagina() {

    const totalPaginas =
        Math.ceil(
            todosOsDados.length /
            registrosPorPagina
        );

    if (
        paginaAtual < totalPaginas
    ) {

        paginaAtual++;

        renderizarTabela();

        atualizarInfoPagina();
    }
}

function paginaAnterior() {

    if (paginaAtual > 1) {

        paginaAtual--;

        renderizarTabela();

        atualizarInfoPagina();
    }
}

function atualizarInfoPagina() {

    const totalPaginas =
        Math.ceil(
            todosOsDados.length /
            registrosPorPagina
        );

    document.getElementById(
        "paginaInfo"
    ).innerText =
        `Página ${paginaAtual} de ${totalPaginas}`;
}
carregarIndicadores();
carregarTabela();

function renderizarTabela() {

    const tabela =
        document.getElementById(
            "resultado"
        );

    tabela.innerHTML = "";

    const inicio =
        (paginaAtual - 1)
        * registrosPorPagina;

    const fim =
        inicio + registrosPorPagina;

    todosOsDados
        .slice(inicio, fim)
        .forEach(item => {

            tabela.innerHTML += `
                <tr>
                    <td>${item.nomeFantasia ?? ""}</td>
                    <td>${item.esferaAdministrativa ?? ""}</td>
                    <td>${ufSigla[item.codigoUf] ?? item.codigoUf}</td>
                    <td>${item.atendimentoHospitalar ? "Sim" : "Não"}</td>
                    <td>${item.atendimentoAmbulatorial ? "Sim" : "Não"}</td>
                    <td>${item.centroCirurgico ? "Sim" : "Não"}</td>
                    <td>${item.centroObstetrico ? "Sim" : "Não"}</td>
                    <td>${item.centroNeonatal ? "Sim" : "Não"}</td>
                </tr>
            `;
        });

}

carregarMapa();