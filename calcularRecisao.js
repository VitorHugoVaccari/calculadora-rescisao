class DadosRescisao {
  constructor(dados) {
    this.tipoRescisao = dados.tipoRecisao;
    this.salarioMensal = Number(dados.salarioMensal);
    this.diasTrabalhadosMes = Number(dados.diasTrabalhadosMes);
    this.pFeriasVencidas = Number(dados.pFeriasVencidas);
    this.dataAdmissao = new Date(dados.dataAdmissao);
    this.dataDemissao = new Date(dados.dataDemissao);
    this.diasAvisoPrevio = Number(dados.diasAvisoPrevio);
  }

  saldoSalario() {
    return (this.salarioMensal / 30) * this.diasTrabalhadosMes;
  }

  feriasVencidas() {
    const valorFerias = this.salarioMensal * this.pFeriasVencidas;
    return valorFerias + valorFerias / 3;
  }

  avisoPrevio() {
    return (this.salarioMensal / 30) * this.diasAvisoPrevio;
  }

  multaFGTS() {
    let anos =
      this.dataDemissao.getFullYear() - this.dataAdmissao.getFullYear();
    let meses = this.dataDemissao.getMonth() - this.dataAdmissao.getMonth();
    let dias = this.dataDemissao.getDate() - this.dataAdmissao.getDate();

    if (dias < 0) {
      dias += 30;
      meses -= 1;
    }
    if (meses < 0) {
      meses += 12;
      anos -= 1;
    }

    const mesesTotais = anos * 12 + meses + dias / 30;
    const fgtsMensal = this.salarioMensal * 0.08;
    const fgtsTotal = fgtsMensal * mesesTotais;

    if (this.tipoRecisao === "semJustaCausa") {
      return fgtsTotal + fgtsTotal * 0.4;
    }
    return fgtsTotal;
  }

  feriasProporcionais() {
    const dataInicioPeriodo = new Date(this.dataAdmissao);
    const dataFimPeriodo = new Date(this.dataDemissao);

    let anos = dataFimPeriodo.getFullYear() - dataInicioPeriodo.getFullYear();
    let meses = dataFimPeriodo.getMonth() - dataInicioPeriodo.getMonth();
    let dias = dataFimPeriodo.getDate() - dataInicioPeriodo.getDate();

    if (dias < 0) {
      dias += 30;
      meses -= 1;
    }
    if (meses < 0) {
      meses += 12;
      anos -= 1;
    }

    const mesesTotais = anos * 12 + meses + dias / 30;
    const valorFerias = (this.salarioMensal / 12) * mesesTotais;
    return valorFerias + valorFerias / 3;
  }

  decimoTerceiroProporcional() {
    const anoDemissao = this.dataDemissao.getFullYear();
    const inicioAno = new Date(anoDemissao, 0, 1);
    const dataInicioPeriodo =
      this.dataAdmissao > inicioAno ? this.dataAdmissao : inicioAno;
    const dataFimPeriodo = new Date(this.dataDemissao);

    let anos = dataFimPeriodo.getFullYear() - dataInicioPeriodo.getFullYear();
    let meses = dataFimPeriodo.getMonth() - dataInicioPeriodo.getMonth();
    let dias = dataFimPeriodo.getDate() - dataInicioPeriodo.getDate();

    if (dias < 0) {
      dias += 30;
      meses -= 1;
    }
    if (meses < 0) {
      meses += 12;
      anos -= 1;
    }

    const mesesTotais = anos * 12 + meses + dias / 30;
    return (this.salarioMensal / 12) * mesesTotais;
  }
}

function calculo() {
  const dados = {
    tipoRecisao: document.getElementById("tipoDeRescisao").value,
    salarioMensal: Number(document.getElementById("salarioMensal").value),
    diasTrabalhadosMes: Number(
      document.getElementById("diasTrabalhadosMes").value,
    ),
    pFeriasVencidas: Number(document.getElementById("pFeriasVencidas").value),
    dataAdmissao: document.getElementById("dataAdmissao").value,
    dataDemissao: document.getElementById("dataDemissao").value,
    diasAvisoPrevio: Number(document.getElementById("diasAvisoPrevio").value),
  };

  const recisao = new DadosRescisao(dados);

  const resultadoDiv = document.getElementById("resultadoRescisao");

  switch (recisao.tipoRescisao) {
    case "semJustaCausa": {
      const saldo = recisao.saldoSalario();
      const feriasVenc = recisao.feriasVencidas();
      const feriasProp = recisao.feriasProporcionais();
      const decimo = recisao.decimoTerceiroProporcional();
      const aviso = recisao.avisoPrevio();
      const fgts = recisao.multaFGTS();
      const total = saldo + feriasVenc + feriasProp + decimo + aviso + fgts;

      resultadoDiv.innerHTML = `
      <h3>Resumo Sem Justa Causa</h3>
      <p>Saldo Salário: R$ ${saldo.toFixed(2)}</p>
      <p>Férias Vencidas: R$ ${feriasVenc.toFixed(2)}</p>
      <p>Férias Proporcionais: R$ ${feriasProp.toFixed(2)}</p>
      <p>13º Proporcional: R$ ${decimo.toFixed(2)}</p>
      <p>Aviso Prévio: R$ ${aviso.toFixed(2)}</p>
      <p>FGTS + Multa: R$ ${fgts.toFixed(2)}</p>
      <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
    `;
      resultadoDiv.style.display = "flex";
      break;
    }

    case "pedidoDeDemissao": {
      const saldo = recisao.saldoSalario();
      const feriasVenc = recisao.feriasVencidas();
      const feriasProp = recisao.feriasProporcionais();
      const decimo = recisao.decimoTerceiroProporcional();
      const aviso = recisao.avisoPrevio();
      const fgts = recisao.multaFGTS();
      const total = saldo + feriasVenc + feriasProp + decimo + aviso + fgts;

      resultadoDiv.innerHTML = `
      <h3>Resumo Pedido de Demissão</h3>
      <p>Saldo Salário: R$ ${saldo.toFixed(2)}</p>
      <p>Férias Vencidas: R$ ${feriasVenc.toFixed(2)}</p>
      <p>Férias Proporcionais: R$ ${feriasProp.toFixed(2)}</p>
      <p>13º Proporcional: R$ ${decimo.toFixed(2)}</p>
      <p>Aviso Prévio: R$ ${aviso.toFixed(2)}</p>
      <p>FGTS: R$ ${fgts.toFixed(2)}</p>
      <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
    `;
      resultadoDiv.style.display = "flex";
      break;
    }

    case "comJustaCausa": {
      const saldo = recisao.saldoSalario();
      const feriasVenc = recisao.feriasVencidas();
      const fgts = recisao.multaFGTS();

      const total = saldo + feriasVenc + fgts;

      resultadoDiv.innerHTML = `
      <h3>Resumo Com Justa Causa</h3>
      <p>Saldo Salário: R$ ${saldo.toFixed(2)}</p>
      <p>Férias Vencidas: R$ ${feriasVenc.toFixed(2)}</p>
      <p>FGTS: R$ ${fgts.toFixed(2)}</p>
      <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
    `;
      resultadoDiv.style.display = "flex";
      break;
    }
  }
}

let botao = document.querySelector(".btnCalcular");
botao.addEventListener("click", calculo);
