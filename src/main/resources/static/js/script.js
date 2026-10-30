let paginaAtual = 1;
const registrosPorPagina = 20;
let todosOsDados = [];
let dadosOriginais = [];
let resultadosBuscaModal = [];

let paginaBuscaModal = 1;

const registrosPorPaginaModal = 10;

let codigoCnesSelecionado = null;


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
        await fetch("/api/estabelecimentos/total-hospitalar");

    document.getElementById(
        "totalHospitalar"
    ).innerText = formatarNumero(
        await hospitalar.json()
    );

    const ambulatorial =
        await fetch("/api/estabelecimentos/total-ambulatorial");

    document.getElementById(
        "totalAmbulatorial"
    ).innerText = formatarNumero(
        await ambulatorial.json()
    );

    const cirurgico =
        await fetch("/api/estabelecimentos/total-centro-cirurgico");

    document.getElementById(
        "totalCentroCirurgico"
    ).innerText = formatarNumero(
        await cirurgico.json()
    );

    const obstetrico =
        await fetch("/api/estabelecimentos/total-centro-obstetrico");

    document.getElementById(
        "totalCentroObstetrico"
    ).innerText = formatarNumero(
        await obstetrico.json()
    );

    const neonatal =
        await fetch("/api/estabelecimentos/total-centro-neonatal");

    document.getElementById(
        "totalCentroNeonatal"
    ).innerText = formatarNumero(
        await neonatal.json()
    );
}

async function carregarTabela() {

    const resposta =
        await fetch("/api/estabelecimentos");

    dadosOriginais =
        await resposta.json();

    todosOsDados =
        [...dadosOriginais];

    renderizarTabela();

}
function abrirModalEditar() {

    document.getElementById(
        "modalEditar"
    ).style.display = "block";

}

function fecharModalEditar() {


    document.getElementById(
        "modalEditar"
    ).style.display = "none";

}
async function selecionarRegistro(
    codigoCnes
) {

    const resposta =
        await fetch(
            `/api/estabelecimentos/${codigoCnes}`
        );

    const item =
        await resposta.json();

    document.getElementById(
        "editarNomeFantasia"
    ).value =
        item.nomeFantasia ?? "";

    document.getElementById(
        "editarEsferaAdministrativa"
    ).value =
        item.esferaAdministrativa ?? "";

    document.getElementById(
        "editarUf"
    ).value =
        item.codigoUf;

    document.getElementById(
        "editarHospitalar"
    ).checked =
        item.atendimentoHospitalar === 1;

    document.getElementById(
        "editarAmbulatorial"
    ).checked =
        item.atendimentoAmbulatorial === 1;

    document.getElementById(
        "editarCentroCirurgico"
    ).checked =
        item.centroCirurgico === 1;

    document.getElementById(
        "editarCentroObstetrico"
    ).checked =
        item.centroObstetrico === 1;

    document.getElementById(
        "editarCentroNeonatal"
    ).checked =
        item.centroNeonatal === 1;

    codigoCnesSelecionado =
        codigoCnes;
}
async function salvarRegistroModal() {

    const body = {

        nomeFantasia:
        document.getElementById(
            "editarNomeFantasia"
        ).value,

        esferaAdministrativa:
        document.getElementById(
            "editarEsferaAdministrativa"
        ).value,

        codigoUf:
            Number(
                document.getElementById(
                    "editarUf"
                ).value
            ),

        atendimentoHospitalar:
            document.getElementById(
                "editarHospitalar"
            ).checked ? 1 : 0,

        atendimentoAmbulatorial:
            document.getElementById(
                "editarAmbulatorial"
            ).checked ? 1 : 0,

        centroCirurgico:
            document.getElementById(
                "editarCentroCirurgico"
            ).checked ? 1 : 0,

        centroObstetrico:
            document.getElementById(
                "editarCentroObstetrico"
            ).checked ? 1 : 0,

        centroNeonatal:
            document.getElementById(
                "editarCentroNeonatal"
            ).checked ? 1 : 0
    };

    const url =
        codigoCnesSelecionado
            ? `/api/estabelecimentos/${codigoCnesSelecionado}`
            : "/api/estabelecimentos";

    const metodo =
        codigoCnesSelecionado
            ? "PUT"
            : "POST";

    const resposta =
        await fetch(
            url,
            {
                method: metodo,
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body:
                    JSON.stringify(body)
            }
        );

    if (resposta.ok) {

        alert(
            "Registro atualizado com sucesso"
        );

        carregarTabela();

    } else {

        alert(
            "Erro ao atualizar registro"
        );
    }
}

async function excluirRegistro() {

    if (!codigoCnesSelecionado) {

        alert(
            "Selecione um registro"
        );

        return;
    }

    const confirmar =
        confirm(
            "Deseja realmente excluir o registro?"
        );

    if (!confirmar) {
        return;
    }

    const resposta =
        await fetch(
            `/api/estabelecimentos/${codigoCnesSelecionado}`,
            {
                method: "DELETE"
            }
        );

    if (resposta.ok) {

        alert(
            "Registro excluído com sucesso"
        );

        fecharModalEditar();

        carregarTabela();

    } else {

        alert(
            "Erro ao excluir registro"
        );
    }
}
async function carregarMapa() {

    const resposta =
        await fetch("/api/estabelecimentos/dashboard-uf");

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

    atualizarInfoPagina();
}
function filtrarTabela() {

    const nome =
        document.getElementById(
            "filtroNome"
        ).value
            .toLowerCase();

    const uf =
        document.getElementById(
            "filtroUf"
        ).value;

    todosOsDados =
        dadosOriginais.filter(item => {

            const atendeNome =
                item.nomeFantasia
                    ?.toLowerCase()
                    .includes(nome);

            const atendeUf =
                uf === "" ||
                item.codigoUf === Number(uf);

            return (
                atendeNome &&
                atendeUf
            );
        });

    paginaAtual = 1;

    renderizarTabela();
}
function limparFiltros() {

    document.getElementById(
        "filtroNome"
    ).value = "";

    document.getElementById(
        "filtroUf"
    ).value = "";

    todosOsDados =
        [...dadosOriginais];

    paginaAtual = 1;

    renderizarTabela();
}
async function buscarRegistrosModal() {

    const termo =
        document.getElementById(
            "buscaRegistro"
        ).value.trim();

    if (termo === "") {
        return;
    }

    if (!isNaN(termo)) {

        const resposta =
            await fetch(
                `/api/estabelecimentos/${termo}`
            );

        const registro =
            await resposta.json();

        resultadosBuscaModal =
            [registro];

    } else {

        const resposta =
            await fetch(
                `/api/estabelecimentos/nome/${encodeURIComponent(termo)}`
            );

        resultadosBuscaModal =
            await resposta.json();
    }

    paginaBuscaModal = 1;

    renderizarTabelaModal();
}

function renderizarTabelaModal() {

    const tabela =
        document.getElementById(
            "resultadoBuscaModal"
        );

    tabela.innerHTML = "";

    const inicio =
        (paginaBuscaModal - 1)
        * registrosPorPaginaModal;

    const fim =
        inicio +
        registrosPorPaginaModal;

    resultadosBuscaModal
        .slice(inicio, fim)
        .forEach(item => {

            tabela.innerHTML += `
                <tr onclick="selecionarRegistro(${item.codigoCnes})">

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

    atualizarPaginaModal();
}

function atualizarPaginaModal() {

    const totalPaginas =
        Math.max(
            1,
            Math.ceil(
                resultadosBuscaModal.length /
                registrosPorPaginaModal
            )
        );

    document.getElementById(
        "paginaInfoModal"
    ).innerText =
        `Página ${paginaBuscaModal} de ${totalPaginas}`;
}

function proximaPaginaModal() {

    const totalPaginas =
        Math.ceil(
            resultadosBuscaModal.length /
            registrosPorPaginaModal
        );

    if (paginaBuscaModal < totalPaginas) {

        paginaBuscaModal++;

        renderizarTabelaModal();
    }
}

function paginaAnteriorModal() {

    if (paginaBuscaModal > 1) {

        paginaBuscaModal--;

        renderizarTabelaModal();
    }
}
carregarIndicadores();
carregarTabela();
carregarMapa();