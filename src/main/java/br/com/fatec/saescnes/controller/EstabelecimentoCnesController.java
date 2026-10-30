package br.com.fatec.saescnes.controller;

import br.com.fatec.saescnes.model.EstabelecimentoCnes;
import br.com.fatec.saescnes.service.EstabelecimentoCnesService;
import org.springframework.web.bind.annotation.*;
import br.com.fatec.saescnes.model.DashboardUfDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import br.com.fatec.saescnes.service.ImportacaoService;
import br.com.fatec.saescnes.model.ImportacaoResultadoDTO;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/estabelecimentos")
public class EstabelecimentoCnesController {

    private final EstabelecimentoCnesService service;

    private final ImportacaoService importacaoService;

    public EstabelecimentoCnesController(
            EstabelecimentoCnesService service,
            ImportacaoService importacaoService) {

        this.service = service;
        this.importacaoService = importacaoService;
    }

    @GetMapping
    public ResponseEntity<List<EstabelecimentoCnes>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
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
    public ResponseEntity<Void> excluir(
            @PathVariable Long codigoCnes) {

        boolean excluido =
                service.excluir(
                        codigoCnes
                );

        if (!excluido) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity
                .noContent()
                .build();
    }
    @GetMapping("/{codigoCnes}")
    public ResponseEntity<EstabelecimentoCnes> buscarPorCodigo(
            @PathVariable Long codigoCnes) {

        EstabelecimentoCnes registro =
                service.buscarPorCodigo(
                        codigoCnes
                );

        if (registro == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                registro
        );
    }
    @PutMapping("/{codigoCnes}")
    public ResponseEntity<EstabelecimentoCnes> atualizar(

            @PathVariable Long codigoCnes,

            @Valid
            @RequestBody EstabelecimentoCnes atualizado) {

        EstabelecimentoCnes resultado =
                service.atualizar(
                        codigoCnes,
                        atualizado
                );

        if (resultado == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(
                resultado
        );
    }
    @PostMapping
    public ResponseEntity<EstabelecimentoCnes> criar(
            @Valid
            @RequestBody EstabelecimentoCnes estabelecimento) {

        EstabelecimentoCnes salvo =
                service.criar(estabelecimento);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(salvo);
    }
    @GetMapping("/filtro")
    public ResponseEntity<List<EstabelecimentoCnes>> filtrar(

            @RequestParam(required = false, defaultValue = "")
            String nome,

            @RequestParam(required = false)
            Integer uf) {

        return ResponseEntity.ok(
                service.filtrar(
                        nome,
                        uf
                )
        );
    }
    @PostMapping("/importar")
    public ResponseEntity<?> importar() {

        try {

            ImportacaoResultadoDTO resultado =
                    importacaoService.sincronizarCnes();

            return ResponseEntity.ok(
                    resultado
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }
}