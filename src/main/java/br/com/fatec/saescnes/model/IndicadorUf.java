package br.com.fatec.saescnes.model;

public class IndicadorUf {

    private String uf;
    private Long valor;

    public IndicadorUf(String uf, Long valor) {
        this.uf = uf;
        this.valor = valor;
    }

    public String getUf() {
        return uf;
    }

    public Long getValor() {
        return valor;
    }
}