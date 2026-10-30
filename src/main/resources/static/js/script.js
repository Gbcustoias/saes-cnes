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

let modoMapaAtual = "padrao";

let dadosDashboardUf = [];

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

function abrirModalNovoRegistro() {

    limparFormularioNovo();

    document.getElementById(
        "modalNovoRegistro"
    ).style.display = "block";
}

function limparFormularioNovo() {

    document.getElementById(
        "novoCodigoCnes"
    ).value = "";

    document.getElementById(
        "novoNomeFantasia"
    ).value = "";

    document.getElementById(
        "novoEsferaAdministrativa"
    ).value = "";

    document.getElementById(
        "novoUf"
    ).value = "35";

    document.getElementById(
        "novoHospitalar"
    ).checked = false;

    document.getElementById(
        "novoAmbulatorial"
    ).checked = false;

    document.getElementById(
        "novoCentroCirurgico"
    ).checked = false;

    document.getElementById(
        "novoCentroObstetrico"
    ).checked = false;

    document.getElementById(
        "novoCentroNeonatal"
    ).checked = false;
}

function limparFormularioEdicao() {

    codigoCnesSelecionado = null;

    document.getElementById(
        "editarCodigoCnes"
    ).value = "";

    document.getElementById(
        "editarNomeFantasia"
    ).value = "";

    document.getElementById(
        "editarEsferaAdministrativa"
    ).value = "";

    document.getElementById(
        "editarUf"
    ).value = "35";

    document.getElementById(
        "editarHospitalar"
    ).checked = false;

    document.getElementById(
        "editarAmbulatorial"
    ).checked = false;

    document.getElementById(
        "editarCentroCirurgico"
    ).checked = false;

    document.getElementById(
        "editarCentroObstetrico"
    ).checked = false;

    document.getElementById(
        "editarCentroNeonatal"
    ).checked = false;
}

function fecharModalEditar() {

    limparFormularioEdicao();

    document.getElementById(
        "modalEditar"
    ).style.display = "none";
}
function fecharModalNovoRegistro() {

    limparFormularioNovo();

    document.getElementById(
        "modalNovoRegistro"
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
        "editarCodigoCnes"
    ).value =
        item.codigoCnes

    document.getElementById(
        "editarCodigoCnes"
    ).setAttribute(
        "readonly",
        true
    );

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

        codigoCnes:
            Number(
                document.getElementById(
                    "editarCodigoCnes"
                ).value
            ),

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

        mostrarMensagem(
            "Registro atualizado com sucesso"
        );

        carregarTabela();

    } else {

        mostrarMensagem(
            "Erro ao atualizar registro"
        );
    }
}

async function salvarNovoRegistro() {

    const body = {

        codigoCnes: Number(
            document.getElementById(
                "novoCodigoCnes"
            ).value
        ),

        nomeFantasia:
        document.getElementById(
            "novoNomeFantasia"
        ).value,

        esferaAdministrativa:
        document.getElementById(
            "novoEsferaAdministrativa"
        ).value,

        codigoUf: Number(
            document.getElementById(
                "novoUf"
            ).value
        ),

        atendimentoHospitalar:
            document.getElementById(
                "novoHospitalar"
            ).checked ? 1 : 0,

        atendimentoAmbulatorial:
            document.getElementById(
                "novoAmbulatorial"
            ).checked ? 1 : 0,

        centroCirurgico:
            document.getElementById(
                "novoCentroCirurgico"
            ).checked ? 1 : 0,

        centroObstetrico:
            document.getElementById(
                "novoCentroObstetrico"
            ).checked ? 1 : 0,

        centroNeonatal:
            document.getElementById(
                "novoCentroNeonatal"
            ).checked ? 1 : 0
    };

    const resposta = await fetch(
        "/api/estabelecimentos",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    if (resposta.ok) {

        carregarTabela();

        fecharModalNovoRegistro();

        mostrarMensagem(
            "Registro cadastrado com sucesso"
        );

    } else {

        mostrarMensagem(
            "Erro ao cadastrar registro"
        );
    }
}

function excluirRegistro() {

    if (!codigoCnesSelecionado) {

        mostrarMensagem(
            "Selecione um registro",
            "erro"
        );

        return;
    }

    abrirModalConfirmacao();
}

async function carregarMapa() {

    const resposta =
        await fetch("/api/estabelecimentos/dashboard-uf");

    const dados =
        await resposta.json();

    dadosDashboardUf = dados;

    atualizarPainelBrasil();

    const dadosPorUf = {};

    dados.forEach(item => {
        dadosPorUf[item.codigoUf] = item;
    });

    document.getElementById(
        "mapaBrasil"
    ).innerHTML = "";

    am5.ready(function () {

        if (window.rootMapaBrasil) {
            window.rootMapaBrasil.dispose();
        }

        const root =
            am5.Root.new("mapaBrasil");

        window.rootMapaBrasil = root;

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

                        let valorMapa =
                            dadosUf.estabelecimentos;

                        if (modoMapaAtual === "hospitalares") {
                            valorMapa =
                                dadosUf.hospitalares;
                        }

                        if (modoMapaAtual === "ambulatoriais") {
                            valorMapa =
                                dadosUf.ambulatoriais;
                        }

                        const valoresModo =
                            Object.values(dadosPorUf)
                                .map(item => {

                                    if (modoMapaAtual === "hospitalares") {
                                        return item.hospitalares;
                                    }

                                    if (modoMapaAtual === "ambulatoriais") {
                                        return item.ambulatoriais;
                                    }

                                    return item.estabelecimentos;
                                });

                        const maior =
                            Math.max(...valoresModo);

                        const menor =
                            Math.min(...valoresModo);

                        const intensidade =
                            (valorMapa - menor) /
                            (maior - menor || 1);

                        if (modoMapaAtual === "estabelecimentos") {
                            polygon.set(
                                "fill",
                                am5.color(
                                    intensidade > 0.9 ? 0x7f1d1d :
                                        intensidade > 0.8 ? 0x991b1b :
                                            intensidade > 0.7 ? 0xb91c1c :
                                                intensidade > 0.6 ? 0xdc2626 :
                                                    intensidade > 0.5 ? 0xea580c :
                                                        intensidade > 0.4 ? 0xf97316 :
                                                            intensidade > 0.3 ? 0xfb923c :
                                                                intensidade > 0.2 ? 0xfacc15 :
                                                                    intensidade > 0.1 ? 0xfde047 :
                                                                        0xfef08a
                                )
                            );
                        }

                        if (modoMapaAtual === "hospitalares") {

                            polygon.set(
                                "fill",
                                am5.color(
                                    intensidade > 0.8
                                        ? 0x14532d
                                        : intensidade > 0.6
                                            ? 0x15803d
                                            : intensidade > 0.4
                                                ? 0x22c55e
                                                : intensidade > 0.2
                                                    ? 0x86efac
                                                    : 0xdcfce7
                                )
                            );
                        }

                        if (modoMapaAtual === "ambulatoriais") {

                            polygon.set(
                                "fill",
                                am5.color(
                                    intensidade > 0.8
                                        ? 0x581c87
                                        : intensidade > 0.6
                                            ? 0x7e22ce
                                            : intensidade > 0.4
                                                ? 0xa855f7
                                                : intensidade > 0.2
                                                    ? 0xd8b4fe
                                                    : 0xf3e8ff
                                )
                            );
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

                                atualizarPainelBrasil();

                                document.getElementById(
                                    "nomeEstadoSelecionado"
                                ).innerText = "Brasil";

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

                            if (modoMapaAtual === "padrao") {

                                polygon.set(
                                    "fill",
                                    am5.color(0xff6b35)
                                );

                                document.getElementById(
                                    "nomeEstadoSelecionado"
                                ).innerText =
                                    polygon.dataItem.dataContext.name;

                                document.getElementById(
                                    "painelEstabelecimentos"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.estabelecimentos
                                    );

                                document.getElementById(
                                    "painelHospitalares"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.hospitalares
                                    );

                                document.getElementById(
                                    "painelAmbulatoriais"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.ambulatoriais
                                    );

                                document.getElementById(
                                    "painelCirurgicos"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.centrosCirurgicos
                                    );

                                document.getElementById(
                                    "painelObstetricos"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.centrosObstetricos
                                    );

                                document.getElementById(
                                    "painelNeonatais"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.centrosNeonatais
                                    );

                                document.getElementById(
                                    "totalHospitalar"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.hospitalares
                                    );

                                document.getElementById(
                                    "totalAmbulatorial"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.ambulatoriais
                                    );

                                document.getElementById(
                                    "totalCentroCirurgico"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.centrosCirurgicos
                                    );

                                document.getElementById(
                                    "totalCentroObstetrico"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.centrosObstetricos
                                    );

                                document.getElementById(
                                    "totalCentroNeonatal"
                                ).innerText =
                                    formatarNumero(
                                        dadosUf.centrosNeonatais
                                    );
                            }



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

    document.getElementById(
        "contadorRegistros"
    ).innerText =
        `Total de registros: ${todosOsDados.length}`;

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
                    <td>${item.codigoCnes ?? ""}</td>
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
                    
                    <td>${item.codigoCnes ?? ""}</td>
                    
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

function mostrarMensagem(
    texto,
    tipo = "sucesso"
) {

    const mensagem =
        document.getElementById(
            "mensagemSistema"
        );

    mensagem.innerHTML = `
        <div class="${
        tipo === "erro"
            ? "mensagemErro"
            : "mensagemSucesso"
    }">
            ${texto}
        </div>
    `;

    if (texto.includes("importação")) {
        return;
    }

    setTimeout(() => {
        mensagem.innerHTML = "";
    }, 3000);
}

function abrirModalConfirmacao() {

    document.getElementById(
        "modalConfirmacao"
    ).style.display = "block";
}

function fecharModalConfirmacao() {

    document.getElementById(
        "modalConfirmacao"
    ).style.display = "none";
}

async function confirmarExclusao() {

    fecharModalConfirmacao();

    const resposta =
        await fetch(
            `/api/estabelecimentos/${codigoCnesSelecionado}`,
            {
                method: "DELETE"
            }
        );

    if (resposta.ok) {

        mostrarMensagem(
            "Registro excluído com sucesso"
        );


        fecharModalEditar();

        carregarTabela();

    } else {

        mostrarMensagem(
            "Erro ao excluir registro",
            "erro"
        );
    }
}

function abrirModalImportacao() {

    document.getElementById(
        "modalImportacao"
    ).style.display = "block";
}

function fecharModalImportacao() {

    document.getElementById(
        "modalImportacao"
    ).style.display = "none";
}

async function executarImportacao() {

    const botao =
        document.getElementById(
            "btnImportar"
        );

    const spinner =
        document.getElementById(
            "loadingImportacao"
        );

    botao.disabled = true;

    botao.innerText =
        "Importando...";

    fecharModalImportacao();

    spinner.style.display = "inline-block";

    try {

        const resposta =
            await fetch(
                "/api/estabelecimentos/importar",
                {
                    method: "POST"
                }
            );

        const dados =
            await resposta.json();

        spinner.style.display = "none";

        botao.disabled = false;

        botao.innerText =
            "Importar";

        document.getElementById(
            "resultadoImportacao"
        ).innerHTML = `

            <h3>Importação concluída</h3>

            <p><strong>Registros lidos:</strong> ${dados.lidos}</p>

            <p><strong>Importados:</strong> ${dados.importados}</p>

            <p><strong>Duplicados:</strong> ${dados.duplicados}</p>

            <p><strong>Rejeitados:</strong> ${dados.rejeitados}</p>

        `;

        carregarTabela();
        carregarIndicadores();
        carregarMapa();

        mostrarMensagem(
            "Importação concluída com sucesso"
        );

    } catch (erro) {

        spinner.style.display = "none";

        botao.disabled = false;

        botao.innerText =
            "Importar";

        mostrarMensagem(
            "Erro durante a importação",
            "erro"
        );
    }
}

function alterarModoMapa(modo) {

    modoMapaAtual = modo;

    carregarMapa();
}

function atualizarPainelBrasil() {

    const painel =
        document.getElementById(
            "painelEstado"
        );

    if (modoMapaAtual === "padrao") {

        let estabelecimentos = 0;
        let hospitalares = 0;
        let ambulatoriais = 0;
        let cirurgicos = 0;
        let obstetricos = 0;
        let neonatais = 0;

        dadosDashboardUf.forEach(item => {

            estabelecimentos += item.estabelecimentos;
            hospitalares += item.hospitalares;
            ambulatoriais += item.ambulatoriais;
            cirurgicos += item.centrosCirurgicos;
            obstetricos += item.centrosObstetricos;
            neonatais += item.centrosNeonatais;
        });

        painel.innerHTML = `

    <h3 id="nomeEstadoSelecionado">
        Brasil
    </h3>

    <p>
        <strong>Estabelecimentos:</strong>
        <span id="painelEstabelecimentos">
            ${formatarNumero(estabelecimentos)}
        </span>
    </p>

    <p>
        <strong>Hospitalares:</strong>
        <span id="painelHospitalares">
            ${formatarNumero(hospitalares)}
        </span>
    </p>

    <p>
        <strong>Ambulatoriais:</strong>
        <span id="painelAmbulatoriais">
            ${formatarNumero(ambulatoriais)}
        </span>
    </p>

    <p>
        <strong>Centros Cirúrgicos:</strong>
        <span id="painelCirurgicos">
            ${formatarNumero(cirurgicos)}
        </span>
    </p>

    <p>
        <strong>Centros Obstétricos:</strong>
        <span id="painelObstetricos">
            ${formatarNumero(obstetricos)}
        </span>
    </p>

    <p>
        <strong>Centros Neonatais:</strong>
        <span id="painelNeonatais">
            ${formatarNumero(neonatais)}
        </span>
    </p>

`;
        return;
    }

    let chave = "estabelecimentos";

    if (modoMapaAtual === "hospitalares") {
        chave = "hospitalares";
    }

    if (modoMapaAtual === "ambulatoriais") {
        chave = "ambulatoriais";
    }

    const ranking =
        [...dadosDashboardUf]
            .sort((a, b) =>
                b[chave] - a[chave]
            );

    painel.innerHTML = `
        <h3>Ranking</h3>
    `;

    ranking.forEach((item, index) => {

        painel.innerHTML += `
            <p>
                <strong>${index + 1}º - ${ufSigla[item.codigoUf]}</strong>
                (${formatarNumero(item[chave])})
            </p>
        `;

    });
}