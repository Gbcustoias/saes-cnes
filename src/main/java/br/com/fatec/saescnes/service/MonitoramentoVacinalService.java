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
        return repository.findByUf(uf);
    }

    public List<MonitoramentoVacinal> buscarPorMunicipio(String municipio) {
        return repository.findByMunicipio(municipio);
    }

    public MonitoramentoVacinal salvar(MonitoramentoVacinal monitoramento) {
        return repository.save(monitoramento);
    }
}