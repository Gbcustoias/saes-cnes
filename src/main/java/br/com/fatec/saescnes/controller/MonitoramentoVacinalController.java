package br.com.fatec.saescnes.controller;

import br.com.fatec.saescnes.model.MonitoramentoVacinal;
import br.com.fatec.saescnes.service.MonitoramentoVacinalService;
import org.springframework.web.bind.annotation.*;
import br.com.fatec.saescnes.model.IndicadorUf;
import br.com.fatec.saescnes.model.DashboardUfDTO;

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
    @GetMapping("/quantidade")
    public Long quantidade() {
        return service.quantidadeRegistros();
    }
    @DeleteMapping("/limpar")
    public void limparBanco() {
        service.limparBanco();
    }
    @GetMapping("/ufs")
    public Long quantidadeUfs() {
        return service.quantidadeUfs();
    }

    @GetMapping("/municipios")
    public Long quantidadeMunicipios() {
        return service.quantidadeMunicipios();
    }

    @GetMapping("/pncc-adeq")
    public Long totalPnccAdeq() {
        return service.totalPnccAdeq();
    }

    @GetMapping("/mening-adeq")
    public Long totalMeningAdeq() {
        return service.totalMeningAdeq();
    }

    @GetMapping("/pncc-oport")
    public Long totalPnccOport() {
        return service.totalPnccOport();
    }

    @GetMapping("/mening-oport")
    public Long totalMeningOport() {
        return service.totalMeningOport();
    }

    @GetMapping("/media-com")
    public Double mediaComComp() {
        return service.mediaCriancasComComp();
    }

    @GetMapping("/media-sem")
    public Double mediaSemComp() {
        return service.mediaCriancasSemComp();
    }

    @GetMapping("/mapa/criancas")
    public List<IndicadorUf> totalCriancasPorUf() {
        return service.totalCriancasPorUf();
    }

    @GetMapping("/mapa/dashboard")
    public List<DashboardUfDTO> dashboardPorUf() {
        return service.dashboardPorUf();
    }
}