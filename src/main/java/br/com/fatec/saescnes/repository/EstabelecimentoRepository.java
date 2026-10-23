package br.com.fatec.saescnes.repository;

import br.com.fatec.saescnes.model.Estabelecimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstabelecimentoRepository
        extends JpaRepository<Estabelecimento, Long> {
}