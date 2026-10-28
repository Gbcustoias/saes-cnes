package br.com.fatec.saescnes.model;

public class DashboardUfDTO {

    private String uf;
    private Long criancas;
    private Long municipios;
    private Long pnccAdeq;
    private Long pnccOport;
    private Long meningAdeq;
    private Long meningOport;
    private Long comComp;
    private Long semComp;


    public DashboardUfDTO(
            String uf,
            Long criancas,
            Long municipios,
            Long pnccAdeq,
            Long pnccOport,
            Long meningAdeq,
            Long meningOport,
            Long comComp,
            Long semComp) {

        this.uf = uf;
        this.criancas = criancas;
        this.municipios = municipios;
        this.pnccAdeq = pnccAdeq;
        this.pnccOport = pnccOport;
        this.meningAdeq = meningAdeq;
        this.meningOport = meningOport;
        this.comComp = comComp;
        this.semComp = semComp;
    }

    public String getUf() { return uf; }

    public Long getCriancas() { return criancas; }

    public Long getMunicipios() { return municipios; }

    public Long getPnccAdeq() { return pnccAdeq; }

    public Long getPnccOport() { return pnccOport; }

    public Long getMeningAdeq() { return meningAdeq; }

    public Long getMeningOport() { return meningOport; }
    public Long getComComp() { return comComp; }

    public Long getSemComp() { return semComp; }
}
