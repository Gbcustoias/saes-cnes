package br.com.fatec.saescnes.model;

public class DashboardUfDTO {

    private Integer codigoUf;

    private Long estabelecimentos;

    private Long hospitalares;

    private Long ambulatoriais;

    private Long centrosCirurgicos;

    private Long centrosObstetricos;

    private Long centrosNeonatais;

    public DashboardUfDTO(
            Integer codigoUf,
            Long estabelecimentos,
            Long hospitalares,
            Long ambulatoriais,
            Long centrosCirurgicos,
            Long centrosObstetricos,
            Long centrosNeonatais) {

        this.codigoUf = codigoUf;
        this.estabelecimentos = estabelecimentos;
        this.hospitalares = hospitalares;
        this.ambulatoriais = ambulatoriais;
        this.centrosCirurgicos = centrosCirurgicos;
        this.centrosObstetricos = centrosObstetricos;
        this.centrosNeonatais = centrosNeonatais;
    }

    public Integer getCodigoUf() {
        return codigoUf;
    }

    public Long getEstabelecimentos() {
        return estabelecimentos;
    }

    public Long getHospitalares() {
        return hospitalares;
    }

    public Long getAmbulatoriais() {
        return ambulatoriais;
    }

    public Long getCentrosCirurgicos() {
        return centrosCirurgicos;
    }

    public Long getCentrosObstetricos() {
        return centrosObstetricos;
    }

    public Long getCentrosNeonatais() {
        return centrosNeonatais;
    }
}