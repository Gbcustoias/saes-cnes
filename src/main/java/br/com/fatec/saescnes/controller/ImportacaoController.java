package br.com.fatec.saescnes.controller;

import br.com.fatec.saescnes.service.ImportacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cnes")
public class ImportacaoController {

    private final ImportacaoService service;

    public ImportacaoController(
            ImportacaoService service) {

        this.service = service;
    }

    @PostMapping("/sincronizar")
    public ResponseEntity<String> sincronizar() {

        try {

            service.sincronizarCnes();

            return ResponseEntity.ok(
                    "CNES sincronizado com sucesso"
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body(
                            e.getMessage()
                    );
        }
    }
}