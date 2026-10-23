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
public class Estabelecimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigoCnes;
    private String nomeEstabelecimento;
    private String uf;
    private String municipio;
    private String tipoEstabelecimento;
    private String esferaAdministrativa;
    private Boolean atendeSus;
    private Double latitude;
    private Double longitude;
}