package br.com.fatec.saescnes.controller;

import br.com.fatec.saescnes.model.EstabelecimentoCnes;
import br.com.fatec.saescnes.service.EstabelecimentoCnesService;
import org.springframework.web.bind.annotation.*;
import br.com.fatec.saescnes.model.DashboardUfDTO;

import java.util.List;

@RestController
@RequestMapping("/api/estabelecimentos")
public class EstabelecimentoCnesController {

    private final EstabelecimentoCnesService service;

    public EstabelecimentoCnesController(
            EstabelecimentoCnesService service) {

        this.service = service;
    }

    @GetMapping
    public List<EstabelecimentoCnes> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/uf/{codigoUf}")
    public List<EstabelecimentoCnes> buscarPorUf(
            @PathVariable Integer codigoUf) {

        return service.buscarPorUf(codigoUf);
    }

    @GetMapping("/nome/{nomeFantasia}")
    public List<EstabelecimentoCnes> buscarPorNome(
            @PathVariable String nomeFantasia) {

        return service.buscarPorNome(nomeFantasia);
    }

    @DeleteMapping("/limpar")
    public void limparBanco() {

        service.limparBanco();
    }

    @GetMapping("/total-estabelecimentos")
    public Long totalEstabelecimentos() {

        return service.totalEstabelecimentos();
    }

    @GetMapping("/total-hospitalar")
    public Long totalHospitalar() {

        return service.totalAtendimentoHospitalar();
    }

    @GetMapping("/total-ambulatorial")
    public Long totalAmbulatorial() {

        return service.totalAtendimentoAmbulatorial();
    }

    @GetMapping("/total-centro-cirurgico")
    public Long totalCentroCirurgico() {

        return service.totalCentroCirurgico();
    }

    @GetMapping("/total-centro-obstetrico")
    public Long totalCentroObstetrico() {

        return service.totalCentroObstetrico();
    }

    @GetMapping("/total-centro-neonatal")
    public Long totalCentroNeonatal() {

        return service.totalCentroNeonatal();
    }

    @GetMapping("/mapa")
    public List<Object[]> mapa() {

        return service.totalPorUf();
    }
    @GetMapping("/dashboard-uf")
    public List<DashboardUfDTO> dashboardPorUf() {

        return service.dashboardPorUf();
    }
    @DeleteMapping("/{codigoCnes}")
    public void excluir(
            @PathVariable Long codigoCnes) {

        service.excluir(codigoCnes);

    }
    @GetMapping("/{codigoCnes}")
    public EstabelecimentoCnes buscarPorCodigo(
            @PathVariable Long codigoCnes) {

        return service.buscarPorCodigo(
                codigoCnes
        );
    }
    @PutMapping("/{codigoCnes}")
    public EstabelecimentoCnes atualizar(
            @PathVariable Long codigoCnes,
            @RequestBody EstabelecimentoCnes atualizado) {

        return service.atualizar(
                codigoCnes,
                atualizado
        );
    }
    @PostMapping
    public EstabelecimentoCnes criar(
            @RequestBody EstabelecimentoCnes estabelecimento) {

        return service.criar(
                estabelecimento
        );
    }
}