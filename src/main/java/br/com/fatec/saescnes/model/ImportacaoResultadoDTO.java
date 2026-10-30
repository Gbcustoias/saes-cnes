package br.com.fatec.saescnes.model;

public class ImportacaoResultadoDTO {

    private long lidos;

    private long importados;

    private long duplicados;

    private long rejeitados;

    public ImportacaoResultadoDTO(
            long lidos,
            long importados,
            long duplicados,
            long rejeitados) {

        this.lidos = lidos;
        this.importados = importados;
        this.duplicados = duplicados;
        this.rejeitados = rejeitados;
    }

    public long getLidos() {
        return lidos;
    }

    public long getImportados() {
        return importados;
    }

    public long getDuplicados() {
        return duplicados;
    }

    public long getRejeitados() {
        return rejeitados;
    }
}