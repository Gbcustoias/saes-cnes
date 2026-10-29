package br.com.fatec.saescnes.service;

import br.com.fatec.saescnes.model.EstabelecimentoCnes;
import br.com.fatec.saescnes.repository.EstabelecimentoCnesRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class ImportacaoService {

    private final EstabelecimentoCnesRepository repository;

    public ImportacaoService(
            EstabelecimentoCnesRepository repository) {

        this.repository = repository;
    }

    public void sincronizarCnes() {

        RestTemplate restTemplate =
                new RestTemplate();

        repository.deleteAll();

        int offset = 0;
        long totalImportado = 0;

        java.util.Set<Long> codigosProcessados =
                new java.util.HashSet<>();

        while (true) {

            String url =
                    "https://apidadosabertos.saude.gov.br/cnes/estabelecimentos"
                            + "?limit=20"
                            + "&offset=" + offset;

            Map<String, Object> resposta =
                    restTemplate.getForObject(
                            url,
                            Map.class
                    );

            List<Map<String, Object>> estabelecimentos =
                    (List<Map<String, Object>>) resposta.get(
                            "estabelecimentos"
                    );

            if (
                    estabelecimentos == null ||
                            estabelecimentos.isEmpty()
            ) {
                break;
            }

            System.out.println(
                    "Pagina " + offset +
                            " - Registros: " +
                            estabelecimentos.size()
            );

            List<EstabelecimentoCnes> lote =
                    new java.util.ArrayList<>();

            for (Map<String, Object> item : estabelecimentos) {

                Long codigoCnes =
                        Long.valueOf(
                                item.get("codigo_cnes")
                                        .toString()
                        );

                if (codigosProcessados.contains(codigoCnes)) {
                    continue;
                }

                codigosProcessados.add(codigoCnes);

                EstabelecimentoCnes estabelecimento =
                        new EstabelecimentoCnes();

                estabelecimento.setCodigoCnes(
                        codigoCnes
                );

                estabelecimento.setCodigoUf(
                        Integer.valueOf(
                                item.get("codigo_uf")
                                        .toString()
                        )
                );

                estabelecimento.setCodigoMunicipio(
                        Integer.valueOf(
                                item.get("codigo_municipio")
                                        .toString()
                        )
                );

                estabelecimento.setNomeRazaoSocial(
                        (String) item.get(
                                "nome_razao_social"
                        )
                );

                estabelecimento.setNomeFantasia(
                        (String) item.get(
                                "nome_fantasia"
                        )
                );

                estabelecimento.setTipoGestao(
                        (String) item.get(
                                "tipo_gestao"
                        )
                );

                estabelecimento.setEsferaAdministrativa(
                        (String) item.get(
                                "descricao_esfera_administrativa"
                        )
                );

                estabelecimento.setCodigoTipoUnidade(
                        Integer.valueOf(
                                item.get(
                                        "codigo_tipo_unidade"
                                ).toString()
                        )
                );

                estabelecimento.setEndereco(
                        (String) item.get(
                                "endereco_estabelecimento"
                        )
                );

                estabelecimento.setBairro(
                        (String) item.get(
                                "bairro_estabelecimento"
                        )
                );

                Object telefone =
                        item.get(
                                "numero_telefone_estabelecimento"
                        );

                if (telefone != null) {
                    estabelecimento.setTelefone(
                            telefone.toString()
                    );
                }

                Object latitude =
                        item.get(
                                "latitude_estabelecimento_decimo_grau"
                        );

                Object longitude =
                        item.get(
                                "longitude_estabelecimento_decimo_grau"
                        );

                if (latitude != null) {

                    Double valorLatitude =
                            Double.valueOf(
                                    latitude.toString()
                            );

                    if (Math.abs(valorLatitude) <= 90) {
                        estabelecimento.setLatitude(
                                valorLatitude
                        );
                    }
                }

                if (longitude != null) {

                    Double valorLongitude =
                            Double.valueOf(
                                    longitude.toString()
                            );

                    if (Math.abs(valorLongitude) <= 180) {
                        estabelecimento.setLongitude(
                                valorLongitude
                        );
                    }
                }

                if (
                        estabelecimento.getNomeFantasia()
                                == null
                ) {

                    estabelecimento.setNomeFantasia(
                            estabelecimento
                                    .getNomeRazaoSocial()
                    );
                }

                Object centroCirurgico =
                        item.get(
                                "estabelecimento_possui_centro_cirurgico"
                        );

                estabelecimento.setCentroCirurgico(
                        centroCirurgico == null
                                ? 0
                                : Integer.valueOf(
                                centroCirurgico.toString()
                        )
                );

                Object centroObstetrico =
                        item.get(
                                "estabelecimento_possui_centro_obstetrico"
                        );

                estabelecimento.setCentroObstetrico(
                        centroObstetrico == null
                                ? 0
                                : Integer.valueOf(
                                centroObstetrico.toString()
                        )
                );

                Object centroNeonatal =
                        item.get(
                                "estabelecimento_possui_centro_neonatal"
                        );

                estabelecimento.setCentroNeonatal(
                        centroNeonatal == null
                                ? 0
                                : Integer.valueOf(
                                centroNeonatal.toString()
                        )
                );

                Object atendimentoHospitalar =
                        item.get(
                                "estabelecimento_possui_atendimento_hospitalar"
                        );

                estabelecimento.setAtendimentoHospitalar(
                        atendimentoHospitalar == null
                                ? 0
                                : Integer.valueOf(
                                atendimentoHospitalar.toString()
                        )
                );

                Object atendimentoAmbulatorial =
                        item.get(
                                "estabelecimento_possui_atendimento_ambulatorial"
                        );

                estabelecimento.setAtendimentoAmbulatorial(
                        atendimentoAmbulatorial == null
                                ? 0
                                : Integer.valueOf(
                                atendimentoAmbulatorial.toString()
                        )
                );

                lote.add(estabelecimento);
            }

            repository.saveAll(lote);

            totalImportado += lote.size();

            System.out.println(
                    "Total acumulado: " +
                            totalImportado
            );

            if (totalImportado >= 1000) {

                System.out.println(
                        "LIMITE DE 1000 REGISTROS ATINGIDO"
                );

                break;
            }

            offset += 20;
        }
    }
}