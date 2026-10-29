package br.com.fatec.saescnes.service;

import br.com.fatec.saescnes.model.EstabelecimentoCnes;
import br.com.fatec.saescnes.repository.EstabelecimentoCnesRepository;
import org.springframework.stereotype.Service;
import br.com.fatec.saescnes.model.DashboardUfDTO;
import java.util.ArrayList;


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
    public List<DashboardUfDTO> dashboardPorUf() {

        List<Object[]> dados =
                repository.dashboardPorUf();

        List<DashboardUfDTO> resultado =
                new ArrayList<>();

        for (Object[] linha : dados) {

            resultado.add(
                    new DashboardUfDTO(
                            ((Number) linha[0]).intValue(),
                            ((Number) linha[1]).longValue(),
                            ((Number) linha[2]).longValue(),
                            ((Number) linha[3]).longValue(),
                            ((Number) linha[4]).longValue(),
                            ((Number) linha[5]).longValue(),
                            ((Number) linha[6]).longValue()
                    )
            );
        }

        return resultado;
    }
    public void excluir(Long codigoCnes) {

        repository.deleteById(codigoCnes);

    }

}