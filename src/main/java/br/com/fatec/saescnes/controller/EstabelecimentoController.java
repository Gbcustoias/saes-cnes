package br.com.fatec.saescnes.controller;

import br.com.fatec.saescnes.model.Estabelecimento;
import br.com.fatec.saescnes.service.EstabelecimentoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estabelecimentos")
public class EstabelecimentoController {

    private final EstabelecimentoService service;

    public EstabelecimentoController(EstabelecimentoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Estabelecimento> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Estabelecimento buscar(@PathVariable Long id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Estabelecimento criar(@RequestBody Estabelecimento estabelecimento) {
        return service.salvar(estabelecimento);
    }

    @PutMapping("/{id}")
    public Estabelecimento atualizar(
            @PathVariable Long id,
            @RequestBody Estabelecimento estabelecimento) {

        estabelecimento.setId(id);
        return service.atualizar(estabelecimento);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}