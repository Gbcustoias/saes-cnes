package br.com.fatec.saescnes.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "monitoramento_vacinal")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MonitoramentoVacinal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer codigoRegiao;

    private String nomeRegiao;

    private String uf;

    private Integer codigoRegional;

    private String nomeRegional;

    private Integer codigoMunicipio;

    private String nomeMunicipio;

    private Integer numeroDomicilios;

    private Integer numeroCriancasResid;

    private Integer numeroCriancasSemComp;

    private Integer numeroCriancasComComp;

    private Integer pnccAdeq;

    private Integer meningAdeq;

    private Integer pnccOport;

    private Integer meningOport;

    private String dataHora;
}