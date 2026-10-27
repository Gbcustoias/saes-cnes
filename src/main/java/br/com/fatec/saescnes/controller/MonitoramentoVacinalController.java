package br.com.fatec.saescnes.controller;

import br.com.fatec.saescnes.model.MonitoramentoVacinal;
import br.com.fatec.saescnes.service.MonitoramentoVacinalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monitoramento")
public class MonitoramentoVacinalController {

    private final MonitoramentoVacinalService service;

    public MonitoramentoVacinalController(MonitoramentoVacinalService service) {
        this.service = service;
    }

    @GetMapping
    public List<MonitoramentoVacinal> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/uf/{uf}")
    public List<MonitoramentoVacinal> buscarPorUf(@PathVariable String uf) {
        return service.buscarPorUf(uf);
    }

    @GetMapping("/municipio/{municipio}")
    public List<MonitoramentoVacinal> buscarPorMunicipio(
            @PathVariable String municipio) {
        return service.buscarPorMunicipio(municipio);
    }
}