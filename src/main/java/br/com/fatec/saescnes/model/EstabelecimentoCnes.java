package br.com.fatec.saescnes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "estabelecimento_cnes")
public class EstabelecimentoCnes {

    @Id
    private Long codigoCnes;

    private Integer codigoUf;

    private Integer codigoMunicipio;

    private String nomeRazaoSocial;

    private String nomeFantasia;

    private String tipoGestao;

    private String esferaAdministrativa;

    private Integer codigoTipoUnidade;

    private String endereco;

    private String bairro;

    private String telefone;

    private Double latitude;

    private Double longitude;

    private Integer centroCirurgico;

    private Integer centroObstetrico;

    private Integer centroNeonatal;

    private Integer atendimentoHospitalar;

    private Integer atendimentoAmbulatorial;

    public Long getCodigoCnes() {
        return codigoCnes;
    }

    public void setCodigoCnes(Long codigoCnes) {
        this.codigoCnes = codigoCnes;
    }

    public Integer getCodigoUf() {
        return codigoUf;
    }

    public void setCodigoUf(Integer codigoUf) {
        this.codigoUf = codigoUf;
    }

    public Integer getCodigoMunicipio() {
        return codigoMunicipio;
    }

    public void setCodigoMunicipio(Integer codigoMunicipio) {
        this.codigoMunicipio = codigoMunicipio;
    }

    public String getNomeRazaoSocial() {
        return nomeRazaoSocial;
    }

    public void setNomeRazaoSocial(String nomeRazaoSocial) {
        this.nomeRazaoSocial = nomeRazaoSocial;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getTipoGestao() {
        return tipoGestao;
    }

    public void setTipoGestao(String tipoGestao) {
        this.tipoGestao = tipoGestao;
    }

    public String getEsferaAdministrativa() {
        return esferaAdministrativa;
    }

    public void setEsferaAdministrativa(String esferaAdministrativa) {
        this.esferaAdministrativa = esferaAdministrativa;
    }

    public Integer getCodigoTipoUnidade() {
        return codigoTipoUnidade;
    }

    public void setCodigoTipoUnidade(Integer codigoTipoUnidade) {
        this.codigoTipoUnidade = codigoTipoUnidade;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Integer getCentroCirurgico() {
        return centroCirurgico;
    }

    public void setCentroCirurgico(Integer centroCirurgico) {
        this.centroCirurgico = centroCirurgico;
    }

    public Integer getCentroObstetrico() {
        return centroObstetrico;
    }

    public void setCentroObstetrico(Integer centroObstetrico) {
        this.centroObstetrico = centroObstetrico;
    }

    public Integer getCentroNeonatal() {
        return centroNeonatal;
    }

    public void setCentroNeonatal(Integer centroNeonatal) {
        this.centroNeonatal = centroNeonatal;
    }

    public Integer getAtendimentoHospitalar() {
        return atendimentoHospitalar;
    }

    public void setAtendimentoHospitalar(Integer atendimentoHospitalar) {
        this.atendimentoHospitalar = atendimentoHospitalar;
    }

    public Integer getAtendimentoAmbulatorial() {
        return atendimentoAmbulatorial;
    }

    public void setAtendimentoAmbulatorial(Integer atendimentoAmbulatorial) {
        this.atendimentoAmbulatorial = atendimentoAmbulatorial;
    }
}