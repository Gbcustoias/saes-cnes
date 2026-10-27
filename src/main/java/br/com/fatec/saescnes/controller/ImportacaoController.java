package br.com.fatec.saescnes.controller;

import br.com.fatec.saescnes.service.ImportacaoCsvService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/importacao")
public class ImportacaoController {

    private final ImportacaoCsvService service;

    public ImportacaoController(ImportacaoCsvService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> importar(
            @RequestParam("arquivo") MultipartFile arquivo) {

        try {

            service.importar(arquivo.getInputStream());

            return ResponseEntity.ok(
                    "Arquivo importado com sucesso");

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body("Erro ao importar arquivo");
        }
    }
}