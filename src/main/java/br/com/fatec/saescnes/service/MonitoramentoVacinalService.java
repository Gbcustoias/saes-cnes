package br.com.fatec.saescnes.service;

import br.com.fatec.saescnes.model.MonitoramentoVacinal;
import br.com.fatec.saescnes.repository.MonitoramentoVacinalRepository;
import org.springframework.stereotype.Service;
import br.com.fatec.saescnes.model.IndicadorUf;
import java.util.ArrayList;
import br.com.fatec.saescnes.model.DashboardUfDTO;


import java.util.List;

@Service
public class MonitoramentoVacinalService {

    private final MonitoramentoVacinalRepository repository;

    public MonitoramentoVacinalService(MonitoramentoVacinalRepository repository) {
        this.repository = repository;
    }

    public List<MonitoramentoVacinal> listarTodos() {
        return repository.findAll();
    }

    public List<MonitoramentoVacinal> buscarPorUf(String uf) {
        return repository.findByUfContainingIgnoreCase(uf);
    }

    public List<MonitoramentoVacinal> buscarPorMunicipio(String municipio) {
        return repository.findByNomeMunicipioContainingIgnoreCase(municipio);
    }

    public MonitoramentoVacinal salvar(MonitoramentoVacinal monitoramento) {
        return repository.save(monitoramento);
    }

    public Long quantidadeRegistros() {
        return repository.count();
    }

    public Long quantidadeUfs() {
        return repository.quantidadeUfs();
    }

    public Long quantidadeMunicipios() {
        return repository.quantidadeMunicipios();
    }

    public void limparBanco() {
        repository.deleteAll();
    }

    public Long totalPnccAdeq() {
        return repository.totalPnccAdeq();
    }

    public Long totalMeningAdeq() {
        return repository.totalMeningAdeq();
    }

    public Long totalPnccOport() {
        return repository.totalPnccOport();
    }

    public Long totalMeningOport() {
        return repository.totalMeningOport();
    }

    public Double mediaCriancasComComp() {
        return repository.mediaCriancasComComp();
    }

    public Double mediaCriancasSemComp() {
        return repository.mediaCriancasSemComp();
    }

    public List<IndicadorUf> totalCriancasPorUf() {

        List<Object[]> dados =
                repository.totalCriancasPorUf();

        List<IndicadorUf> resultado =
                new ArrayList<>();

        for (Object[] linha : dados) {

            resultado.add(
                    new IndicadorUf(
                            (String) linha[0],
                            ((Number) linha[1]).longValue()
                    )
            );
        }

        return resultado;
    }
    public List<DashboardUfDTO> dashboardPorUf() {

        List<Object[]> dados =
                repository.dashboardPorUf();

        List<DashboardUfDTO> resultado =
                new java.util.ArrayList<>();

        for (Object[] linha : dados) {

            resultado.add(
                    new DashboardUfDTO(
                            (String) linha[0],
                            ((Number) linha[1]).longValue(),
                            ((Number) linha[2]).longValue(),
                            ((Number) linha[3]).longValue(),
                            ((Number) linha[4]).longValue(),
                            ((Number) linha[5]).longValue(),
                            ((Number) linha[6]).longValue(),
                            ((Number) linha[7]).longValue(),
                            ((Number) linha[8]).longValue()
                    )
            );
        }

        return resultado;
    }
    public Long totalCriancasMonitoradas() {
        return repository.totalCriancasMonitoradas();
    }
    public Long totalCriancasComComp() {
        return repository.totalCriancasComComp();
    }

    public Long totalCriancasSemComp() {
        return repository.totalCriancasSemComp();
    }
}