package br.com.fatec.saescnes.repository;

import br.com.fatec.saescnes.model.EstabelecimentoCnes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EstabelecimentoCnesRepository
        extends JpaRepository<EstabelecimentoCnes, Long> {

    List<EstabelecimentoCnes>
    findByNomeFantasiaContainingIgnoreCase(
            String nomeFantasia
    );

    List<EstabelecimentoCnes>
    findByCodigoUf(
            Integer codigoUf
    );

    @Query("""
           SELECT COUNT(e)
           FROM EstabelecimentoCnes e
           """)
    Long totalEstabelecimentos();

    @Query("""
           SELECT COALESCE(
               SUM(e.atendimentoHospitalar),0
           )
           FROM EstabelecimentoCnes e
           """)
    Long totalAtendimentoHospitalar();

    @Query("""
           SELECT COALESCE(
               SUM(e.atendimentoAmbulatorial),0
           )
           FROM EstabelecimentoCnes e
           """)
    Long totalAtendimentoAmbulatorial();

    @Query("""
           SELECT COALESCE(
               SUM(e.centroCirurgico),0
           )
           FROM EstabelecimentoCnes e
           """)
    Long totalCentroCirurgico();

    @Query("""
           SELECT COALESCE(
               SUM(e.centroObstetrico),0
           )
           FROM EstabelecimentoCnes e
           """)
    Long totalCentroObstetrico();

    @Query("""
           SELECT COALESCE(
               SUM(e.centroNeonatal),0
           )
           FROM EstabelecimentoCnes e
           """)
    Long totalCentroNeonatal();

    @Query("""
           SELECT
               e.codigoUf,
               COUNT(e)
           FROM EstabelecimentoCnes e
           GROUP BY e.codigoUf
           ORDER BY e.codigoUf
           """)
    List<Object[]> totalPorUf();
}