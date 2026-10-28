package br.com.fatec.saescnes.service;

import br.com.fatec.saescnes.model.MonitoramentoVacinal;
import br.com.fatec.saescnes.repository.MonitoramentoVacinalRepository;
import org.springframework.stereotype.Service;

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
}