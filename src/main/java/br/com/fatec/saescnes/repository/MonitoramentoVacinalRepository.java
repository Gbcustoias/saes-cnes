package br.com.fatec.saescnes.repository;

import br.com.fatec.saescnes.model.MonitoramentoVacinal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MonitoramentoVacinalRepository
        extends JpaRepository<MonitoramentoVacinal, Long> {

    List<MonitoramentoVacinal> findByUfContainingIgnoreCase(String uf);

    List<MonitoramentoVacinal> findByNomeMunicipioContainingIgnoreCase(
            String nomeMunicipio);

    @Query("""
           SELECT COUNT(DISTINCT m.uf)
           FROM MonitoramentoVacinal m
           """)
    Long quantidadeUfs();

    @Query("""
           SELECT COUNT(DISTINCT m.nomeMunicipio)
           FROM MonitoramentoVacinal m
           """)
    Long quantidadeMunicipios();

    @Query("""
       SELECT COALESCE(SUM(m.pnccAdeq),0)
       FROM MonitoramentoVacinal m
       """)
    Long totalPnccAdeq();

    @Query("""
       SELECT COALESCE(SUM(m.meningAdeq),0)
       FROM MonitoramentoVacinal m
       """)
    Long totalMeningAdeq();

    @Query("""
       SELECT COALESCE(SUM(m.pnccOport),0)
       FROM MonitoramentoVacinal m
       """)
    Long totalPnccOport();

    @Query("""
       SELECT COALESCE(SUM(m.meningOport),0)
       FROM MonitoramentoVacinal m
       """)
    Long totalMeningOport();

    @Query("""
       SELECT AVG(m.numeroCriancasComComp)
       FROM MonitoramentoVacinal m
       """)
    Double mediaCriancasComComp();

    @Query("""
       SELECT AVG(m.numeroCriancasSemComp)
       FROM MonitoramentoVacinal m
       """)
    Double mediaCriancasSemComp();

    @Query("""
SELECT m.uf, SUM(m.numeroCriancasResid)
FROM MonitoramentoVacinal m
GROUP BY m.uf
ORDER BY m.uf
""")
    List<Object[]> totalCriancasPorUf();

    @Query("""
SELECT
    m.uf,
    SUM(m.numeroCriancasResid),
    COUNT(DISTINCT m.nomeMunicipio),
    SUM(m.pnccAdeq),
    SUM(m.pnccOport),
    SUM(m.meningAdeq),
    SUM(m.meningOport)
FROM MonitoramentoVacinal m
GROUP BY m.uf
ORDER BY m.uf
""")
    List<Object[]> dashboardPorUf();

}

