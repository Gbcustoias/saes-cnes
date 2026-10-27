package br.com.fatec.saescnes.service;

import br.com.fatec.saescnes.model.MonitoramentoVacinal;
import br.com.fatec.saescnes.repository.MonitoramentoVacinalRepository;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class ImportacaoCsvService {

    private final MonitoramentoVacinalRepository repository;

    public ImportacaoCsvService(MonitoramentoVacinalRepository repository) {
        this.repository = repository;
    }

    public void importar(InputStream inputStream) {

        try (BufferedReader br =
                     new BufferedReader(
                             new InputStreamReader(inputStream))) {

            String linha;

            br.readLine();
            DateTimeFormatter formatter =
                    DateTimeFormatter.ofPattern("dd/MM/yyyy");

            while ((linha = br.readLine()) != null) {

                String[] dados = linha.split(";");

                MonitoramentoVacinal monitoramento =
                        new MonitoramentoVacinal();

                monitoramento.setCodigoRegiao(
                        Integer.parseInt(dados[0]));

                monitoramento.setNomeRegiao(
                        dados[1]);

                monitoramento.setUf(
                        dados[2]);

                monitoramento.setCodigoRegional(
                        Integer.parseInt(dados[3]));

                monitoramento.setNomeRegional(
                        dados[4]);

                monitoramento.setCodigoMunicipio(
                        Integer.parseInt(dados[5]));

                monitoramento.setNomeMunicipio(
                        dados[6]);

                monitoramento.setNumeroDomicilios(
                        Integer.parseInt(dados[7]));

                monitoramento.setNumeroCriancasResid(
                        Integer.parseInt(dados[8]));

                monitoramento.setNumeroCriancasSemComp(
                        Integer.parseInt(dados[9]));

                monitoramento.setNumeroCriancasComComp(
                        Integer.parseInt(dados[10]));

                monitoramento.setPnccAdeq(
                        Integer.parseInt(dados[11]));

                monitoramento.setMeningAdeq(
                        Integer.parseInt(dados[12]));

                monitoramento.setPnccOport(
                        Integer.parseInt(dados[13]));

                monitoramento.setMeningOport(
                        Integer.parseInt(dados[14]));

                monitoramento.setDataHora(
                        LocalDate.parse(dados[15], formatter));

                repository.save(monitoramento);
            }

        } catch (Exception e) {
            throw new RuntimeException("Erro ao importar CSV", e);
        }
    }
}