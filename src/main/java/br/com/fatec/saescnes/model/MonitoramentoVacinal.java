package br.com.fatec.saescnes.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "monitoramento_vacinal")
public class MonitoramentoVacinal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String regiao;

    private String uf;

    private String regional;

    private String municipio;

    private Integer nDomicilios;

    private Integer nCriancasResid;

    private Integer nCriancasSemComp;

    private Integer nCriancasComComp;

    private Integer pnccAdeq;

    private Integer meningAdeq;

    private Integer pnccOport;

    private Integer meningOport;

    private String dataHora;
}