package br.com.fatec.saescnes.service;

import br.com.fatec.saescnes.model.EstabelecimentoCnes;
import br.com.fatec.saescnes.repository.EstabelecimentoCnesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstabelecimentoCnesService {

    private final EstabelecimentoCnesRepository repository;

    public EstabelecimentoCnesService(
            EstabelecimentoCnesRepository repository) {

        this.repository = repository;
    }

    public List<EstabelecimentoCnes> listarTodos() {
        return repository.findAll();
    }

    public List<EstabelecimentoCnes> buscarPorUf(
            Integer codigoUf) {

        return repository.findByCodigoUf(codigoUf);
    }

    public List<EstabelecimentoCnes> buscarPorNome(
            String nomeFantasia) {

        return repository
                .findByNomeFantasiaContainingIgnoreCase(
                        nomeFantasia
                );
    }

    public EstabelecimentoCnes salvar(
            EstabelecimentoCnes estabelecimento) {

        return repository.save(estabelecimento);
    }

    public void limparBanco() {
        repository.deleteAll();
    }

    public Long totalEstabelecimentos() {
        return repository.totalEstabelecimentos();
    }

    public Long totalAtendimentoHospitalar() {
        return repository.totalAtendimentoHospitalar();
    }

    public Long totalAtendimentoAmbulatorial() {
        return repository.totalAtendimentoAmbulatorial();
    }

    public Long totalCentroCirurgico() {
        return repository.totalCentroCirurgico();
    }

    public Long totalCentroObstetrico() {
        return repository.totalCentroObstetrico();
    }

    public Long totalCentroNeonatal() {
        return repository.totalCentroNeonatal();
    }

    public List<Object[]> totalPorUf() {
        return repository.totalPorUf();
    }
}