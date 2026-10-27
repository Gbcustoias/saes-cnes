package br.com.fatec.saescnes.repository;

import br.com.fatec.saescnes.model.MonitoramentoVacinal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MonitoramentoVacinalRepository
        extends JpaRepository<MonitoramentoVacinal, Long> {

    List<MonitoramentoVacinal> findByUf(String uf);

    List<MonitoramentoVacinal> findByNomeMunicipio(String nomeMunicipio);

}