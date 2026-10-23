package br.com.fatec.saescnes.service;

import br.com.fatec.saescnes.model.Estabelecimento;
import br.com.fatec.saescnes.repository.EstabelecimentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstabelecimentoService {

    private final EstabelecimentoRepository repository;

    public EstabelecimentoService(EstabelecimentoRepository repository) {
        this.repository = repository;
    }

    public List<Estabelecimento> listarTodos() {
        return repository.findAll();
    }

    public Optional<Estabelecimento> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Estabelecimento salvar(Estabelecimento estabelecimento) {
        return repository.save(estabelecimento);
    }

    public Estabelecimento atualizar(Estabelecimento estabelecimento) {
        return repository.save(estabelecimento);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}